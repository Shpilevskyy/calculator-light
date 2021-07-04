import { renderHook } from "@testing-library/react-hooks";
import { useCalculate } from "src/hooks/useCalculate";
import { waitFor } from "@testing-library/react";

const fetchMock = jest.fn();

window.fetch = fetchMock;

describe("useCalculate hook", () => {
  beforeEach(() => {
    jest.useFakeTimers();

    fetchMock.mockReturnValue({
      json: () => null,
    });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("should not send request if not params provided", () => {
    const { result } = renderHook(() =>
      useCalculate({
        expression: "",
        calculationMethod: "",
      })
    );

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
    expect(result.current.loading).toBe(false);
    expect(fetchMock).toBeCalledTimes(0);
  });

  it("should set status as loading during request", async () => {
    const { result } = renderHook(() =>
      useCalculate({
        expression: "10 + 2",
        calculationMethod: "eval",
      })
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
    expect(fetchMock).toBeCalledTimes(1);
  });

  it("should return data if request contains result", async () => {
    const responseResult = 12;
    fetchMock.mockReturnValueOnce({
      json: () => ({
        result: responseResult,
      }),
    });

    const { result } = renderHook(() =>
      useCalculate({
        expression: "10 + 2",
        calculationMethod: "eval",
      })
    );

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
    });

    expect(result.current.data).toBe(responseResult);
    expect(result.current.error).toBe(null);
  });

  it("should return error if request contains error", async () => {
    const error = "Error message";
    fetchMock.mockReturnValueOnce({
      json: () => ({
        error,
      }),
    });

    const { result } = renderHook(() =>
      useCalculate({
        expression: "10 + 2",
        calculationMethod: "eval",
      })
    );

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(error);
  });
});
