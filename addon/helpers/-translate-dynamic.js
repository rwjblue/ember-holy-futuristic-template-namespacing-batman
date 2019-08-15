import { helper } from '@ember/component/helper';
import { deprecate } from '@ember/debug';

export default helper(function([name]) {
  if (typeof name !== 'string') {
    return name;
  }

  if (name.indexOf('::') > -1) {
    deprecate(
      'ember-holy-futuristic-template-namespacing-batman: Using `::` for namespacing is deprecated, please migrate from {{component "' + name + '" to {{"' + name.replace('::', '$') + '"',
      false,
      {
        id: 'ember-holy-futuristic-template-namespacing-batman.colon-syntax',
        until: '0.2.0'
      }
    );

    return name.replace('::', '@');
  } else {
    return name.replace('$', '@');
  }
});
