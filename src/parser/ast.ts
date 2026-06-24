export type ArithmeticOperator = '+' | '-' | '*' | '/';
export type ComparisonOperator = '=' | '!=';

export type NumberLiteralNode = {
  type: 'NumberLiteral';
  value: number;
};

export type BinaryExpressionNode = {
  type: 'BinaryExpression';
  operator: ArithmeticOperator;
  left: ArithmeticExpressionNode;
  right: ArithmeticExpressionNode;
};

export type ArithmeticExpressionNode = NumberLiteralNode | BinaryExpressionNode;

export type ComparisonExpressionNode = {
  type: 'ComparisonExpression';
  operator: ComparisonOperator;
  left: ArithmeticExpressionNode;
  right: ArithmeticExpressionNode;
};

export type ExpressionNode =
  | ArithmeticExpressionNode
  | ComparisonExpressionNode;
