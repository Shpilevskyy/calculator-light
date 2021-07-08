// 1+1
// 2 + 2
// 2 + + - 2
// 2 ++ 2
// 2 + + - 2 -> 2 - 2 / 2 + 2
// 2 + 2 +
// -2 - 1 -
type mathActions = "+" | "-";

const isAction = (str: string) => {
  return ["+", "-"].includes(str);
};

const calculate = (a: number, b: number, action: mathActions): number => {
  if (isNaN(a) || isNaN(b)) {
    throw new Error("");
  }

  switch (action) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    default:
      throw new Error(`No such action ${action}`);
  }
};

export const simpleEvaluate = (str: string): number | null => {
  const tokenRegExp = /\s*([A-Za-z]+|[0-9]+|\S)\s*/g;
  const parsing: string[] | null = str.match(tokenRegExp);

  if (!parsing) {
    return null;
  }

  let cleanData = parsing
    ?.map((value) => value.trim())
    .filter((value, index, array) => {
      const next = array[index + 1];

      if (!next) {
        return true;
      }

      return !(isAction(value) && isAction(next));
    });

  while (cleanData?.length > 1) {
    const [prev, action, next] = cleanData;

    cleanData.splice(
      0,
      3,
      calculate(
        parseInt(prev),
        parseInt(next),
        action as mathActions
      ).toString()
    );
  }

  return parseInt(cleanData[0]);
};

console.log(simpleEvaluate("2 + 2"));
console.log(simpleEvaluate("2 + 2 + 2 - 3"));
console.log(simpleEvaluate("5 + + - 3"));
