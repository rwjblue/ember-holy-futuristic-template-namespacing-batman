/* globals Ember */
/* eslint-disable ember/new-module-imports */

const { isElementDescriptor } = Ember.__loader.require('@ember/-internals/metal');

(function() {
  const ORIGINAL_INJECT_SERVICE = Ember.inject.service;
  Ember.inject.service = function(...args) {
    const resolvedName = isElementDescriptor(args) ? undefined : args[0];

    if (resolvedName === undefined) {
      return ORIGINAL_INJECT_SERVICE.call(this, ...args);
    }

    const mutatedName = resolvedName.replace('$', '@');
    const mutatedArgs = args.slice();
    mutatedArgs.splice(mutatedArgs.indexOf(resolvedName), 1, mutatedName);

    return ORIGINAL_INJECT_SERVICE.call(this, ...mutatedArgs);
  };
})();
