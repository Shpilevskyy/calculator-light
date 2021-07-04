import { CalculationMethodButton } from "src/components/CalculationMethodButton";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

describe("CalculationMethodButton component", () => {
  afterEach(cleanup);

  it("should not render elements if no data provided", () => {
    const text = "text";

    render(<CalculationMethodButton text={text} />);

    expect(screen.queryByTestId("description")).toBeFalsy();
    expect(screen.queryByTestId("link")).toBeFalsy();
  });

  it("should correctly render props", () => {
    const text = "eval()";
    const description = "description";
    const link = "https://www.google.com";

    render(
      <CalculationMethodButton
        text={text}
        description={description}
        link={link}
      />
    );

    expect(screen.getByTestId("text")).toHaveTextContent(text);
    expect(screen.getByTestId("description")).toHaveTextContent(description);
    expect(screen.getByTestId("link")).toHaveAttribute("href", link);
  });

  it("should call onClick prop method on click event", () => {
    const handleClick = jest.fn();

    render(<CalculationMethodButton text="text" onClick={handleClick} />);

    fireEvent.click(screen.getByTestId("text"));

    expect(handleClick).toBeCalledTimes(1);
  });

  it("should correctly display active/inactive status", () => {
    const { container, rerender } = render(
      <CalculationMethodButton text="text" />
    );

    expect(container.firstChild).toHaveStyle("opacity: 0.5;");

    rerender(<CalculationMethodButton text="text" active />);

    expect(container.firstChild).toHaveStyle("opacity: 1;");
  });
});
