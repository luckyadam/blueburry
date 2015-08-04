'use strict';


describe('bb.requester.module', function() {
  beforeEach(module('bb.requester'));

  describe('requester service', function() {
    it('should to be defined', inject(function(requester) {
      console.log(requester);
      expect(requester).toBeDefined();
    }));
  });
});
