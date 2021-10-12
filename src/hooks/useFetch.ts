import { useState, useEffect } from "react";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

interface User {
  blocked: boolean;
  confirmed: boolean;
  created_at: string;
  email: string;
  id: number;
  provider: string;
  role: number;
  updated_at: string;
  username: string;
}

interface Pin {
  likes: number | null;
  Title: string;
  created_at: string;
  id: number;
  published_at: string;
  updated_at: string;
  url: string;
  user: User;
}

export const useFetch = (url: string) => {
  const [isLoading, setIsloading] = useState(false);
  const [data, setData] = useState<any>();
  const [error, setError] = useState<unknown>({});

  useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
      try {
        const res = await fetch(`${backendUrl}/${url}`);
        const resData = await res.json();
        console.log(resData);
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
