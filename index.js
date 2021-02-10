'use strict';

const VersionChecker = require('ember-cli-version-checker');


function inertPlugin () {
  return {
    name: 'holy-futuristic-template-namespacing-batman:noop',
    visitor: {}
  }
}

module.exports = {
  name: 'ember-holy-futuristic-template-namespacing-batman',

  init() {
    this._super.init.apply(this, arguments);

    let checker = new VersionChecker(this.project);

    // Only check ember-resolver version if the app is using it (handles case where app uses ember-strict-resolver)
    const emberResolverDep = checker.for('ember-resolver');
    if (emberResolverDep.exists()) {
      emberResolverDep.assertAbove('4.5.0', 'To use ember-holy-futuristic-template-namespacing-batman you must have ember-resolver@4.5.0');
    }
  },

  _shouldBeInert() {
    let hasProject = this.project !== undefined;
    let hasParent = this.parent !== undefined;
    let isTopLevel = this.parent === this.project;

    if (hasProject && hasParent && isTopLevel) {
      // find the first project addon that has an `app` property
      let addon = this.project.addons.find(a => Boolean(a.app));
      if (!addon) return false;

      let options = addon.app.options['ember-holy-futuristic-template-namespacing-batman'] || {};
      if (options.excludeNestedAddonTransforms) {
        return true;
      }
    }

    return false;
  },

  setupPreprocessorRegistry(type, registry) {
    let addon = this;

    let dollarPluginObj = {
      name: 'holy-futuristic-template-namespacing-batman',
      get plugin() {
        if (addon._shouldBeInert()) {
          return inertPlugin;
        } else {
          return require("./lib/namespacing-transform").DollarNamespacingTransform;
        }
      },
      baseDir: function() {
        return __dirname;
      },
      parallelBabel: {
        requireFile: __filename,
        get buildUsing() {
          return addon._shouldBeInert() ? '_buildInertPlugin' : '_buildDollarPlugin';
        },
        params: {}
      }
    }

    registry.add("htmlbars-ast-plugin", dollarPluginObj);
  },

  _buildDollarPlugin() {
    // used when parallelizing the build only
    return {
      name: 'holy-futuristic-template-namespacing-batman',
      plugin: require("./lib/namespacing-transform").DollarNamespacingTransform,
      baseDir: function() {
        return __dirname;
      }
    };
  },

  _buildInertPlugin() {
    // used when parallelized and doing nothing
    return {
      name: 'holy-futuristic-template-namespacing-batman',
      plugin: inertPlugin,
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
