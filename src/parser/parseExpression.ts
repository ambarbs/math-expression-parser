import { Grammar, Parser, type CompiledRules } from 'nearley';
import compiledGrammar from './grammar.js';
import type { ExpressionNode } from './ast';

export type ParseError = {
  message: string;
  offset?: number;
  line?: number;
  column?: number;
};

export type ParseResult =
  | {
      ok: true;
      ast: ExpressionNode;
    }
  | {
      ok: false;
      error: ParseError;
    };

const grammar = Grammar.fromCompiled(compiledGrammar as CompiledRules);

const toParseError = (error: unknown): ParseError => {
  if (!(error instanceof Error)) {
    return {
      message: 'Invalid expression.',
    };
  }

  const token = (
    error as Error & {
      token?: {
        offset?: number;
        line?: number;
        col?: number;
        value?: string;
      };
    }
  ).token;

  return {
    message: 'Invalid expression.',
    offset: token?.offset,
    line: token?.line,
    column: token?.col,
  };
};

export const parseExpression = (input: string): ParseResult => {
  try {
    const parser = new Parser(grammar);

    parser.feed(input);

    if (parser.results.length === 0) {
      return {
        ok: false,
        error: {
          message: 'Invalid expression.',
        },
      };
    }

    if (parser.results.length > 1) {
      return {
        ok: false,
        error: {
          message: 'Ambiguous expression.',
        },
      };
    }

    return {
      ok: true,
      ast: parser.results[0] as ExpressionNode,
    };
  } catch (error) {
    return {
      ok: false,
      error: toParseError(error),
    };
  }
};
