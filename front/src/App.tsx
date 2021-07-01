import React, { FC, useEffect, useState } from "react";
import "./App.css";

type CalculationMethod = "eval" | "lib" | "custom";

function App() {
  const [inputValue, setInputValue] = useState<string>("0");
  const [expression, setExpression] = useState<string>("");
  const [calculationResult, setCalculationResult] = useState<number>(0);
  const [calculationMethod, setCalculationMethod] =
    useState<CalculationMethod>("eval");

  useEffect(() => {
    const request = async () => {
      const response: any = await fetch("/calculate", {
        method: "post",
        body: JSON.stringify({
          expression,
          calculationMethod,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      setCalculationResult(data?.result);
    };

    if (expression) {
      request();
    }
  }, [calculationMethod, expression]);

  const MethodButton: FC<{ type: CalculationMethod }> = ({ type }) => (
    <button
      onClick={() => setCalculationMethod(type)}
      className={type === calculationMethod ? "active" : ""}
    >
      {type}
    </button>
  );

  return (
    <div className="App">
      <div className="App-content">
        <h3>Result: {calculationResult}</h3>
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            onClick={() => setExpression(inputValue)}
            disabled={inputValue === expression}
          >
            Calculate
          </button>
        </div>
        <div className="calculation-methods">
          <MethodButton type="eval" />
          <MethodButton type="lib" />
          <MethodButton type="custom" />
        </div>
      </div>
    </div>
  );
}

export default App;
