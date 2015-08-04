'use strict';

angular.module('bb.version', [
  'bb.version.interpolate-filter',
  'bb.version.version-directive'
])

.value('version', '73');
