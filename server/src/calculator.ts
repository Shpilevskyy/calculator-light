import { evaluate as customEvaluate } from "src/customParser";
import { safeEval } from "src/safeEval";
// import { simpleEvaluate } from "src/simpleEvaluate";

const mexp = require("math-expression-evaluator");

export type CalculationMethod = "eval" | "lib" | "custom";

export const calculateByMethod = (
  expression: string,
  calculationMethod: CalculationMethod
) => {
  switch (calculationMethod) {
    case "eval":
      return safeEval(expression);
    case "lib":
      return mexp.eval(expression);
    case "custom":
      return customEvaluate(expression);
    default:
      throw new Error(`No such CalculationMethod ${calculationMethod}`);
  }
};
