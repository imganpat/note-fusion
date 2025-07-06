import React from "react";
import NotesContainer from "./components/NotesContainer";
import { Tooltip } from "react-tooltip";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./components/Profile";
import Note from "./components/Note";
import GetStarted from "./pages/GetStarted";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<NotesContainer />} />
        <Route path="/imp" element={<NotesContainer category="important" />} />
        <Route
          path="/complete"
          element={<NotesContainer category="completed" />}
        />
        <Route path="/note/:uid" element={<Note />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/">
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/get-started" element={<GetStarted />} />
      </Route>
    </>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <Tooltip className="z-50" id="edit-btn" place="top" content="Edit note" />
      <Tooltip
        className="z-50"
        id="mark-imp-btn"
        place="top"
        content="Toogle importance"
      />
      <Tooltip
        className="z-50"
        id="mark-com-btn"
        place="bottom"
        content="Toogle completion"
      />
      <Tooltip
        className="z-50"
        id="del-btn"
        place="bottom"
        content="Delete note"
      />
      <Tooltip className="z-50" id="share-btn" place="bottom" content="Share" />
    </>
  );
}

export default App;
