'use strict';

angular.module('bb.views.account', ['ngRoute', 'ngDialog', 'bb.account', 'bb.requester'])

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/account', {
        templateUrl: 'views/account/account.html',
        controller: 'AccountCtrl'
      })
    }])
    .controller('AccountCtrl', ['$scope', 'ngDialog', 'account', 'requester', function ($scope, ngDialog, account, requester) {

      $scope.showForm = false;
      $scope.accounts = account.accounts;

      $scope.add = function () {
        $scope.showForm = !$scope.showForm;
      };

      $scope.login = function () {
        var d = ngDialog.open({template: 'views/dialogs/loading.html', showClose: false});
        requester.request('login', [$scope.phone, $scope.password],
            function (data) {
              ngDialog.close(d.id);
              if (data.code == 0) {
                console.log(data);
                account.add(data.object.userId, data.object.token)
                $scope.showForm = false;
                $scope.accounts = account.accounts;
                $scope.$apply();
              } else {
                ngDialog.open({template: 'views/dialogs/request-error.html'})
              }
            },
            function (data, status, headers, config) {
              console.log(data);
              ngDialog.close(d.id);
            });
      }
    }]
);

