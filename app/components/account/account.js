'use strict';


angular.module('bb.account', ['bb.account.select'])

.factory('account', ['$cookies', function($cookies) {
  var account = function() {};

  var object = $cookies.getObject('accounts');
  account.prototype.accounts = object == undefined ? [] : object;

  account.prototype.activated = $cookies.getObject('activated');

  account.prototype.add = function(userid, token) {
    var account = {
      'userid': userid,
      'token': token
    };
    this.accounts.push(account);
    if (this.accounts.length == 1) {
      this.activated = account;
      $cookies.putObject('activated', this.activated);
    }
    $cookies.putObject('accounts', this.accounts);
  };

  account.prototype.del = function(a) {
    this.accounts = _.without(this.accounts, a);
    $cookies.putObject('accounts', this.accounts);
  };

  account.prototype.activate = function(a) {
    this.activated = a;
    $cookies.putObject('activated', this.activated);
  };

  return new account();
}]);
