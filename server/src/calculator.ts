import { evaluate } from "mathjs";
// @ts-ignore
import { evaluate as customEvaluate } from "./customParser.ts";

type CalculationMethod = "eval" | "lib" | "custom";

export const calculateByMethod = (
  expression: string,
  calculationMethod: CalculationMethod
) => {
  switch (calculationMethod) {
    case "eval":
      return eval(expression);
    case "lib":
      return evaluate(expression);
    case "custom":
      return customEvaluate(expression);
    default:
      throw new Error(`No such CalculationMethod ${calculationMethod}`);
  }
};
