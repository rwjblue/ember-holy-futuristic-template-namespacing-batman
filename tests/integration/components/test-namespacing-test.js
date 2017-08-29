/* globals define */
import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

define('other-namespace/templates/components/some-template-thing', ['exports'], function(exports) {
  exports.default = hbs`some-template-thing`;
});

define('other-namespace/components/some-js-thing', ['exports'], function(exports) {
  exports.default = Ember.Component.extend({
    tagName: 'p',
    classNames: ['some-js-thing']
  });
});

define('other-namespace/helpers/some-helper-thing', ['exports'], function(exports) {
  exports.default = Ember.Helper.helper(function([arg1]) {
    return arg1;
  });
});

moduleForComponent('test-namespacing', {
  integration: true,
});

test('it can render a helper', function(assert) {
  this.render(hbs`{{other-namespace::some-helper-thing 'hi'}}`);

  assert.equal(this.$().text().trim(), 'hi');
});

test('it can render a template only component', function(assert) {
  this.render(hbs`{{other-namespace::some-template-thing derp="here"}}`);

  assert.equal(this.$().text().trim(), 'some-template-thing');
});

test('it can render a JS only component', function(assert) {
  this.render(hbs`{{#other-namespace::some-js-thing}}hi{{/other-namespace::some-js-thing}}`);

  assert.equal(this.$().text().trim(), 'hi');
});
