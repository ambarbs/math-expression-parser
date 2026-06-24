import { describe, expect, it } from 'vitest';
import { lexer } from './lexer';

const getTokenTypes = (input: string): string[] => {
  lexer.reset(input);

  return Array.from(lexer)
    .filter((token) => token.type !== 'whitespace')
    .map((token) => token.type ?? '');
};

describe('lexer', () => {
  it('tokenises arithmetic expressions', () => {
    expect(getTokenTypes('2 * 3 + 4')).toEqual([
      'number',
      'multiply',
      'number',
      'plus',
      'number',
    ]);
  });

  it('tokenises comparison operators', () => {
    expect(getTokenTypes('1 + 2 != 4')).toEqual([
      'number',
      'plus',
      'number',
      'notEquals',
      'number',
    ]);
  });

  it('tokenises parentheses', () => {
    expect(getTokenTypes('2 * (3 + 4)')).toEqual([
      'number',
      'multiply',
      'leftParen',
      'number',
      'plus',
      'number',
      'rightParen',
    ]);
  });
});
