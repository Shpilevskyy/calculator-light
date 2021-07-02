// Solution from:
// https://jorendorff.github.io/calc/docs/calculator-parser.html
// https://jorendorff.github.io/calc/docs/calculator-backends.html
function isNumber(token = ""): boolean {
  return token !== undefined && token.match(/^[0-9]+$/) !== null;
}

function isName(token = ""): boolean {
  return token !== undefined && token.match(/^[A-Za-z]+$/) !== null;
}

export function tokenize(str = "") {
  let results = [];
  let tokenRegExp = /\s*([A-Za-z]+|[0-9]+|\S)\s*/g;
  let m;

  while ((m = tokenRegExp.exec(str)) !== null) results.push(m[1]);

  return results;
}

export function parse(code: string) {
  let tokens = tokenize(code);
  let position = 0;

  function peek() {
    return tokens[position];
  }

  function consume(token: string) {
    if (token !== tokens[position]) {
      throw new Error("consume error");
    }

    position++;
  }

  function parsePrimaryExpr(): any {
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
  }

  function parseMulExpr() {
    let expr = parsePrimaryExpr();
    let t = peek();

    while (t === "*" || t === "/") {
      consume(t);

      let rhs = parsePrimaryExpr();

      expr = { type: t, left: expr, right: rhs };
      t = peek();
    }
    return expr;
  }

  function parseExpr() {
    let expr = parseMulExpr();
    let t = peek();

    while (t === "+" || t === "-") {
      consume(t);
      let rhs = parseMulExpr();
      expr = { type: t, left: expr, right: rhs };
      t = peek();
    }

    return expr;
  }

  let result = parseExpr();

  if (position !== tokens.length)
    throw new SyntaxError("unexpected '" + peek() + "'");

  return result;
}

export function evaluateAsFloat(code: string) {
  let variables = Object.create(null);

  variables.e = Math.E;
  variables.pi = Math.PI;

  function evaluate(obj: any): any {
    switch (obj.type) {
      case "number":
        return parseInt(obj.value);
      case "name":
        return variables[obj.id] || 0;
      case "+":
        return evaluate(obj.left) + evaluate(obj.right);
      case "-":
        return evaluate(obj.left) - evaluate(obj.right);
      case "*":
        return evaluate(obj.left) * evaluate(obj.right);
      case "/":
        return evaluate(obj.left) / evaluate(obj.right);
    }
  }
  return evaluate(parse(code));
}
