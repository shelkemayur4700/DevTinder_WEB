import React, { useEffect } from "react";
import NavBar from "./Navbar";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utills/constants";
import { addUser } from "../redux/slice/userSlice";
const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const fetchUser = async () => {
    try {
      if (userData) return;
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });

      dispatch(addUser(res.data.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }

    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
