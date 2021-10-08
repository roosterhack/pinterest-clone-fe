import { useState, useEffect } from "react";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const useFetch = (url: string) => {
  const [isLoading, setIsloading] = useState(false);
  const [data, setData] = useState<any>({});
  const [error, setError] = useState<unknown>({});

  useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
      try {
        const res = await fetch(`${backendUrl}/${url}`);
        const resData = await res.json();
        setData(resData);
        setIsloading(false);
      } catch (err) {
        setError(err);
        console.log(err);
      }
    };
    fetchData();
  }, [url]);

  return { isLoading, data, error };
};
