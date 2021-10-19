/* globals Ember require */
/* eslint-disable ember/new-module-imports */

(function() {

  function generatePatchedInject(ORIGINAL_INJECT_SERVICE) {
    return function() {
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
    }
  }

  if (typeof require === 'function' && typeof require.has === 'function' && require.has('@ember/service')) {
    // support Ember 4+ (where `window.Ember` is not present)
    // NOTE: this is possibly going to need to change if we ever freeze the exports
    // on our modules
    //
    // Embroider NOTE: this does not work :D (Embroider isn't going to allow mutation of the module at runtime like this)
    var serviceModule = require('@ember/service');

    serviceModule.inject = generatePatchedInject(serviceModule.inject);
  }

  // Also patch `Ember.inject.service` if `window.Ember` is present...
  if (typeof Ember !== 'undefined') {
    Ember.inject.service = generatePatchedInject(Ember.inject.service);
  }
})();
