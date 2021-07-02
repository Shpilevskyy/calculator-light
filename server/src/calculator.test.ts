// @ts-ignore
import { calculateByMethod } from "./calculator.ts";

test("Calculate complex expression", () => {
  const expression = "17 + 6 / 2 - 5 * 2";

  expect(calculateByMethod(expression, "eval")).toBe(10);
  expect(calculateByMethod(expression, "lib")).toBe(10);
  expect(calculateByMethod(expression, "custom")).toBe(10);
});

test("Calculate known js decimals issue", () => {
  const expression = "1.1 + 2.2";

  expect(calculateByMethod(expression, "eval")).toBe(3.3000000000000003);
  expect(calculateByMethod(expression, "lib")).toBe(3.3000000000000003);
  expect(calculateByMethod(expression, "custom")).toThrow();
});

test("Calculate with user mistakes", () => {
  const expression = "1 ++ 2";

  // expect(calculateByMethod(expression, "eval")).toThrow(SyntaxError);
  expect(calculateByMethod(expression, "lib")).toBe(3);
});
