import { useFetch } from "../hooks/useFetch";
import Masonry from "react-masonry-css";
import { Like } from "../components/Like";
import { useAuthState } from "../components/context/AuthContext";

const url = "pins";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const Home = () => {
  const { token, isLoggedIn, userData } = useAuthState();
  const { isLoading, data, error } = useFetch(url);
  console.log(userData, "userData");

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid mt-5"
      columnClassName="my-masonry-grid_column"
    >
      {data?.map((pin: any) => {
        const userLikesPins = userData?.likes.length && userData.likes;
        const isUserLike = userLikesPins
          ? !!userLikesPins.find((pin: any) => pin.id)
          : false;

        return (
          <div
            key={pin.id}
            className="min-h-3 bg-white rounded-xl max-w-sm shadow-lg relative"
          >
            <img className="w-full rounded-xl" src={pin.url} alt={pin.Title} />
            {/* {isLoggedIn && (
              <Like
                id={pin.id}
                likes={pin.likes}
                isUserLike={isUserLike}
                token={token}
              />
            )} */}
          </div>
        );
      })}
    </Masonry>
  );
};

export default Home;
