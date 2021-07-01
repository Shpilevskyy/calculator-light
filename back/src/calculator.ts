type CalculationMethod = "eval" | "lib" | "custom";

export const calculateByMethod = (
  expression: string,
  calculationMethod: CalculationMethod
) => {
  switch (calculationMethod) {
    case "eval":
      return eval(expression);
    case "lib":
      return 0;
    case "custom":
      return -1;
    default:
      throw new Error(`No such CalculationMethod ${calculationMethod}`);
  }
};
