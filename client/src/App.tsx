import React, { useState } from "react";
import { CalculationMethodButton } from "src/components/CalculationMethodButton";
import { StringExpressionInput } from "src/components/StringExpressionInput";
import { CalculationMethod } from "src/@types";
import styled from "styled-components";

const AppWrapper = styled.div`
  text-align: center;
`;

const Content = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const CalculationMethods = styled.div`
  display: flex;
`;

function App() {
  const [calculationMethod, setCalculationMethod] =
    useState<CalculationMethod>("eval");

  return (
    <AppWrapper>
      <Content>
        <StringExpressionInput calculationMethod={calculationMethod} />
        <h5>Please select calculation method</h5>
        <CalculationMethods>
          <CalculationMethodButton
            text="native JavaScript eval()"
            description="The eval() function evaluates JavaScript code represented as a string."
            link="https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/eval"
            active={calculationMethod === "eval"}
            onClick={() => setCalculationMethod("eval")}
          />
          <CalculationMethodButton
            text="Math-expression-evaluator lib"
            description="An extremely efficient, flexible and amazing evaluator for Math expression in Javascript."
            link="https://www.npmjs.com/package/math-expression-evaluator"
            active={calculationMethod === "lib"}
            onClick={() => setCalculationMethod("lib")}
          />
          <CalculationMethodButton
            text="Custom string parsing logic"
            link="https://jorendorff.github.io/calc/docs/calculator-parser.html"
            active={calculationMethod === "custom"}
            onClick={() => setCalculationMethod("custom")}
          />
        </CalculationMethods>
      </Content>
    </AppWrapper>
  );
}

export default App;
