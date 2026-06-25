# Math Expression Parser

A small React + TypeScript application that parses mathematical expressions using **Nearley** and **Moo**, displays the parsed Abstract Syntax Tree (AST) and evaluates the expression result.

## Features

* Parses arithmetic expressions using `+`, `-`, `*` and `/`
* Supports comparison operators `=` and `!=`
* Handles parentheses for explicit grouping
* Ignores whitespace in expressions
* Applies standard arithmetic precedence:

  * `*` and `/` before `+` and `-`
  * comparisons after arithmetic evaluation
* Displays the generated AST
* Displays the evaluated result
* Shows an error message for invalid expressions

## Tech Stack

* React
* TypeScript
* Vite
* Nearley
* Moo
* Vitest
* React Testing Library

## Getting Started

Install dependencies:

```bash
npm install
```

Run the app locally:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

Build the app:

```bash
npm run build
```

## Example Inputs

```txt
1 + 2 = 3
2 * 3 + 4 = 10
2 * (3 + 4) = 10
6 = 10 / 2 + 1
12 + 3 != 4 / 2 + 5
2 + 3 * 2 = 10
2 * 3 + 4 != 10
1 + (2 = 3
```

## Project Structure

```txt
src/
  parser/
    ast.ts
    evaluate.ts
    grammar.ne
    grammar.js
    lexer.ts
    parseExpression.ts
```

## Parser Flow

```txt
Input string
  -> Moo lexer
  -> Nearley parser
  -> AST
  -> Evaluator
  -> Result
```

Moo tokenises the raw input string into typed tokens such as numbers, operators and parentheses.

Nearley consumes those tokens using the grammar rules and produces an AST.

The evaluator walks the AST and returns either a number or a boolean result.

## Notes

`src/parser/grammar.ne` contains the Nearley grammar source.

`src/parser/grammar.js` is the generated grammar used by the app. If the grammar source is changed, regenerate the grammar and verify the app, tests and production build still pass.

## Validation

The test suite covers the supplied homework examples, arithmetic precedence, parentheses, whitespace handling, arithmetic only expressions and invalid input handling.
