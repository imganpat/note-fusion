import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { useDispatch } from "react-redux";
import { setLoading, sortNotes } from "../store/slices/notes_slice";
import { getAllNotes } from "../store/thunks/notes_thunk";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Plus } from "lucide-react";
import { getCookie } from "@/lib/utils";

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

  // const defaultOpen = document.cookie.split("sidebar_state=")[1];
  const defaultOpen = getCookie("sidebar_state");
  const isMobile = useIsMobile();

  useEffect(() => {
    const path = window.location.pathname;
    if (!localStorage.getItem("token") && !path.startsWith("/note/")) {
      navigate("/get-started");
    } else if (localStorage.getItem("token")) {
      fetchDataAndDispatch(dispatch, navigate);
    }
  }, [username, navigate, dispatch]);

  return (
    <SidebarProvider defaultOpen={defaultOpen === "true"}>
      <AppSidebar />
      <SidebarTrigger />
      <main className="max-h-dvh w-full">
        <Nav />
        <Outlet />
        {isMobile && (
          <Button className="fixed bottom-4 right-4 z-50 h-10 w-10 rounded-full">
            <Plus />
          </Button>
        )}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
