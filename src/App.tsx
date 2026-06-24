import { useMemo, useState } from 'react';
import './App.css';
import { evaluateExpression } from './parser/evaluate';
import { parseExpression } from './parser/parseExpression';

const examples = [
  '1 + 2 = 3',
  '2 * 3 + 4 = 10',
  '2 * (3 + 4) = 10',
  '6 = 10 / 2 + 1',
  '12 + 3 != 4 / 2 + 5',
  '2 + 3 * 2 = 10',
  '2 * 3 + 4 != 10',
  '1 + (2 = 3',
];

function App() {
  const [input, setInput] = useState('2 * 3 + 4 = 10');

  const output = useMemo(() => {
    if (!input.trim()) {
      return {
        ast: null,
        result: null,
        error: null,
      };
    }

    const parseResult = parseExpression(input);

    if (!parseResult.ok) {
      return {
        ast: null,
        result: null,
        error: parseResult.error,
      };
    }

    try {
      return {
        ast: parseResult.ast,
        result: evaluateExpression(parseResult.ast),
        error: null,
      };
    } catch (error) {
      return {
        ast: parseResult.ast,
        result: null,
        error: {
          message:
            error instanceof Error
              ? error.message
              : 'Unable to evaluate expression.',
        },
      };
    }
  }, [input]);

  return (
    <main className="app">
      <section className="panel">
        <h1>Mathematical Equation Parser</h1>

        <label htmlFor="expression">Expression</label>
        <textarea
          id="expression"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          rows={4}
          spellCheck={false}
        />

        <div className="examples">
          <p>Examples</p>
          <div className="example-list">
            {examples.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => setInput(example)}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="panel">
        <h2>Result</h2>

        {output.error ? (
          <div className="error">
            <strong>{output.error.message}</strong>

            {'line' in output.error && output.error.line ? (
              <span>
                Line {output.error.line}, column {output.error.column}
              </span>
            ) : null}
          </div>
        ) : (
          <div className="result">
            {output.result === null ? 'No result' : String(output.result)}
          </div>
        )}

        <h2>AST</h2>
        <pre>{output.ast ? JSON.stringify(output.ast, null, 2) : 'No AST'}</pre>
      </section>
    </main>
  );
}

export default App;
