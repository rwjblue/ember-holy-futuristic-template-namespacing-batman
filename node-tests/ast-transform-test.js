const { expect } = require('chai');
const templateCompiler = require('ember-source/dist/ember-template-compiler');
const Plugin = require('../lib/namespacing-transform')

describe('namespacing-transform', function() {
  function precompile(templateString, _options) {
    let options = Object.assign({
      moduleName: 'random-app/template-name.hbs',
      contents: templateString,
      plugins: {
        ast: [Plugin]
      }
    }, _options);

    return templateCompiler.precompile(templateString, options);
  }

  it('can precompile a simple template', function() {
    let output = precompile('{{foo$bar}}');

    expect(output).to.not.include('$');
  });
});
