import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utills/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        { ...loginData, firstName: undefined, lastName: undefined },
        { withCredentials: true }
      );
      if (res) {
        dispatch(addUser(res.data.user));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data || "Something went wrong");
    }
  };
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        { ...loginData },
        { withCredentials: true }
      );
      console.log(res, "signUP response");
      if (res) {
        dispatch(addUser(res.data.data));
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
      setError(error?.response?.data || "Something went wrong");
    }
  };
  return (
    <div className="flex justify-center my-32">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body ">
          <h2 className="card-title justify-center">
            {isLogin ? "Login" : "Signup"}
          </h2>
          <div>
            {!isLogin && (
              <>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">FirstName </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter FirstName"
                    className="input input-bordered w-full max-w-xs"
                    value={loginData?.firstName}
                    onChange={(e) =>
                      setLoginData((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">LastName </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter LastName"
                    className="input input-bordered w-full max-w-xs"
                    value={loginData?.lastName}
                    onChange={(e) =>
                      setLoginData((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                  />
                </label>
              </>
            )}
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email ID </span>
              </div>
              <input
                type="text"
                placeholder="Enter Email"
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
                placeholder="Enter password"
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
          <p className="text-red-500">{error}</p>

          <div className="card-actions justify-center ">
            <button
              className="btn btn-outline btn-primary"
              onClick={isLogin ? handleLogin : handleSignup}
            >
              {isLogin ? "Login" : "Signup"}
            </button>
          </div>
          <p
            onClick={() => setIsLogin((value) => !value)}
            className="cursor-pointer m-auto text-lg py-2"
          >
            {isLogin ? "New User? Signup here" : "Existing User? Login here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
