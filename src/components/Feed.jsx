import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utills/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../redux/slice/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);

  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  if (!feed) return;
  return feed.length > 0 ? (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]} />
    </div>
  ) : (
    <div className="text-center text-2xl my-10">No new users !! </div>
  );
};

export default Feed;
