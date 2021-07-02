import { render, screen } from "@testing-library/react";
import { StringExpressionInput } from "src/components/StringExpressionInput";

const successMockResponse = {
  result: 10,
};

// beforeEach(() => {
//   jest.spyOn(global, "fetch").mockResolvedValue({
//     json: jest.fn().mockResolvedValue(successMockResponse),
//   });
// });
//
// afterEach(() => {
//   jest.restoreAllMocks();
// });

describe("StringExpressionInput", () => {
  it("should not render anything initially", function () {
    render(<StringExpressionInput calculationMethod="eval" />);

    expect(screen.queryByTestId("error")).toBeFalsy();
    expect(screen.queryByTestId("result")).toBeFalsy();
  });
});
