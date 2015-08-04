'use strict';

describe('bb.version module', function() {
  beforeEach(module('bb.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
