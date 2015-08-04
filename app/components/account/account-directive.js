'use strict';

angular.module('bb.account.select', [])
    .controller('Controller', [ '$scope', '$cookies', 'account', function($scope, $cookies, account) {
      $scope.accounts = account.accounts;
      $scope.userid = account.activated.userid;
      $scope.select = function(a) {
        console.log(a);
        account.activate(a);
        $scope.userid = account.activated.userid;
      };
    }])
    .directive('accountSelect', function() {
      return {
        restrict: 'A',
        templateUrl: 'components/account/account-select.html'
      }
    });
