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

        return b.path(node.original.replace('::', '@'), node.loc);
      }
    });
    
    return ast;
  }
}
