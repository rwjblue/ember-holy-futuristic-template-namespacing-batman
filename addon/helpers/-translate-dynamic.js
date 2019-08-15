import { helper } from '@ember/component/helper';

export default helper(function(args) {
  if (args && typeof args[0] === 'string') {
    return args[0].replace('::', '@').replace('$', '@');
  }
  return args && args[0];
});
