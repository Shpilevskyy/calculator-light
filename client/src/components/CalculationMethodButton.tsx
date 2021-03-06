import React, { FC, memo } from "react";
import styled from "styled-components";

interface ICalculationMethodButtonProps {
  text: string;
  description?: string;
  link?: string;
  active?: boolean;

  onClick?(): void;
}

const Button = styled(({ active, ...rest }) => <div {...rest} />)<{
  active: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  padding: 5px;
  margin: 10px;
  background: white;
  color: black;
  flex: 1;
  box-shadow: 2px 2px 2px black;
  opacity: ${(props) => (props.active ? 1 : 0.5)};
`;

export const CalculationMethodButton: FC<ICalculationMethodButtonProps> = memo(
  ({ text, description, link, onClick = () => null, active }) => (
    <Button onClick={onClick} active={active}>
      <div data-testid="text">
        <strong>{text}</strong>
      </div>

      {description && (
        <div data-testid="description">
          <small>{description}</small>
        </div>
      )}

      {link && (
        <div>
          <small>
            <a href={link} target="_blank" rel="noreferrer" data-testid="link">
              Source
            </a>
          </small>
        </div>
      )}
    </Button>
  )
);
