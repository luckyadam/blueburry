'use strict';

angular.module('bb.views.publish', ['flow'])

.controller('PublishCtrl', ['$scope', 'ngDialog', 'requester', function($scope, ngDialog, requester) {
  $scope.realName = true;
  $scope.publish = function() {
    var d = ngDialog.open({ templateUrl: 'views/dialogs/loading.html' });
    requester.request('publish', ["", "ffffffff", $scope.content, $scope.factoryId, $scope.realName ? 1 : 0, 0],
      function(data) {
        console.log(data);
        ngDialog.closeAll();
        if (data.code == 0) {
          $scope.refresh();
        }
      },
      function(data) {
        console.log(data);
        ngDialog.close();
      });
    }
}]);
