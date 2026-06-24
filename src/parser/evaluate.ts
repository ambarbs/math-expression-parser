import type {
  ArithmeticExpressionNode,
  ArithmeticOperator,
  ComparisonExpressionNode,
  ExpressionNode,
} from './ast';

const isComparisonExpression = (
  expression: ExpressionNode,
): expression is ComparisonExpressionNode => {
  return expression.type === 'ComparisonExpression';
};

const isNearlyEqual = (left: number, right: number): boolean => {
  return (
    Math.abs(left - right) <=
    Number.EPSILON * Math.max(1, Math.abs(left), Math.abs(right))
  );
};

const applyArithMeticOperator = (
  operator: ArithmeticOperator,
  left: number,
  right: number,
): number => {
  switch (operator) {
    case '+':
      return left + right;
    case '-':
      return left - right;
    case '*':
      return left * right;
    case '/':
      if (right === 0) {
        throw new Error('Division by zero is not supported');
      }
      return left / right;
    default: {
      const unsupportedOperator: never = operator;
      throw new Error(
        `Unsupported artihmentic operator: ${unsupportedOperator}`,
      );
    }
  }
};

export const evaluateArithmeticExpression = (
  expression: ArithmeticExpressionNode,
): number => {
  switch (expression.type) {
    case 'NumberLiteral':
      return expression.value;

    case 'BinaryExpression': {
      const left = evaluateArithmeticExpression(expression.left);
      const right = evaluateArithmeticExpression(expression.right);
      return applyArithMeticOperator(expression.operator, left, right);
    }

    default: {
      const unsupportedExpression: never = expression;
      throw new Error(
        `Unsupported expression: ${JSON.stringify(unsupportedExpression)}`,
      );
    }
  }
};

export const evaluateExpression = (
  expression: ExpressionNode,
): number | boolean => {
  if (!isComparisonExpression(expression)) {
    return evaluateArithmeticExpression(expression);
  }

  const left = evaluateArithmeticExpression(expression.left);
  const right = evaluateArithmeticExpression(expression.right);
  const operator = expression.operator;
  switch (operator) {
    case '=':
      return isNearlyEqual(left, right);

    case '!=':
      return !isNearlyEqual(left, right);

    default: {
      const unsupportedComparisonOperator: never = operator;
      throw new Error(
        `Unsupported comparison operator: ${unsupportedComparisonOperator}`,
      );
    }
  }
};
