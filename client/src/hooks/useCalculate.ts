import { useEffect, useState } from "react";

interface IUseCalculateProps {
  expression: string;
  calculationMethod: string;
}

export const useCalculate = ({
  expression,
  calculationMethod,
}: IUseCalculateProps) => {
  const [data, setData] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const request = async () => {
      setLoading(true);

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

      setLoading(false);

      if (data?.result) {
        setData(data.result);
        setError(null);
      }

      if (data?.error) {
        setData(null);
        setError(data.error);
      }
    };

    if (expression && calculationMethod) {
      request();
    }
  }, [calculationMethod, expression]);

  return {
    data,
    loading,
    error,
  };
};
