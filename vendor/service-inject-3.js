/* globals Ember */
/* eslint-disable ember/new-module-imports */

(function() {

  const ORIGINAL_INJECT_SERVICE = Ember.inject.service;
  Ember.inject.service = function() {
    // when called as a stage 1 decorator, we will have 3 arguments
    // otherwise we can only have a maximum of 2
    var calledAsDecorator = arguments.length === 3;

    if (calledAsDecorator) {
      return ORIGINAL_INJECT_SERVICE.apply(this, arguments);
    } else {
      var name = arguments[0];
      var options = arguments[1];

      var mutatedName = name === undefined ? undefined : name.replace('$', '@');

      return ORIGINAL_INJECT_SERVICE.call(this, mutatedName, options);
    }
  };
})();
