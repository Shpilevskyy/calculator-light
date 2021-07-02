import { evaluate as customEvaluate } from "src/customParser";
const mexp = require("math-expression-evaluator");

export type CalculationMethod = "eval" | "lib" | "custom";

const isStringValidMathExpression = (str: string): boolean =>
  /(?:(?:^|[-+_*/])(?:\s*-?\d+(\.\d+)?(?:[eE][+-]?\d+)?\s*))+$/.test(str);

export const calculateByMethod = (
  expression: string,
  calculationMethod: CalculationMethod
) => {
  switch (calculationMethod) {
    case "eval":
      if (!isStringValidMathExpression(expression)) {
        throw new Error("Expression is not valid");
      }

      return eval(expression);
    case "lib":
      return mexp.eval(expression);
    case "custom":
      return customEvaluate(expression);
    default:
      throw new Error(`No such CalculationMethod ${calculationMethod}`);
  }
};
