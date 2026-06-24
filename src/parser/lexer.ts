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
  times: '*',
  divide: '/',
  leftParen: '(',
  rightParen: ')',
  number: /(?:\d+(?:\.\d*)?|\.\d+)/,
});
