/* globals define */
import { helper as buildHelper } from '@ember/component/helper';

import Component from '@ember/component';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

define('other-namespace/templates/components/some-template-thing', ['exports'], function(exports) {
  exports.default = hbs`some-template-thing`;
});

define('other-namespace/components/some-js-thing', ['exports'], function(exports) {
  exports.default = Component.extend({
    tagName: 'p',
    classNames: ['some-js-thing']
  });
});

define('other-namespace/helpers/some-helper-thing', ['exports'], function(exports) {
  exports.default = buildHelper(function([arg1]) {
    return arg1;
  });
});

module('test-namespacing', function(hooks) {
  setupRenderingTest(hooks);

  test('it can render a helper', async function(assert) {
    await render(hbs`{{other-namespace::some-helper-thing 'hi'}}`);

    assert.equal(find('*').textContent.trim(), 'hi');
  });

  test('it can render a template only component', async function(assert) {
    await render(hbs`{{other-namespace::some-template-thing derp="here"}}`);

    assert.equal(find('*').textContent.trim(), 'some-template-thing');
  });

  test('it can render a JS only component', async function(assert) {
    await render(hbs`{{#other-namespace::some-js-thing}}hi{{/other-namespace::some-js-thing}}`);

    assert.equal(find('*').textContent.trim(), 'hi');
  });
});
