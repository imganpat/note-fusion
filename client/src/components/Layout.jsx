import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import backendUrl from "../constants/backend_url";
import { useDispatch } from "react-redux";
import axios from "axios";
import { initNotes } from "../store/slices/notes_slice";

const fetchData = async () => {
  const response = await axios.get(`${backendUrl}/api/notes`, {
    withCredentials: true,
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  return response.data;
};

// Function to initialize the store woth the user notes
const fetchDataAndDispatch = async (dispatch) => {
  let apiData = await fetchData();
  dispatch(initNotes(apiData));
};

const Layout = () => {
  const username = localStorage.getItem("username");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate("/auth/login");
    } else {
      navigate("/");
    }
  }, [username, navigate]);

  useEffect(() => {
    fetchDataAndDispatch(dispatch);
  }, [dispatch]);

  return (
    <>
      <main className="relative flex h-dvh w-screen">
        <div className="">
          <Sidebar />
        </div>
        <div className="flex flex-1 flex-col">
          <Nav />
          <div className="grow overflow-y-scroll">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
