'use strict';

describe('bb.account module', function() {
  beforeEach(module('bb.account'));

  describe('account service', function() {
    it('should add/remove account into accounts', inject(function(account) {
      account.add('test', 'test');
      account.del(account.accounts[0]);
      expect(account.accounts.length).toEqual(0);
    }));

  })
});