import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { StringExpressionInput } from "src/components/StringExpressionInput";
import { useCalculate } from "src/hooks/useCalculate";
import { act } from "react-dom/test-utils";

jest.mock("src/hooks/useCalculate", () => ({
  useCalculate: jest.fn().mockReturnValue({}),
}));

let useCalculateMock: jest.Mock;

describe("StringExpressionInput", () => {
  beforeEach(() => {
    jest.useFakeTimers();

    useCalculateMock = useCalculate as jest.Mock;
    useCalculateMock.mockReturnValue({});
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should not render anything if no data provided", () => {
    render(<StringExpressionInput calculationMethod="eval" />);

    expect(screen.queryByTestId("error")).toBeFalsy();
    expect(screen.queryByTestId("data")).toBeFalsy();
    expect(screen.queryByTestId("loading")).toBeFalsy();
  });

  it("should show loading status during request", () => {
    useCalculateMock.mockReturnValueOnce({ loading: true });

    render(<StringExpressionInput calculationMethod="eval" />);

    expect(screen.queryByTestId("error")).toBeFalsy();
    expect(screen.queryByTestId("data")).toBeFalsy();
    expect(screen.queryByTestId("loading")).toBeTruthy();
  });

  it("should render error message if's provided", () => {
    const error = "Error message";

    useCalculateMock.mockReturnValueOnce({ error });
    render(<StringExpressionInput calculationMethod="eval" />);

    expect(screen.queryByTestId("error")).toHaveTextContent(error);
    expect(screen.queryByTestId("data")).toBeFalsy();
    expect(screen.queryByTestId("loading")).toBeFalsy();
  });

  it("should render result when data provided", () => {
    const data = "37";

    useCalculateMock.mockReturnValueOnce({ data });
    render(<StringExpressionInput calculationMethod="eval" />);

    expect(screen.queryByTestId("error")).toBeFalsy();
    expect(screen.queryByTestId("data")).toHaveTextContent(data);
    expect(screen.queryByTestId("loading")).toBeFalsy();
  });

  it("should call useCalculate hook with correct params on input change", () => {
    const expression = "10 + 8";
    const calculationMethod = "eval";

    render(<StringExpressionInput calculationMethod="eval" />);

    act(() => {
      fireEvent.change(screen.getByTestId("expressionInput"), {
        target: {
          value: "10 + 8",
        },
      });

      jest.runAllTimers();
    });

    expect(useCalculateMock).toBeCalledWith({
      expression,
      calculationMethod,
    });
  });
});
