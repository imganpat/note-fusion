import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";
import { setLoading } from "../store/slices/notes_slice";
import { getAllNotes } from "../store/thunks/notes_thunk";

// Function to initialize the store woth the user notes
const fetchDataAndDispatch = async (dispatch, navigate) => {
  try {
    dispatch(setLoading(true));
    await dispatch(getAllNotes());
    dispatch(setLoading(false));
  } catch (error) {
    // If token is expired or unauthorized then remove it and redirect to login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      navigate("/auth/login");
    }
  }
};

const Layout = () => {
  const username = localStorage.getItem("username");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.pathname;
    if (!localStorage.getItem("token") && !path.startsWith("/note/")) {
      navigate("/get-started");
    } else if (localStorage.getItem("token")) {
      fetchDataAndDispatch(dispatch, navigate);
    }
  }, [username, navigate, dispatch]);

  return (
    <>
      <main className="relative flex h-dvh w-screen">
        <div className="">
          <Sidebar />
        </div>
        <div className="flex flex-grow flex-col">
          <div className="flex flex-col">
            <Nav />
          </div>
          <div className="h-full overflow-y-scroll">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
