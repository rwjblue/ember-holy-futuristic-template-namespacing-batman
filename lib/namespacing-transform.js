'use strict';

const TRANSLATE_HELPER = 'ember-holy-futuristic-template-namespacing-batman@-translate-dynamic-2';

function rewriteOrWrapComponentParam(node, b, sigil, callback) {
  if (!node.params.length) {
    return;
  }
  let firstParam = node.params[0];
  if (firstParam.type === 'StringLiteral') {
    // allows deprecation for `::`, callback is provided by the
    // `ColonNamespacingTransform` only
    if (callback !== undefined && firstParam.original.indexOf(sigil) > -1) {
      callback(firstParam.original, firstParam.original.replace(sigil, '$'), firstParam.loc);
    }

    node.params[0] = b.string(firstParam.original.replace(sigil, '@'));
    return;
  }
  if (firstParam.type === 'PathExpression' || firstParam.type === 'SubExpression') {
    node.params[0] = b.sexpr(TRANSLATE_HELPER, [firstParam], null, firstParam.loc);
    return;
  }
}

class NamespacingTransform {
  constructor(options) {
    this.syntax = null;
    this.options = options;
    this.sigil = undefined;
  }

  transform(ast) {
    const b = this.syntax.builders;
    let sigil = this.sigil;
    let deprecationCallback = this.deprecationCallback;

    this.syntax.traverse(ast, {
      PathExpression(node) {
        if (node.parts.length > 1 || !node.original.includes(sigil)) {
          return;
        }

        let loc = node.loc;
        // Ember 2.12 has an issue with `b.path` when loc is null
        if (loc === null) {
          loc = undefined;
        }

        if (deprecationCallback !== undefined) {
          deprecationCallback(node.original, node.original.replace(sigil, '$'), node.loc);
        }

        return b.path(node.original.replace(sigil, '@'), loc);
      },
      ElementNode(node) {
        if (node.tag.indexOf(sigil) > -1) {
          if (deprecationCallback !== undefined) {
            deprecationCallback(node.tag, node.tag.replace(sigil, '$'), node.loc);
          }

          node.tag = node.tag.replace(sigil, '@');
        }
      },
      MustacheStatement(node) {
        if (node.path.original !== 'component') {
          // we don't care about non-component expressions
          return;
        }
        rewriteOrWrapComponentParam(node, b, sigil, deprecationCallback);
      },
      SubExpression(node) {
        if (node.path.original !== 'component') {
          // we don't care about non-component expressions
          return;
        }
        rewriteOrWrapComponentParam(node, b, sigil, deprecationCallback);
      },
      BlockStatement(node) {
        if (node.path.original !== 'component') {
          // we don't care about blocks not using component
          return;
        }
        rewriteOrWrapComponentParam(node, b, sigil, deprecationCallback);
      }
    });

    return ast;
  }
}

class DollarNamespacingTransform extends NamespacingTransform {
  constructor(options) {
    super(options);

    this.sigil = '$';
  }
}

class ColonNamespacingTransform extends NamespacingTransform {
  constructor(options) {
    super(options);

    this.sigil = '::';
    this.deprecationCallback = (actual, expected, loc) => {
      /* eslint-disable-next-line no-console */
      console.log(`ember-holy-futuristic-template-namespacing-batman: Using \`::\` for namespacing is deprecated, please migrate from \`${actual}\` to \`${expected}\` at \`${this.options.meta.moduleName}@L${loc.start.line}:C${loc.start.column}\``);
    };
  }
}

module.exports = {
  DollarNamespacingTransform,
  ColonNamespacingTransform,
};
