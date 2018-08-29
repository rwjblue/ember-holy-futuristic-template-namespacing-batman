'use strict';

module.exports = {
  name: 'ember-holy-futuristic-template-namespacing-batman',

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
