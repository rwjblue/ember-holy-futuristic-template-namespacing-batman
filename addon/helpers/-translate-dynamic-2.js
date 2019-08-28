import { helper } from '@ember/component/helper';

export default helper(function([name]) {
  if (typeof name !== 'string') {
    return name;
  }

  if (name.indexOf('::') > -1) {
    return name.replace('::', '@');
  } else {
    return name.replace('$', '@');
  }
});
