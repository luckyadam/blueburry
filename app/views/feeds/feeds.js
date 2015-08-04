'use strict';

angular.module('bb.views.feeds', ['ngRoute', 'bb.views.publish'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/feeds', {
      templateUrl: 'views/feeds/feeds.html',
      controller: 'FeedsCtrl'
    })
  }])
  .controller('FeedsCtrl', ['$scope', '$cookies', 'ngDialog', 'account',
    'requester',
    function($scope, $cookies, ngDialog, account, requester) {
      $scope.feeds = [];
      $scope.factoryId = 0;

      var obj = $cookies.getObject('feeds.recents');
      if (obj == undefined) {
        $scope.recents = [];
      } else {
        $scope.recents = obj;
      }

      $scope.page = 1;

      $scope.refresh = function(id) {
        if (id == undefined) {
          id = $scope.factoryId;
        } else {
          $scope.factoryId = id;
        }
        var d = ngDialog.open({
          templateUrl: 'views/dialogs/loading.html'
        });
        requester.request('feed_list', [id, $scope.page],
          function(data) {
            console.log(data);
            ngDialog.close(d.id);
            if (data.code == 0) {
              if ($scope.page == 1) {
                $scope.feeds = data.object.posts.lists;
                $scope.subInfo = data.object.subInfo;
              } else {
                $scope.feeds = _.union($scope.feeds, data.object.posts.lists);
                $scope.subInfo = data.object.subInfo;
              }
              if (!_.contains($scope.recents, $scope.factoryId)) {
                $scope.recents.push($scope.factoryId);
                $cookies.putObject('feeds.recents', $scope.recents);
              }
              $scope.$apply();
            }
          },
          function(data) {
            console.log(data)
            ngDialog.close(d.id);
          });
      };

      $scope.more = function() {
        $scope.page += 1;
        $scope.refresh();
      };

      $scope.praise = function(feed) {
        var d = ngDialog.open({
          templateUrl: 'views/dialogs/loading.html'
        });
        requester.request('post_praise', [feed.id],
          function(data) {
            console.log(data);
            ngDialog.close(d.id);
            if (data.code == 0) {
              feed.praised = 1;
              feed.countPraise += 1;
              $scope.$apply();
            }
          },
          function(data) {
            console.log(data);
            ngDialog.close(d.id);
          });
      };

      $scope.comments = function(feed) {
        $scope.params = [feed.id, feed.isHot, feed.isRepost, feed.viewType, 1]
        ngDialog.open({
          templateUrl: 'views/feeds/comments.html',
          scope: $scope,
          controller: 'CommentsCtrl'
        })
      };

      $scope.showPublish = function() {
        ngDialog.open({
          templateUrl: 'views/publish/publish.html',
          controller: 'PublishCtrl',
          scope: $scope
        })
      }
    }
  ]);
