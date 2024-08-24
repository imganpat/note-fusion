import React from "react";
import NotesContainer from "./components/NotesContainer";
import Input from "./components/Input";
import ImportantNotes from "./components/ImportantNotes";
import CompletedNotes from "./components/CompletedNotes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { initNotes } from "./store/slices/NotesSlice";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout";
import backendUrl from "./constants/backend_url";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<NotesContainer />} />
      <Route path="imp" element={<ImportantNotes />} />
      <Route path="complete" element={<CompletedNotes />} />
    </Route>
  )
);

const fetchData = async () => {
  const data = await axios.get(backendUrl);
  return data.data;
};

const fetchDataAndDispatch = async (dispatch) => {
  let apiData = await fetchData();
  dispatch(initNotes(apiData));
};

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchDataAndDispatch(dispatch);
  }, [dispatch]);

  const isPopUpOpen = useSelector((state) => state.popup.isPopupOpen);

  return (
    <>
      <div className="b mt-5 flex w-full flex-col items-center gap-5">
        <RouterProvider router={router}></RouterProvider>
      </div>
      {isPopUpOpen && <Input />}
    </>
  );
}

export default App;
