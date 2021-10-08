import { useFetch } from "../hooks/useFetch";

const url = "pins";

const Home = () => {
  const { isLoading, data, error } = useFetch(url);

  return (
    <div>
      <h1>Home page with many pins and search</h1>
    </div>
  );
};

export default Home;
