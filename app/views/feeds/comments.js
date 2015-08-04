'use strict';

angular.module('bb.views.comments', ['ngRoute'])
  .filter('color', function() {
    return function(input) {
      return input.slice(2);
    }
  })
  .controller('CommentsCtrl', ['$scope', 'ngDialog', 'requester', function($scope, ngDialog, requester) {
    $scope.comments = [];


    $scope.fetch = function() {
      $scope.loading = true;
      requester.request('post_comments', $scope.params,
        function(data) {
          console.log(data);
          $scope.loading = false;
          $scope.comments = data.object.comments.lists;
          $scope.$apply();
        },
        function(data) {
          console.log(data);
          $scope.loading = false;
          $scope.$apply();
        });
    };

    $scope.postComment = function() {
      $scope.loading = true;
      var d = ngDialog.open({
        templateUrl: 'views/dialogs/loading.html'
      })
      requester.request('post_comment', [$scope.text, $scope.params[0], 0],
        function(data) {
          ngDialog.close(d.id);
          console.log(data);
          if (data.code == 0) {
            $scope.text = '';
            $scope.fetch();
          }
        },
        function(data) {
          ngDialog.close(d.id);
          console.log(data);
        });
    }

    $scope.fetch();
  }]);
