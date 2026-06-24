import moo from 'moo';

export const lexer = moo.compile({
  whitespace: {
    match: /\s+/,
    lineBreaks: true,
  },
  notEquals: '!=',
  equals: '=',
  plus: '+',
  minus: '-',
  multiply: '*',
  divide: '/',
  leftParen: '(',
  rightParen: ')',
  number: /(?:\d+(?:\.\d*)?|\.\d+)/,
});
