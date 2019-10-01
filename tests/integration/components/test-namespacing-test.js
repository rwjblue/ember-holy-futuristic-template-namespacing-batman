/* globals define */
import { helper as buildHelper } from '@ember/component/helper';
import { default as Service, inject } from '@ember/service';

import Component from '@ember/component';
import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

define('other-namespace/services/some-service', ['exports'], function(exports) {
  exports.default = Service.extend({
    text: 'some random text'
  });
});

define('other-namespace/templates/components/some-dollar-service-thing', ['exports'], function(exports) {
  exports.default = hbs`{{someService.text}}`;
});

define('other-namespace/components/some-dollar-service-thing', ['exports'], function(exports) {
  exports.default = Component.extend({
    someService: inject('other-namespace$some-service'),
  });
});

define('other-namespace/templates/components/some-colon-service-thing', ['exports'], function(exports) {
  exports.default = hbs`{{someService.text}}`;
});

define('other-namespace/components/some-colon-service-thing', ['exports'], function(exports) {
  exports.default = Component.extend({
    someService: inject('other-namespace::some-service'),
  });
});

define('other-namespace/templates/components/some-nested/template-thing', ['exports'], function(exports) {
  exports.default = hbs`some-nested-template-thing`;
});

define('other-namespace/templates/components/some-template-thing', ['exports'], function(exports) {
  exports.default = hbs`some-template-thing`;
});

define('other-namespace/components/some-js-thing', ['exports'], function(exports) {
  exports.default = Component.extend({
    tagName: 'p',
    classNames: ['some-js-thing']
  });
});

define('other-namespace/templates/components/some-yield-static', ['exports'], function(exports) {
  exports.default = hbs`{{yield (component "other-namespace::some-template-thing")}}`;
});

define('other-namespace/templates/components/some-yield-dynamic', ['exports'], function(exports) {
  exports.default = hbs`{{yield (component dynamicName)}}`;
});

define('other-namespace/templates/components/some-yield-helper', ['exports'], function(exports) {
  exports.default = hbs`
    {{yield
      (component
        (other-namespace::some-helper-thing "other-namespace::some-template-thing")
      )
    }}`;
});

define('other-namespace/helpers/some-helper-thing', ['exports'], function(exports) {
  exports.default = buildHelper(function([arg1]) {
    return arg1;
  });
});

module('test-namespacing', function(hooks) {
  setupRenderingTest(hooks);

  module('$ scoping', function() {
    test('it can render a helper', async function(assert) {
      await render(hbs`{{other-namespace$some-helper-thing 'hi'}}`);

      assert.equal(find('*').textContent.trim(), 'hi');
    });

    test('it can render a template only component', async function(assert) {
      await render(hbs`{{other-namespace$some-template-thing derp="here"}}`);

      assert.equal(find('*').textContent.trim(), 'some-template-thing');
    });

    test('it can render a JS only component', async function(assert) {
      await render(hbs`{{#other-namespace$some-js-thing}}hi{{/other-namespace$some-js-thing}}`);

      assert.equal(find('*').textContent.trim(), 'hi');
    });

    test('it can render an angle bracket component', async function(assert) {
      await render(hbs`<OtherNamespace$SomeJsThing>hi</OtherNamespace$SomeJsThing>`);

      assert.equal(find('*').textContent.trim(), 'hi');
    });

    // this should be unskipped when we no longer process both `::` and `$` sigils, currently
    // it is impossible to guarantee that nested component invocation actually works because we supported `::` in
    // angle brackets
    skip('it can render a nested angle bracket component', async function(assert) {
      await render(hbs`<OtherNamespace$SomeNested::TemplateThing>hi</OtherNamespace$SomeNested::TemplateThing>`);

      assert.equal(find('*').textContent.trim(), 'some-nested-template-thing');
    });

    test('it can render service injection', async function(assert) {
      await render(hbs`{{other-namespace$some-dollar-service-thing}}`);

      assert.equal(find('*').textContent.trim(), 'some random text');
    });

    test('it can render dynamic component', async function(assert) {
      this.dynamicName = "other-namespace$some-dollar-service-thing";
      await render(hbs`{{component dynamicName}}`);

      assert.equal(find('*').textContent.trim(), 'some random text');
    });

    test('it can render component helper with static name', async function(assert) {
      await render(hbs`{{component "other-namespace$some-dollar-service-thing"}}`);

      assert.equal(find('*').textContent.trim(), 'some random text');
    });

    test('it can render component helper with expression', async function(assert) {
      await render(hbs`
      {{component
        (other-namespace$some-helper-thing "other-namespace$some-dollar-service-thing")
      }}
    `);

      assert.equal(find('*').textContent.trim(), 'some random text');
    });

    test('it can render component helper in block mode with static name', async function(assert) {
      await render(hbs`{{#component "other-namespace$some-yield-static" as |cmpt|}}
                       {{component cmpt}}
                     {{/component}}`);

      assert.equal(find('*').textContent.trim(), 'some-template-thing');
    });

    test('it can render component helper in block mode with expression', async function(assert) {
      await render(hbs`
      {{#component
        (other-namespace$some-helper-thing "other-namespace$some-yield-static")
        as |cmpt|}}
        {{component cmpt}}
      {{/component}}
    `);

      assert.equal(find('*').textContent.trim(), 'some-template-thing');
    });

    test('it can render component helper in block mode with dynamic name', async function(assert) {
      this.dynamicName = 'other-namespace$some-yield-static';
      await render(hbs`{{#component dynamicName as |cmpt|}}
                       {{component cmpt}}
                     {{/component}}`);

      assert.equal(find('*').textContent.trim(), 'some-template-thing');
    });

    test('it can yield component with dynamic name', async function(assert) {
      await render(
        hbs`{{#other-namespace$some-yield-dynamic dynamicName="other-namespace$some-template-thing" as |cmpt|}}
            {{component cmpt}}
          {{/other-namespace$some-yield-dynamic}}`
      );

      assert.equal(find('*').textContent.trim(), 'some-template-thing');
    });

    test('it can yield component with static name', async function(assert) {
      await render(
        hbs`{{#other-namespace$some-yield-static  as |cmpt|}}
            {{component cmpt}}
          {{/other-namespace$some-yield-static}}`
      );

      assert.equal(find('*').textContent.trim(), 'some-template-thing');
    });

    test('it can yield component with expression', async function(assert) {
      await render(
        hbs`{{#other-namespace$some-yield-helper  as |cmpt|}}
            {{component cmpt}}
          {{/other-namespace$some-yield-helper}}`
      );

      assert.equal(find('*').textContent.trim(), 'some-template-thing');
    });
  });

  module(':: scoping [deprecated]', function() {
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

    // cannot pass due to ember-angle-bracket-invocation-polyfill adding support for `::` meaning nested
    skip('it can render an angle bracket component', async function(assert) {
      await render(hbs`<OtherNamespace::SomeJsThing>hi</OtherNamespace::SomeJsThing>`);

      assert.equal(find('*').textContent.trim(), 'hi');
    });

    test('it can render service injection', async function(assert) {
      await render(hbs`{{other-namespace::some-colon-service-thing}}`);

      assert.equal(find('*').textContent.trim(), 'some random text');
    });

    test('it can render dynamic component', async function(assert) {
      this.dynamicName = "other-namespace::some-colon-service-thing";
      await render(hbs`{{component dynamicName}}`);

      assert.deprecationsInclude('ember-holy-futuristic-template-namespacing-batman: Using `::` for namespacing is deprecated, please migrate from {{component "other-namespace::some-colon-service-thing" to {{"other-namespace$some-colon-service-thing"');

      assert.equal(find('*').textContent.trim(), 'some random text');
    });

    test('it can render component helper with static name', async function(assert) {
      await render(hbs`{{component "other-namespace::some-colon-service-thing"}}`);

      assert.equal(find('*').textContent.trim(), 'some random text');
    });

    test('it can render component helper with expression', async function(assert) {
      await render(hbs`
      {{component
        (other-namespace::some-helper-thing "other-namespace::some-colon-service-thing")
      }}
    `);

      assert.deprecationsInclude('ember-holy-futuristic-template-namespacing-batman: Using `::` for namespacing is deprecated, please migrate from {{component "other-namespace::some-colon-service-thing" to {{"other-namespace$some-colon-service-thing"');

      assert.equal(find('*').textContent.trim(), 'some random text');
    });

    test('it can render component helper in block mode with static name', async function(assert) {
      await render(hbs`{{#component "other-namespace::some-yield-static" as |cmpt|}}
                       {{component cmpt}}
                     {{/component}}`);

      assert.equal(find('*').textContent.trim(), 'some-template-thing');
    });

    test('it can render component helper in block mode with expression', async function(assert) {
      await render(hbs`
      {{#component
        (other-namespace::some-helper-thing "other-namespace::some-yield-static")
        as |cmpt|}}
        {{component cmpt}}
      {{/component}}
    `);

      assert.equal(find('*').textContent.trim(), 'some-template-thing');
    });

    test('it can render component helper in block mode with dynamic name', async function(assert) {
      this.dynamicName = 'other-namespace::some-yield-static';
      await render(hbs`{{#component dynamicName as |cmpt|}}
                       {{component cmpt}}
                     {{/component}}`);

      assert.equal(find('*').textContent.trim(), 'some-template-thing');
    });

    test('it can yield component with dynamic name', async function(assert) {
      await render(
        hbs`{{#other-namespace::some-yield-dynamic dynamicName="other-namespace::some-template-thing" as |cmpt|}}
            {{component cmpt}}
          {{/other-namespace::some-yield-dynamic}}`
      );

      assert.equal(find('*').textContent.trim(), 'some-template-thing');
    });

    test('it can yield component with static name', async function(assert) {
      await render(
        hbs`{{#other-namespace::some-yield-static  as |cmpt|}}
            {{component cmpt}}
          {{/other-namespace::some-yield-static}}`
      );

      assert.equal(find('*').textContent.trim(), 'some-template-thing');
    });

    test('it can yield component with expression', async function(assert) {
      await render(
        hbs`{{#other-namespace::some-yield-helper  as |cmpt|}}
            {{component cmpt}}
          {{/other-namespace::some-yield-helper}}`
      );

      assert.equal(find('*').textContent.trim(), 'some-template-thing');
    });
  });
});
