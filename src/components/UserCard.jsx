import axios from "axios";
import React from "react";
import { BASE_URL } from "../utills/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../redux/slice/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const handleSendRequest = async (status, id) => {
    try {
      const res = axios.post(
        `${BASE_URL}/request/send/${status}/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUserFromFeed(id));
    } catch (error) {}
  };
  const { _id, firstName, lastName, age, gender, skills, about, profileURL } =
    user;
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-2xl">
        <figure>
          <img src={profileURL} alt="photo" className="h-[50] w-[50]" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + " " + gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-outline btn-primary "
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-outline btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
