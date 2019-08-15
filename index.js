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
    let dollarPluginObj = this._buildDollarPlugin();
    dollarPluginObj.parallelBabel = {
      requireFile: __filename,
      buildUsing: '_buildDollarPlugin',
      params: {}
    }

    registry.add("htmlbars-ast-plugin", dollarPluginObj);

    let colonPluginObj = this._buildColonPlugin();
    colonPluginObj.parallelBabel = {
      requireFile: __filename,
      buildUsing: '_buildColonPlugin',
      params: {}
    }

   registry.add("htmlbars-ast-plugin", colonPluginObj);
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

  _buildColonPlugin() {
    return {
      name: 'holy-futuristic-template-namespacing-batman',
      plugin: require("./lib/namespacing-transform").ColonNamespacingTransform,
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
