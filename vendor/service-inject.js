/* globals Ember */
/* eslint-disable ember/new-module-imports */

(function() {
  var ORIGINAL_INJECT_SERVICE = Ember.inject.service;
  Ember.inject.service = function(name) {
    if (name === undefined) {
      return ORIGINAL_INJECT_SERVICE.call(this, name);
    }

    if (name.indexOf('::') > -1) {
      Ember.deprecate(
        'ember-holy-futuristic-template-namespacing-batman: Using `::` for namespacing is deprecated, please migrate from `' + name + '` to `' + name.replace('::', '$') + '`',
        false,
        {
          id: 'ember-holy-futuristic-template-namespacing-batman.colon-syntax',
          until: '0.2.0'
        }
      );
      return ORIGINAL_INJECT_SERVICE.call(this, name.replace('::', '@'));
    } else {
      return ORIGINAL_INJECT_SERVICE.call(this, name.replace('$', '@'));
    }
  };
})();

