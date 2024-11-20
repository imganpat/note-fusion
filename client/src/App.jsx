import React from "react";
import NotesContainer from "./components/NotesContainer";
import Input from "./components/Input";
import ImportantNotes from "./components/ImportantNotes";
import CompletedNotes from "./components/CompletedNotes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { initNotes } from "./store/slices/NotesSlice";
import { Tooltip } from "react-tooltip";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout";
import backendUrl from "./constants/backend_url";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./components/Profile";
import Sidebar from "./components/Sidebar";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<NotesContainer />} />
        <Route path="/imp" element={<ImportantNotes />} />
        <Route path="/complete" element={<CompletedNotes />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sidebar" element={<Sidebar />} />
      </Route>
      <Route path="/">
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Route>
    </>
  )
);

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

function App() {
  const dispatch = useDispatch();
  const isPopUpOpen = useSelector((state) => state.popup.isPopupOpen);

  useEffect(() => {
    fetchDataAndDispatch(dispatch);
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      {isPopUpOpen && <Input />}
      <Tooltip id="edit-btn" place="top" content="Edit note" />
      <Tooltip id="mark-imp-btn" place="top" content="Toogle importance" />
      <Tooltip id="mark-com-btn" place="bottom" content="Toogle completion" />
      <Tooltip id="del-btn" place="bottom" content="Delete note" />
    </>
  );
}

export default App;
