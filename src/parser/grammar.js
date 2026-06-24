// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

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
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "main", "symbols": ["_", "Comparison", "_"], "postprocess": ([, expression]) => expression},
    {"name": "Addition", "symbols": ["Addition", "_", (lexer.has("plus") ? {type: "plus"} : plus), "_", "Multiplication"], "postprocess": ([left, , operator, , right]) => binaryExpression(left, operator, right)},
    {"name": "Addition", "symbols": ["Addition", "_", (lexer.has("minus") ? {type: "minus"} : minus), "_", "Multiplication"], "postprocess": ([left, , operator, , right]) => binaryExpression(left, operator, right)},
    {"name": "Addition", "symbols": ["Multiplication"], "postprocess": unwrap},
    {"name": "Multiplication", "symbols": ["Multiplication", "_", (lexer.has("times") ? {type: "times"} : times), "_", "Primary"], "postprocess": ([left, , operator, , right]) => binaryExpression(left, operator, right)},
    {"name": "Multiplication", "symbols": ["Multiplication", "_", (lexer.has("divide") ? {type: "divide"} : divide), "_", "Primary"], "postprocess": ([left, , operator, , right]) => binaryExpression(left, operator, right)},
    {"name": "Multiplication", "symbols": ["Primary"], "postprocess": unwrap},
    {"name": "Primary", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": numberLiteral},
    {"name": "Primary", "symbols": [(lexer.has("leftParen") ? {type: "leftParen"} : leftParen), "_", "Addition", "_", (lexer.has("rightParen") ? {type: "rightParen"} : rightParen)], "postprocess": ([, , expression]) => expression},
    {"name": "Comparison", "symbols": ["Addition", "_", (lexer.has("equals") ? {type: "equals"} : equals), "_", "Addition"], "postprocess": ([left, , operator, , right]) => comparisonExpression(left, operator, right)},
    {"name": "Comparison", "symbols": ["Addition", "_", (lexer.has("notEquals") ? {type: "notEquals"} : notEquals), "_", "Addition"], "postprocess": ([left, , operator, , right]) => comparisonExpression(left, operator, right)},
    {"name": "Comparison", "symbols": ["Addition"], "postprocess": unwrap},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("whitespace") ? {type: "whitespace"} : whitespace)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": () => null}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
