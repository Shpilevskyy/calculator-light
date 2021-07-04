import { useDebounce } from "src/hooks/useDebounce";
import { FC } from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

let Component: FC<{ input: string }>;

describe("useDebounce hook", () => {
  beforeEach(() => {
    jest.useFakeTimers();

    Component = ({ input }) => {
      const output = useDebounce(input, 1000);

      return <div data-testid="output">{output}</div>;
    };
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should render initial value on mount", () => {
    render(<Component input="Hello world!" />);

    expect(screen.queryByTestId("output")).toHaveTextContent("Hello world!");
  });

  it("should render new value only after timeout", () => {
    const { rerender } = render(<Component input="Init" />);

    rerender(<Component input="Hello world!!!!" />);

    expect(screen.queryByTestId("output")).toHaveTextContent("Init");

    act(() => {
      jest.runAllTimers();
    });

    expect(screen.queryByTestId("output")).toHaveTextContent("Hello world!!!!");
  });
});
