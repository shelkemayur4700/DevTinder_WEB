import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utills/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slice/userSlice";
import Toast from "./Toast";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    age: user?.age || "",
    gender: user?.gender || "",
    profileURL: user?.profileURL,
    about: user?.about,
  });
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);
  const handleUpdateProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { ...userData },
        { withCredentials: true }
      );
      console.log(res);
      dispatch(addUser(res?.data?.data));
      setToast(true);
      // setTimeout(() => {
      //   setToast(false);
      // }, 1000);
    } catch (error) {
      setError(error.response.data);
    }
  };
  return (
    <>
      {toast && <Toast message={"Profile updated successfully!"} />}{" "}
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body ">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">FirstName </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    value={userData?.firstName}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">LastName</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    value={userData?.lastName}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    value={userData?.age}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        age: e.target.value,
                      }))
                    }
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <select
                    className="select w-full max-w-xs"
                    value={userData?.gender}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                  >
                    <option>male</option>
                    <option>female</option>
                    <option>other</option>
                  </select>
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">ProfilePhoto</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    value={userData?.profileURL}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        profileURL: e.target.value,
                      }))
                    }
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <textarea
                    className="textarea"
                    placeholder="Bio"
                    value={userData?.about}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        about: e.target.value,
                      }))
                    }
                  />
                </label>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center ">
                <button
                  className="btn btn-outline btn-primary"
                  onClick={handleUpdateProfile}
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard user={userData} />
      </div>
    </>
  );
};

export default EditProfile;
