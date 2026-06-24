import { describe, expect, it } from 'vitest';
import { evaluateExpression } from './evaluate';
import { parseExpression } from './parseExpression';

const expectEvaluation = (input: string, expected: number | boolean) => {
  const parseResult = parseExpression(input);

  expect(parseResult.ok).toBe(true);

  if (!parseResult.ok) {
    throw new Error(parseResult.error.message);
  }

  expect(evaluateExpression(parseResult.ast)).toBe(expected);
};

describe('parseExpression', () => {
  it('parses and evaluates equality expressions', () => {
    expectEvaluation('1 + 2 = 3', true);
    expectEvaluation('2 * 3 + 4 = 10', true);
    expectEvaluation('2 * (3 + 4) = 10', false);
    expectEvaluation('6 = 10 / 2 + 1', true);
    expectEvaluation('2 + 3 * 2 = 10', false);
  });

  it('parses and evaluates inequality expressions', () => {
    expectEvaluation('12 + 3 != 4 / 2 + 5', true);
    expectEvaluation('2 * 3 + 4 != 10', false);
  });

  it('parses and evaluates arithmetic-only expressions', () => {
    expectEvaluation('1 + 2 * 3', 7);
    expectEvaluation('2 * (3 + 4)', 14);
  });

  it('ignores whitespace', () => {
    expectEvaluation('  1   +   2   =   3  ', true);
  });

  it('returns an error for invalid input', () => {
    const parseResult = parseExpression('1 + (2 = 3');

    expect(parseResult.ok).toBe(false);

    if (parseResult.ok) {
      throw new Error('Expected parsing to fail.');
    }

    expect(parseResult.error.message).toBe('Invalid expression.');
  });
});
