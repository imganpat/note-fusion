import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Sidebar from "./Sidebar";

const Layout = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate("/auth/login");
    } else {
      navigate("/");
    }
  }, [username, navigate]);

  return (
    <>
      <main className="relative flex h-dvh w-screen">
        <div className="">
          <Sidebar />
        </div>
        <div className="flex flex-1 flex-col">
          <Nav />
          <div className="overflow-y-scroll">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
