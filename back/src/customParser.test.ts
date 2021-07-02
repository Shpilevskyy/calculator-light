// @ts-ignore
import { evaluateAsFloat, parse, tokenize } from "./customParser.ts";

test("tokenize", () => {
  expect(tokenize("123\n")).toEqual(["123"]);
  expect(tokenize("2+2")).toEqual(["2", "+", "2"]);
  expect(tokenize("+-*/")).toEqual(["+", "-", "*", "/"]);
  expect(tokenize("   1   * 24 +\n\n  pi")).toEqual([
    "1",
    "*",
    "24",
    "+",
    "pi",
  ]);
  expect(tokenize("()")).toEqual(["(", ")"]);
  expect(tokenize("    ")).toEqual([]);
});

test("parse", () => {
  expect(parse("(1 + 2) / 3")).toEqual({
    type: "/",
    left: {
      type: "+",
      left: { type: "number", value: "1" },
      right: { type: "number", value: "2" },
    },
    right: { type: "number", value: "3" },
  });
});

test("evaluateAsFloat", () => {
  expect(evaluateAsFloat("2 + 2")).toEqual(4);
  expect(evaluateAsFloat("3 * 4 * 5")).toEqual(60);
  expect(evaluateAsFloat("5 * (2 + 2)")).toEqual(20);
});
