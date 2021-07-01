import {calculate} from "src/backend/calculator";

test('calculate', () => {
    expect(calculate(1, 2)).toBe(3);
})
