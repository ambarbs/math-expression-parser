import { describe, expect, it } from 'vitest';
import { evaluateExpression } from './evaluate';
import { parseExpression } from './parseExpression';

const expectEvaluation = (input: string, expected: number | boolean) => {
  const parseResult = parseExpression(input);

  if (!parseResult.ok) {
    throw new Error(
      `Expected "${input}" to parse, but got error: ${parseResult.error.message}`,
    );
  }

  expect(evaluateExpression(parseResult.ast)).toBe(expected);
};

describe('parseExpression', () => {
  it.each([
    ['1 + 2 = 3', true],
    ['2 * 3 + 4 = 10', true],
    ['2 * (3 + 4) = 10', false],
    ['6 = 10 / 2 + 1', true],
    ['12 + 3 != 4 / 2 + 5', true],
    ['2 + 3 * 2 = 10', false],
    ['2 * 3 + 4 != 10', false],
  ])('parses and evaluates "%s"', (input, expected) => {
    expectEvaluation(input, expected);
  });

  it.each([
    ['1 + 2 * 3', 7],
    ['2 * (3 + 4)', 14],
    ['  1   +   2   =   3  ', true],
  ])('handles additional expression "%s"', (input, expected) => {
    expectEvaluation(input, expected);
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
