import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utills/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../redux/slice/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  console.log(connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connection`, {
        withCredentials: true,
      });
      //   console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return;
  if (connections.length === 0)
    return (
      <h1 className="text-center my-10 text-2xl">No connections found !!</h1>
    );
  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-5xl text-white my-10">Connections</h1>
      {connections?.map((connection) => {
        const {
          _id,
          firstName,
          lastName,
          profileURL,
          age,
          gender,
          about,
          skills,
        } = connection;
        return (
          <div
            key={_id}
            className="m-4 p-4  rounded-xl bg-base-200 shadow-lg flex w-1/2 mx-auto"
          >
            <div className="">
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
