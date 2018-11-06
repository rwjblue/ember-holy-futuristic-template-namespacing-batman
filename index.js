'use strict';

const VersionChecker = require('ember-cli-version-checker');

module.exports = {
  name: 'ember-holy-futuristic-template-namespacing-batman',

  init() {
    this._super.init.apply(this, arguments);

    let checker = new VersionChecker(this);

    checker.for('ember-resolver').assertAbove('4.5.0', 'To use ember-holy-futuristic-template-namespacing-batman you must have ember-resolver@4.5.0');
  },

  setupPreprocessorRegistry(type, registry) {
    let pluginObj = this._buildPlugin();
    pluginObj.parallelBabel = {
      requireFile: __filename,
      buildUsing: '_buildPlugin',
      params: {}
    }

   registry.add("htmlbars-ast-plugin", pluginObj);
  },

  _buildPlugin() {
    return {
      name: 'holy-futuristic-template-namespacing-batman',
      plugin: require("./lib/namespacing-transform"),
      baseDir: function() {
        return __dirname;
      }
    };
  },

  included() {
    this._super.included.apply(this, arguments);
    this.import('vendor/service-inject.js');
  }
};
