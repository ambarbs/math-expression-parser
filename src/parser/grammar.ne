@{%
const { lexer } = require("./lexer.cjs");

const unwrap = ([value]) => value;

const comparisonExpression = (left, operatorToken, right) => ({
  type: "ComparisonExpression",
  operator: operatorToken.value,
  left,
  right,
});

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
  -> _ Comparison _ {% ([, expression]) => expression %}

Addition
  -> Addition _ %plus _ Multiplication {% ([left, , operator, , right]) => binaryExpression(left, operator, right) %}
   | Addition _ %minus _ Multiplication {% ([left, , operator, , right]) => binaryExpression(left, operator, right) %}
   | Multiplication {% unwrap %}

Multiplication
  -> Multiplication _ %times _ Primary {% ([left, , operator, , right]) => binaryExpression(left, operator, right) %}
   | Multiplication _ %divide _ Primary {% ([left, , operator, , right]) => binaryExpression(left, operator, right) %}
   | Primary {% unwrap %}

Primary
  -> %number {% numberLiteral %}
   | %leftParen _ Addition _ %rightParen {% ([, , expression]) => expression %}

Comparison
  -> Addition _ %equals _ Addition {% ([left, , operator, , right]) => comparisonExpression(left, operator, right) %}
   | Addition _ %notEquals _ Addition {% ([left, , operator, , right]) => comparisonExpression(left, operator, right) %}
   | Addition {% unwrap %}

_
  -> %whitespace:* {% () => null %}