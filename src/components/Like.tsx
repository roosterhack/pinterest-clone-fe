import { useState, useEffect } from "react";
import axios from "axios";
import { ReactComponent as HeartLine } from "../images/heart-line.svg";
import { ReactComponent as HeartFill } from "../images/heart-fill.svg";
import { useStateWithCallbackLazy } from "use-state-with-callback";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

interface FavProps {
  id: number;
  likes: string;
  token: string;
  isUserLike: boolean;
}

export const Like = ({ id, token, isUserLike, likes }: FavProps) => {
  const [isLike, setIsLike] = useStateWithCallbackLazy(isUserLike);
  const [error, setError] = useState<any>({});
  console.log(likes, "likes");
  const updatedLikes = (numLikes: string, isUserLikeOrNot: boolean) => {
    const numberLikes = Number(numLikes);
    if (numberLikes < 0 && !isUserLikeOrNot) {
      return 0;
    }
    if (isUserLikeOrNot) {
      return numberLikes + 1;
    }
    if (!isUserLikeOrNot) {
      return numberLikes - 1;
    }
  };

  // const [isLoading,setIsLoading] = useState(false);

  const handleFav = async () => {
    setIsLike(!isLike, async (updatedLike: boolean) => {
      try {
        // update the pin's like
        const res = await axios.put(
          `${backendUrl}/pins/${id}`,
          {
            likes: updatedLikes(likes, updatedLike),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data.likes);
        // add the liked pin's id to users like array

        // const res = await axios.put()
      } catch (err) {
        console.log(err);
        setError(err);
      }
    });
  };

  return (
    <div
      className="w-9 h-9 bg-white rounded-3xl absolute top-1.5 right-1.5 flex justify-center items-center"
      onClick={handleFav}
    >
      {isLike ? <HeartFill /> : <HeartLine />}
    </div>
  );
};
