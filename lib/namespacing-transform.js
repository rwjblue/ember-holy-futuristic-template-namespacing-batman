'use strict';

const TRANSLATE_HELPER = 'ember-holy-futuristic-template-namespacing-batman@-translate-dynamic';

function rewriteOrWrapComponentParam(node, b) {
  if (!node.params.length) {
    return;
  }
  let firstParam = node.params[0];
  if (firstParam.type === 'StringLiteral') {
    // handle string constant
    node.params[0] = b.string(firstParam.original.replace('::', '@'));
    return;
  }
  if (firstParam.type === 'PathExpression' || firstParam.type === 'SubExpression') {
    node.params[0] = b.sexpr(TRANSLATE_HELPER, [firstParam], null, firstParam.loc);
    return;
  }
}

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

        let loc = node.loc;
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
      },
      MustacheStatement(node) {
        if (node.path.original !== 'component') {
          // we don't care about non-component expressions
          return;
        }
        rewriteOrWrapComponentParam(node, b);
      },
      SubExpression(node) {
        if (node.path.original !== 'component') {
          // we don't care about non-component expressions
          return;
        }
        rewriteOrWrapComponentParam(node, b);
      },
      BlockStatement(node) {
        if (node.path.original !== 'component') {
          // we don't care about blocks not using component
          return;
        }
        rewriteOrWrapComponentParam(node, b);
      }
    });

    return ast;
  }
}
