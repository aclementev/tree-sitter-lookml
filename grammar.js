module.exports = grammar({
  name: 'lookml',
  rules: {
    object: $ => repeat1(choice($.statement, $.comment)),
    key: $ => $._identifier,
    // TODO: Figure out how to do rest of line comments
    comment: $ => seq('#', /[^\n]*/),
    statement: $ => seq($.key, ':', $._value),
    bool: $ => choice('yes', 'no', 'true', 'false'),
    number: $ => choice(/[0-9]+/, /[0-9]*\.[0-9]+/),
    string: $ => seq('"', token.immediate(/[^"]+/), token.immediate('"')),
    block: $ => $._block,
    _block: $ => seq('{', $.object, '}'),
    named_block: $ => seq(field('name', $._identifier), $._block),
    _identifier: $ => /[a-zA-Z_][a-zA-Z0-9-_]+/,
    _value: $ => choice($.bool, $.number, $.string, $.named_block, $.block),
  }
})
