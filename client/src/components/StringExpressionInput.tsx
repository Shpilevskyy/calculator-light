import React, { FC, useEffect, useState } from "react";
import { CalculationMethod } from "src/@types";
import { useDebounce } from "src/hooks/useDebounce";
import styled from "styled-components";

interface StringExpressionInputProps {
  calculationMethod: CalculationMethod;
}

const Label = styled.label`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  font-size: 30px;
`;

export const StringExpressionInput: FC<StringExpressionInputProps> = ({
  calculationMethod,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [calculationResult, setCalculationResult] = useState<number>(0);
  const [calculationError, setCalculationError] = useState<string>("");
  const expression = useDebounce(inputValue, 500);

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
        setCalculationError(data.error);
      }
    };

    if (expression && calculationMethod) {
      request();
    }
  }, [calculationMethod, expression]);

  return (
    <>
      <h3>
        <span>{calculationError ? "Error" : "Result"}: </span>
        <span>{calculationError ? calculationError : calculationResult}</span>
      </h3>
      <Label>
        Please enter math expression
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </Label>
    </>
  );
};