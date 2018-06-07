ember-holy-futuristic-template-namespacing-batman
==============================================================================

This experimental addon allows the usage of `{{some-addon-name::component-name}}` today! 🎉

Installation
------------------------------------------------------------------------------

```
ember install ember-holy-futuristic-template-namespacing-batman
```


Usage
------------------------------------------------------------------------------

Allows experimenting with [Module Unification Namespaces RFC](https://github.com/emberjs/rfcs/pull/309) namespacing in your applications today.

- Supports helper invocation:

```hbs
{{addon-name::helper-name}}
```

- Supports component invocation:

```hbs
{{addon-name::component-name}}
```

- Supports angle bracket invocation (when used with Ember 3.4+ or ember-angle-bracket-invocation-polyfill)

```hbs
<AddonName::ComponentName />
```

Contributing
------------------------------------------------------------------------------

### Installation

* `git clone git@github.com:rwjblue/ember-holy-futuristic-template-namespacing-batman`
* `cd ember-holy-futuristic-template-namespacing-batman`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).