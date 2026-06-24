@{%
const { lexer } = require("./lexer");

const id = ([value]) => value;

const binaryExpression = (left, operatorToken, right) => ({
  type: "BinaryExpression",
  operator: operatorToken.value,
  left,
  right,
});

const numberLiteral = ([token]) => ({
  type: "NumberLiteral",
  value: Number(token.value),
});
%}

@lexer lexer

main
  -> _ Addition _ {% ([, expression]) => expression %}

Addition
  -> Addition _ %plus _ Multiplication {% ([left, , operator, , right]) => binaryExpression(left, operator, right) %}
   | Addition _ %minus _ Multiplication {% ([left, , operator, , right]) => binaryExpression(left, operator, right) %}
   | Multiplication {% id %}

Multiplication
  -> Multiplication _ %times _ Primary {% ([left, , operator, , right]) => binaryExpression(left, operator, right) %}
   | Multiplication _ %divide _ Primary {% ([left, , operator, , right]) => binaryExpression(left, operator, right) %}
   | Primary {% id %}

Primary
  -> %number {% numberLiteral %}
   | %leftParen _ Addition _ %rightParen {% ([, , expression]) => expression %}

_
  -> %whitespace:* {% () => null %}