'use strict';

const VersionChecker = require('ember-cli-version-checker');

module.exports = {
  name: 'ember-holy-futuristic-template-namespacing-batman',

  init() {
    this._super.init.apply(this, arguments);

    let checker = new VersionChecker(this.project);

    checker.for('ember-resolver').assertAbove('4.5.0', 'To use ember-holy-futuristic-template-namespacing-batman you must have ember-resolver@4.5.0');
  },

  setupPreprocessorRegistry(type, registry) {
    let dollarPluginObj = this._buildDollarPlugin();
    dollarPluginObj.parallelBabel = {
      requireFile: __filename,
      buildUsing: '_buildDollarPlugin',
      params: {}
    }

    registry.add("htmlbars-ast-plugin", dollarPluginObj);
  },

  _buildDollarPlugin() {
    return {
      name: 'holy-futuristic-template-namespacing-batman',
      plugin: require("./lib/namespacing-transform").DollarNamespacingTransform,
      baseDir: function() {
        return __dirname;
      }
    };
  },

  included() {
    this._super.included.apply(this, arguments);

    this.import('vendor/service-inject-3.js');
  }
};
