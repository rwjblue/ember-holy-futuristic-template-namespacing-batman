/* globals define */
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { default as Service, inject } from '@ember/service';

define('other-namespace/services/some-thing', ['exports'], function(exports) {
  exports.default = Service.extend({
    sayHi() { return 'hi!'; }
  });
});

module('Unit | Service | namespaced-services', function(hooks) {
  setupTest(hooks);

  test('works with $', function(assert) {
    this.owner.register('service:subject', Service.extend({
      someService: inject('other-namespace$some-thing'),
    }));

    let service = this.owner.lookup('service:subject');

    assert.equal(service.get('someService').sayHi(), 'hi!');
  });

  test('works with :: [deprecated]', function(assert) {
    this.owner.register('service:subject', Service.extend({
      someService: inject('other-namespace::some-thing'),
    }));

    let service = this.owner.lookup('service:subject');
    assert.equal(service.get('someService').sayHi(), 'hi!');
  });
});
