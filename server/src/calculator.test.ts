import { calculateByMethod, CalculationMethod } from "src/calculator";

const calculationMethods: CalculationMethod[] = ["eval", "lib", "custom"];
const runTestsForAllMethods = (expression: string, expected: any) => {
  calculationMethods.forEach((method) => {
    expect(calculateByMethod(expression, method)).toBe(expected);
  });
};

test("Calculate complex expression", () => {
  runTestsForAllMethods("17 + 6 / 2 - 5 * 2", 10);
  runTestsForAllMethods("7 * 2 - 78 / 9 + 14 ", 19.333333333333336);
  runTestsForAllMethods("65 - 10 + 18 / 3 - 9", 52);
});

test("Calculate known js decimals issue", () => {
  const expression = "1.1 + 2.2";

  expect(calculateByMethod(expression, "eval")).toBe(3.3000000000000003);
  expect(calculateByMethod(expression, "lib")).toBe(3.3);
  expect(() => calculateByMethod(expression, "custom")).toThrow();
});

test("Calculate with user mistakes", () => {
  const expression1 = "1 + - + 2";
  const expression2 = "- 1 + 8 / 2 /";

  expect(calculateByMethod(expression1, "eval")).toBe(-1);
  expect(calculateByMethod(expression1, "lib")).toBe(-1);
  expect(() => calculateByMethod(expression1, "custom")).toThrow();

  expect(() => calculateByMethod(expression2, "eval")).toThrow();
  expect(() => calculateByMethod(expression2, "lib")).toThrow();
  expect(() => calculateByMethod(expression2, "custom")).toThrow();
});
