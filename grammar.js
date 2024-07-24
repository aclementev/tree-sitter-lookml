module.exports = grammar({
  name: 'lookml',
  rules: {
    object: $ => repeat1(choice($.statement, $.comment)),
    key: $ => $._identifier,
    // TODO: Figure out how to do line comments
    comment: $ => seq('#', /[^\n]*/),
    statement: $ => seq($.key, ':', $._value),
    _identifier: $ => /[a-zA-Z_][a-zA-Z0-9-_]+/,
    _value: $ => choice($.bool, $.number, $.string),
    bool: $ => choice('yes', 'no', 'true', 'false'),
    number: $ => choice(/[0-9]+/, /[0-9]*\.[0-9]+/),
    string: $ => seq('"', token.immediate(/[^"]+/), token.immediate('"')),
    //_block: $ =>
  }
})
