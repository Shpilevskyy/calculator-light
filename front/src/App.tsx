import React, { FC, useEffect, useState } from "react";
import "./App.css";

type CalculationMethod = "eval" | "lib" | "custom";

function App() {
  const [expression, setExpression] = useState<string>("");
  const [calculationResult, setCalculationResult] = useState<number>(0);
  const [calculationError, setCalculationError] = useState<string>("");
  const [calculationMethod, setCalculationMethod] =
    useState<CalculationMethod | null>(null);

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

      if (data?.result) {
        setCalculationResult(data.result);
        setCalculationError("");
      }

      if (data?.error) {
        setCalculationResult(0);
        setCalculationError(data?.error);
      }
    };

    if (expression && calculationMethod) {
      request();
    }
  }, [calculationMethod, expression]);

  const MethodButton: FC<{ type: CalculationMethod; text: string }> = ({
    type,
    text,
  }) => (
    <button
      onClick={() => setCalculationMethod(type)}
      className={type === calculationMethod ? "active" : ""}
    >
      {text}
    </button>
  );

  return (
    <div className="App">
      <div className="App-content">
        <h3>Result: {calculationResult}</h3>
        {calculationError && <div>Error: {calculationError}</div>}
        <div>
          <label>
            Please enter math expression:
            <input
              type="text"
              value={expression}
              onChange={(e) => {
                setCalculationResult(0);
                setExpression(e.target.value);
                setCalculationMethod(null);
              }}
            />
          </label>
        </div>
        <h5>Calculate with:</h5>
        <div className="calculation-methods">
          <MethodButton type="eval" text="native eval()" />
          <MethodButton type="lib" text="mathjs lib" />
          <MethodButton type="custom" text="custom solution" />
        </div>
      </div>
    </div>
  );
}

export default App;
