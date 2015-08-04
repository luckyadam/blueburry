'use strict';

// Declare app level module which depends on views, and components
angular.module('bb', [
  'ngRoute',
  'ngCookies',
  'ngDialog',
  'bb.views.account',
  'bb.views.feeds',
  'bb.views.comments',
  'bb.views.publish',
  'bb.account',
  'bb.requester',
  'bb.version'
]);
