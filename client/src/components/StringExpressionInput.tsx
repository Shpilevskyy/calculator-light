import React, { FC, useState } from "react";
import { CalculationMethod } from "src/@types";
import { useDebounce } from "src/hooks/useDebounce";
import styled from "styled-components";
import { useCalculate } from "src/hooks/useCalculate";

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
  const expression = useDebounce(inputValue, 500);
  const { data, loading, error } = useCalculate({
    expression,
    calculationMethod,
  });

  return (
    <>
      <h3>
        {loading && <span data-testid="loading">Loading . . .</span>}
        {error && <span data-testid="error">Error: {error}</span>}
        {data && <span data-testid="data">Result: {data}</span>}
      </h3>
      <Label>
        Please enter math expression
        <Input
          type="text"
          data-testid="expressionInput"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </Label>
    </>
  );
};
