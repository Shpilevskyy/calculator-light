import React, { useState } from "react";
import "./App.css";
import { CalculationMethodButton } from "src/components/CalculationMethodButton";
import { StringExpressionInput } from "src/components/StringExpressionInput";
import { CalculationMethod } from "src/@types";

function App() {
  const [calculationMethod, setCalculationMethod] =
    useState<CalculationMethod>("eval");

  return (
    <div className="App">
      <div className="App-content">
        <StringExpressionInput calculationMethod={calculationMethod} />
        <h5>Please select calculation method</h5>
        <div className="calculation-methods">
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
        </div>
      </div>
    </div>
  );
}

export default App;
