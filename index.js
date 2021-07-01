'use strict';

const VersionChecker = require('ember-cli-version-checker');
const SilentError = require('silent-error');

function inertPlugin() {
  return {
    name: 'holy-futuristic-template-namespacing-batman:noop',
    visitor: {},
  };
}
inertPlugin.cacheKey = () => 'ember-holy-futuristic-template-namespacing-batman:noop';

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
    if (this.parent === this.project) {
      // If we're a top-level addon, we're never inert
      return false;
    }

    const addon = this.project && this.project.addons.find(a => Boolean(a.app));
    const options = addon && addon.app.options['ember-holy-futuristic-template-namespacing-batman'] || {};

    return Boolean(options.excludeNestedAddonTransforms);
  },

  setupPreprocessorRegistry(type, registry) {
    const addon = this;
    const dollarPluginObj = {
      name: 'holy-futuristic-template-namespacing-batman',
      get plugin() {
        if (addon._shouldBeInert()) {
          return inertPlugin;
        }

        return require('./lib/namespacing-transform').DollarNamespacingTransform;
      },
      baseDir: function() {
        return __dirname;
      },
      cacheKey: function() {
        return addon._shouldBeInert() ? 'noop' : 'transform';
      },
      parallelBabel: {
        requireFile: __filename,
        get buildUsing() {
          return addon._shouldBeInert() ? '_buildInertPlugin' : '_buildDollarPlugin';
        },
      },
    };

    registry.add("htmlbars-ast-plugin", dollarPluginObj);
  },

  _buildDollarPlugin() {
    // Used only when parallelizing the build
    return {
      name: 'holy-futuristic-template-namespacing-batman',
      plugin: require('./lib/namespacing-transform').DollarNamespacingTransform,
      baseDir: function() {
        return __dirname;
      },
    };
  },

  _buildInertPlugin() {
    // Used when parallelized and doing nothing
    return {
      name: 'holy-futuristic-template-namespacing-batman',
      plugin: inertPlugin,
      baseDir: function () {
        return __dirname;
      },
    };
  },

  included() {
    this._super.included.apply(this, arguments);

    if (this._shouldBeInert()) {
      // This addon is included as a transitive dep _and_ excludeNestedAddonTransforms is set
      // Check if there is a top-level copy of this addon and error if not
      const topLevelAddon = this.project.addons.find(a => a.name === this.name);
      if (!topLevelAddon) {
        throw new SilentError(
          "You must have ember-holy-futuristic-template-namespacing-batman installed in the root App if you enable the 'excludeNestedAddonTransforms' option."
        );
      }
    } else {
      this.import('vendor/service-inject-3.js');
    }
  },
};
