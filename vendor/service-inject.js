/* globals Ember */
(function() {
  // eslint-disable-next-line ember/new-module-imports
  var ORIGINAL_INJECT_SERVICE = Ember.inject.service;
  // eslint-disable-next-line ember/new-module-imports
  Ember.inject.service = function(_name) {
    var name = _name === undefined ? undefined : _name.replace('::', '@');
    return ORIGINAL_INJECT_SERVICE.call(this, name);
  };
})();

