'use strict';

module.exports = class NamespacingTransform {
  constructor(options) {
    this.syntax = null;
    this.options = options;
  }

  transform(ast) {
    const b = this.syntax.builders;

    this.syntax.traverse(ast, {
      PathExpression(node) {
        if (node.parts.length > 1 || !node.original.includes('::')) {
          return;
        }

        let { loc } = node;
        // Ember 2.12 has an issue with `b.path` when loc is null
        if (loc === null) {
          loc = undefined;
        }
        return b.path(node.original.replace('::', '@'), loc);
      },
      ElementNode(node) {
        if (node.tag.indexOf('::') > -1) {
          node.tag = node.tag.replace('::', '@');
        }
      }
    });

    return ast;
  }
}
