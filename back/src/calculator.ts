import { evaluate } from "mathjs";
// @ts-ignore
import { evaluateAsFloat } from "./customParser.ts";

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
      return evaluateAsFloat(expression);
    default:
      throw new Error(`No such CalculationMethod ${calculationMethod}`);
  }
};
