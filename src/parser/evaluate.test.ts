import { describe, expect, it } from 'vitest';
import type { ExpressionNode } from './ast';
import { evaluateExpression } from './evaluate';

describe('evaluateExpression', () => {
  it('evaluates a number literal', () => {
    const ast: ExpressionNode = {
      type: 'NumberLiteral',
      value: 42,
    };

    expect(evaluateExpression(ast)).toBe(42);
  });

  it('evaluates arithmetic expressions', () => {
    const ast: ExpressionNode = {
      type: 'BinaryExpression',
      operator: '+',
      left: { type: 'NumberLiteral', value: 1 },
      right: {
        type: 'BinaryExpression',
        operator: '*',
        left: { type: 'NumberLiteral', value: 2 },
        right: { type: 'NumberLiteral', value: 3 },
      },
    };

    expect(evaluateExpression(ast)).toBe(7);
  });

  it('evaluates equality comparisons', () => {
    const ast: ExpressionNode = {
      type: 'ComparisonExpression',
      operator: '=',
      left: {
        type: 'BinaryExpression',
        operator: '+',
        left: { type: 'NumberLiteral', value: 1 },
        right: { type: 'NumberLiteral', value: 2 },
      },
      right: { type: 'NumberLiteral', value: 3 },
    };

    expect(evaluateExpression(ast)).toBe(true);
  });

  it('evaluates inequality comparisons', () => {
    const ast: ExpressionNode = {
      type: 'ComparisonExpression',
      operator: '!=',
      left: {
        type: 'BinaryExpression',
        operator: '+',
        left: { type: 'NumberLiteral', value: 12 },
        right: { type: 'NumberLiteral', value: 3 },
      },
      right: {
        type: 'BinaryExpression',
        operator: '+',
        left: {
          type: 'BinaryExpression',
          operator: '/',
          left: { type: 'NumberLiteral', value: 4 },
          right: { type: 'NumberLiteral', value: 2 },
        },
        right: { type: 'NumberLiteral', value: 5 },
      },
    };

    expect(evaluateExpression(ast)).toBe(true);
  });

  it('evaluates subtraction and dvision', () => {
    const ast: ExpressionNode = {
      type: 'BinaryExpression',
      operator: '-',
      left: {
        type: 'NumberLiteral',
        value: 10,
      },
      right: {
        type: 'BinaryExpression',
        operator: '/',
        left: { type: 'NumberLiteral', value: 12 },
        right: { type: 'NumberLiteral', value: 3 },
      },
    };
    expect(evaluateExpression(ast)).toBe(6);
  });

  it('throws when dividing by zero', () => {
    const ast: ExpressionNode = {
      type: 'BinaryExpression',
      operator: '/',
      left: { type: 'NumberLiteral', value: 10 },
      right: { type: 'NumberLiteral', value: 0 },
    };

    expect(() => evaluateExpression(ast)).toThrow(
      'Division by zero is not supported',
    );
  });
});
