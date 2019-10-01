/* globals Ember */
/* eslint-disable ember/new-module-imports */

(function() {
  var ORIGINAL_INJECT_SERVICE = Ember.inject.service;
  Ember.inject.service = function(name) {
    if (name === undefined) {
      return ORIGINAL_INJECT_SERVICE.call(this, name);
    }

    return ORIGINAL_INJECT_SERVICE.call(this, name.replace('$', '@'));
  };
})();
