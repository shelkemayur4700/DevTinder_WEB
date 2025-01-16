import axios from "axios";
import React, { useDebugValue, useEffect } from "react";
import { BASE_URL } from "../utills/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../redux/slice/requestSlice";
import { combineReducers } from "@reduxjs/toolkit";

const Requests = () => {
  const connectionRequests = useSelector((store) => store.request);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/recived`, {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.connectionRequests));
    } catch (error) {
      console.log(error);
    }
  };
  const reviewRequest = async (status, id) => {
    try {
      const res = axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(id));
    } catch (error) {}
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!connectionRequests) return;
  if (connectionRequests.length === 0)
    return <h1 className="text-center my-10 text-2xl">No request found !!</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-5xl text-white my-10 ">Requests</h1>
      {connectionRequests?.map((request) => {
        const {
          _id,
          firstName,
          lastName,
          profileURL,
          age,
          gender,
          about,
          skills,
        } = request.fromUserId;
        return (
          <div
            className="m-4 p-4 justify-between items-center rounded-xl bg-base-200 shadow-lg flex w-1/2 mx-auto"
            key={_id}
          >
            <div>
              <img
                className="w-20 h-20 rounded-full "
                src={profileURL}
                alt="img"
              />
            </div>
            <div className="p-4 mx-4 text-left">
              <h2 className="text-2xl font-bold">
                {firstName + " " + lastName}
              </h2>
              <p>{about}</p>
              {age && gender && <p>{age + " " + gender}</p>}
            </div>
            <div>
              <button
                className="btn btn-outline btn-primary mx-2"
                onClick={() => reviewRequest("rejected", request?._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-outline btn-secondary "
                onClick={() => reviewRequest("accepted", request?._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
