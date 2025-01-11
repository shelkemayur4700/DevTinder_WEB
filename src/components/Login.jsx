import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utills/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    emailId: "shelke@gmail.com",
    password: "Shelke@123",
  });
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          ...loginData,
        },
        {
          withCredentials: true,
        }
      );
      if (res) {
        dispatch(addUser(res.data.user));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center my-32">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body ">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email ID </span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                value={loginData?.emailId}
                onChange={(e) =>
                  setLoginData((prev) => ({
                    ...prev,
                    emailId: e.target.value,
                  }))
                }
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                value={loginData?.password}
                onChange={(e) =>
                  setLoginData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
            </label>
          </div>
          <div className="card-actions justify-center ">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
