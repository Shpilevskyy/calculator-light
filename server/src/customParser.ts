// Solution from:
// https://jorendorff.github.io/calc/docs/calculator-parser.html
// https://jorendorff.github.io/calc/docs/calculator-backends.html

interface IBaseStructure {
  type: string;
  value: string;
}

interface INestedStructure {
  type: string;
  left: IBaseStructure | INestedStructure;
  right: IBaseStructure | INestedStructure;
}

const isNumber = (token: string): boolean => {
  return token?.match(/^[0-9]+$/) !== null;
};

// const isName = (token = ""): boolean => {
//   return token?.match(/^[A-Za-z]+$/) !== null;
// };

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

  const peek = (): string => tokens[position];

  const consume = (token: string): void => {
    if (token !== tokens[position]) {
      throw new Error("consume error");
    }

    position++;
  };

  const parsePrimaryExpr = (): IBaseStructure | INestedStructure => {
    let t = peek();

    switch (true) {
      case isNumber(t):
        consume(t);

        return { type: "number", value: t };
      case t === "(":
        consume(t);

        let expr = parseExpr();

        if (peek() !== ")") throw new SyntaxError("expected )");

        consume(")");

        return expr;
      default:
        throw new SyntaxError("expected a number, a variable, or parentheses");
      // case isName(t):
      //   consume(t);
      //
      //   return { type: "name", id: t };
    }
  };

  const parseMulExpr = (): INestedStructure => {
    let expr = parsePrimaryExpr() as INestedStructure;
    let t = peek();

    while (t === "*" || t === "/") {
      consume(t);

      let rhs = parsePrimaryExpr();

      expr = { type: t, left: expr, right: rhs };
      t = peek();
    }

    return expr;
  };

  const parseExpr = (): INestedStructure => {
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

  const result = parseExpr();

  if (position !== tokens.length)
    throw new SyntaxError("unexpected '" + peek() + "'");

  return result;
};

export function evaluate(code: string): number {
  // let variables = Object.create(null);
  //
  // variables.e = Math.E;
  // variables.pi = Math.PI;

  function evaluateRecursion(obj: any): any {
    switch (obj.type) {
      case "number":
        return parseInt(obj.value);
      // case "name":
      //   return variables[obj.id] || 0;
      case "+":
        return evaluateRecursion(obj.left) + evaluateRecursion(obj.right);
      case "-":
        return evaluateRecursion(obj.left) - evaluateRecursion(obj.right);
      case "*":
        return evaluateRecursion(obj.left) * evaluateRecursion(obj.right);
      case "/":
        return evaluateRecursion(obj.left) / evaluateRecursion(obj.right);
      default:
        throw new Error(`Unknown evaluation type ${obj.type}`);
    }
  }

  return evaluateRecursion(parse(code));
}
