// Solution from:
// https://jorendorff.github.io/calc/docs/calculator-parser.html
// https://jorendorff.github.io/calc/docs/calculator-backends.html

interface IBaseStructure {
  type: string;
  value: string;
}

interface IExpressionStructure {
  type: string;
  id?: string;
  value?: string;
  left?: IBaseStructure | IExpressionStructure;
  right?: IBaseStructure | IExpressionStructure;
}

const isNumber = (token: string): boolean => {
  return token?.match(/^[0-9]+$/) !== null;
};

const isName = (token = ""): boolean => {
  return token?.match(/^[A-Za-z]+$/) !== null;
};

export const tokenize = (str: string): string[] => {
  let results = [];
  let tokenRegExp = /\s*([A-Za-z]+|[0-9]+|\S)\s*/g;
  let match;

  while ((match = tokenRegExp.exec(str)) !== null) {
    results.push(match[1]);
  }

  return results;
};

export const parse = (code: string) => {
  let tokens = tokenize(code);
  let position = 0;

  const peek = (): string => {
    return tokens[position];
  };

  const consume = (token: string): void => {
    if (token !== tokens[position]) {
      throw new Error("consume error");
    }

    position++;
  };

  const parsePrimaryExpr = (): IExpressionStructure => {
    let t = peek();

    if (isNumber(t)) {
      consume(t);

      return { type: "number", value: t };
    } else if (isName(t)) {
      consume(t);

      return { type: "name", id: t };
    } else if (t === "(") {
      consume(t);

      let expr = parseExpr();

      if (peek() !== ")") throw new SyntaxError("expected )");

      consume(")");

      return expr;
    } else {
      throw new SyntaxError("expected a number, a variable, or parentheses");
    }
  };

  const parseMulExpr = (): IExpressionStructure => {
    let expr = parsePrimaryExpr();
    let t = peek();

    while (t === "*" || t === "/") {
      consume(t);

      let rhs = parsePrimaryExpr();

      expr = { type: t, left: expr, right: rhs };
      t = peek();
    }
    return expr;
  };

  const parseExpr = (): IExpressionStructure => {
    let expr = parseMulExpr();
    let t = peek();

    while (t === "+" || t === "-") {
      consume(t);
      let rhs = parseMulExpr();
      expr = { type: t, left: expr, right: rhs };
      t = peek();
    }

    return expr;
  };

  let result = parseExpr();

  if (position !== tokens.length)
    throw new SyntaxError("unexpected '" + peek() + "'");

  return result;
};

export function evaluate(code: string): number {
  let variables = Object.create(null);

  variables.e = Math.E;
  variables.pi = Math.PI;

  function evaluateRecursion(obj: any): any {
    switch (obj.type) {
      case "number":
        return parseInt(obj.value);
      case "name":
        return variables[obj.id] || 0;
      case "+":
        return evaluateRecursion(obj.left) + evaluateRecursion(obj.right);
      case "-":
        return evaluateRecursion(obj.left) - evaluateRecursion(obj.right);
      case "*":
        return evaluateRecursion(obj.left) * evaluateRecursion(obj.right);
      case "/":
        return evaluateRecursion(obj.left) / evaluateRecursion(obj.right);
    }
  }

  return evaluateRecursion(parse(code));
}
