import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { openPopUp } from "../store/slices/popup_slice.js";
import AddIcon from "../../public/assets/svgs/AddIcon";
import { useEffect, useState } from "react";
import { sortNotes } from "../store/slices/notes_slice.js";

const linksObject = [
  {
    name: "All",
    slug: "/",
  },
  {
    name: "Important",
    slug: "/imp",
  },
  {
    name: "Completed",
    slug: "/complete",
  },
];

const sortingOptions = [
  {
    name: "Newest first",
    value: "new-first",
  },
  {
    name: "Oldest first",
    value: "old-first",
  },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const [isValidUrl, setIsValidUrl] = useState(true);
  useEffect(() => {
    const url = window.location.href;
    if (url.includes("profile")) setIsValidUrl(false);
    else setIsValidUrl(true);
  }, [window.location.href]);

  return (
    <>
      <div
        id="sidebar"
        className="relative z-50 hidden h-full bg-white px-0 shadow-lg sm:block sm:w-40 md:w-64"
      >
        <div id="logo" className="flex h-20 w-full items-center">
          <span className="font-semibold sm:mx-4 sm:text-xl md:mx-8 md:text-2xl">
            Note Fusion
          </span>
        </div>

        <div id="menu" className="flex h-[85%] w-full flex-col justify-between">
          <nav className="">
            {linksObject.map((li) => {
              return (
                <div key={li.slug}>
                  <NavLink
                    to={`${li.slug}`}
                    className={({ isActive }) => {
                      return `flex h-10 w-full cursor-pointer items-center rounded-md rounded-r-full border border-transparent px-2 py-2 capitalize duration-200 hover:border-gray-500 sm:px-4 sm:text-sm ${isActive ? "bg-gradient-to-br from-blue-950 to-blue-900 text-blue-50" : "bg-transparent"}`;
                    }}
                  >
                    {li.name}
                  </NavLink>
                </div>
              );
            })}
            <div className="my-5 h-[1px] w-full bg-gray-300"></div>
            <p className="hidden px-4 py-2 text-xs sm:flex">Sort by</p>
            <select
              name="sorting-order"
              className="w-full rounded-md border px-2 py-2 text-sm text-gray-700 outline-none sm:px-4"
              defaultValue={localStorage.getItem("sortBy") || "old-first"}
              onChange={(e) => {
                dispatch(sortNotes({ sortBy: e.target.value }));
              }}
            >
              {sortingOptions.map((li) => {
                return (
                  <option
                    key={li.value}
                    value={li.value}
                    className="cursor-pointer capitalize"
                  >
                    {li.name}
                  </option>
                );
              })}
            </select>
          </nav>
        </div>
      </div>

      {isValidUrl && (
        <button
          id="create-btn"
          className="absolute bottom-10 left-9 z-50 flex h-14 items-center justify-center rounded-md border border-transparent bg-gradient-to-tr from-blue-900 to-blue-950 bg-[length:200%_200%] bg-left px-8 py-4 text-blue-50 transition-all duration-500 ease-in-out hover:border-blue-500 hover:bg-right"
          style={{
            backgroundImage:
              "linear-gradient(to right, #172554, #1E40AF, #172554)",
            transition: "background-position 0.3s ease-in-out",
          }}
          onClick={() => {
            dispatch(
              openPopUp({
                isEditing: false,
                currentNote: { uid: "", title: "", description: "" },
              })
            );
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <AddIcon />
            <span className="hidden md:inline">Add new note</span>
          </div>
        </button>
      )}
    </>
  );
};

export default Sidebar;
