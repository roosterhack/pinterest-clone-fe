import { useFetch } from "../hooks/useFetch";
import Masonry from "react-masonry-css";
import { useAuthState } from "../components/context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const userId = localStorage.getItem("id");

const MyPins = () => {
  const [userPins, setUserPins] = useState<any>();
  const { token, userData } = useAuthState();
  const [isLoading, setIsloading] = useState(false);
  const reFetchData = async () => {
    setIsloading(true);
    try {
      const res = await axios.get(`${backendUrl}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data) setUserPins(res.data);
      setIsloading(false);
    } catch (err) {
      console.log(err);
      setIsloading(false);
    }
  };
  useEffect(() => {
    if (userData) {
      setUserPins(userData.pins);
    } else {
      reFetchData();
    }
  }, []);

  return (
    <>
      {isLoading && "loading..."}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid mt-5"
        columnClassName="my-masonry-grid_column"
      >
        {userPins?.pins.length &&
          !isLoading &&
          userPins.pins.map((pin: any) => {
            return (
              <div
                key={pin.id}
                className="min-h-3 bg-white rounded-xl max-w-sm shadow-lg relative"
              >
                <img
                  className="w-full rounded-xl"
                  src={pin.url}
                  alt={pin.Title}
                />
              </div>
            );
          })}
      </Masonry>
    </>
  );
};

export default MyPins;
