import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Nav from "./Nav";
import { useDispatch } from "react-redux";
import { setLoading, sortNotes } from "../store/slices/notes_slice";
import { getAllNotes } from "../store/thunks/notes_thunk";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { getCookie } from "@/lib/utils";
import { InputPopupProvider } from "@/context/InputPopupContext";

// Function to initialize the store woth the user notes
const fetchDataAndDispatch = async (dispatch, navigate) => {
  try {
    dispatch(setLoading(true));
    await dispatch(getAllNotes());
    dispatch(sortNotes({ sortBy: localStorage.getItem("sortBy") }));
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
  const location = useLocation();

  const defaultOpen = getCookie("sidebar_state");

  useEffect(() => {
    const path = window.location.pathname;
    if (!localStorage.getItem("token") && !path.startsWith("/note/")) {
      navigate("/get-started");
    } else if (localStorage.getItem("token")) {
      fetchDataAndDispatch(dispatch, navigate);
    }
  }, [username, navigate, dispatch]);

  // Hide sidebar on a single note page
  const isNotePage = location.pathname.startsWith("/note/");

  if (isNotePage) {
    return (
      <main className="relative max-h-dvh w-full">
        <Nav />
        <Outlet />
      </main>
    );
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen === "true"}>
      <InputPopupProvider>
        <AppSidebar />
        <main className="relative max-h-dvh w-full">
          <Nav />
          <SidebarTrigger className="fixed top-2 z-20" />
          <Outlet />
        </main>
      </InputPopupProvider>
    </SidebarProvider>
  );
};

export default Layout;
