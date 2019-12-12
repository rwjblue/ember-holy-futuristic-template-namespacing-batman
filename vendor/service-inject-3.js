/* globals Ember */
/* eslint-disable ember/new-module-imports */

(function() {
  const { require: emberRequire } = Ember.__loader;

  function maybeRequire(moduleName) {
    return emberRequire.has(moduleName) && emberRequire(moduleName);
  }

  const emberMetal = maybeRequire('@ember/-internals/metal');

  const ORIGINAL_INJECT_SERVICE = Ember.inject.service;
  Ember.inject.service = function(...args) {
    if (Ember.tryInvoke(emberMetal, 'isElementDescriptor', args)) {
      return ORIGINAL_INJECT_SERVICE.call(this, ...args);
    }

    const mutatedName = args[0].replace('$', '@');
    args.splice(0, 1, mutatedName);
    return ORIGINAL_INJECT_SERVICE.apply(this, args);
  };
})();
