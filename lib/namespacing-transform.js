'use strict';

const TRANSLATE_HELPER = 'ember-holy-futuristic-template-namespacing-batman@-translate-dynamic-2';

function rewriteOrWrapComponentParam(node, b, sigil) {
  if (!node.params.length) {
    return;
  }
  let firstParam = node.params[0];
  if (firstParam.type === 'StringLiteral') {
    node.params[0] = b.string(firstParam.original.replace(sigil, '@'));
    return;
  }
  if (firstParam.type === 'PathExpression' || firstParam.type === 'SubExpression') {
    node.params[0] = b.sexpr(TRANSLATE_HELPER, [firstParam], null, firstParam.loc);
    return;
  }
}

function emberHolyFuturisticNamespacingBatmanTransform(env)  {
  let sigil = '$';
  let b = env.syntax.builders;

  return {
    name: 'ember-holy-futuristic-template-namespacing-batman:namespacing-transform',

    visitor: {
      PathExpression(node) {
        if (node.parts.length > 1 || !node.original.includes(sigil)) {
          return;
        }

        let loc = node.loc;
        // Ember 2.12 has an issue with `b.path` when loc is null
        if (loc === null) {
          loc = undefined;
        }

        return b.path(node.original.replace(sigil, '@'), loc);
      },
      ElementNode(node) {
        if (node.tag.indexOf(sigil) > -1) {
          node.tag = node.tag.replace(sigil, '@');
        }
      },
      MustacheStatement(node) {
        if (node.path.original !== 'component') {
          // we don't care about non-component expressions
          return;
        }
        rewriteOrWrapComponentParam(node, b, sigil);
      },
      SubExpression(node) {
        if (node.path.original !== 'component') {
          // we don't care about non-component expressions
          return;
        }
        rewriteOrWrapComponentParam(node, b, sigil);
      },
      BlockStatement(node) {
        if (node.path.original !== 'component') {
          // we don't care about blocks not using component
          return;
        }
        rewriteOrWrapComponentParam(node, b, sigil);
      }
    },
  };
}

emberHolyFuturisticNamespacingBatmanTransform.cacheKey = () => 'ember-holy-futuristic-template-namespacing-batman:namespacing-transform';

module.exports = emberHolyFuturisticNamespacingBatmanTransform;
