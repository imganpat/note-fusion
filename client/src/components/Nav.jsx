import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { openPopUp } from "../store/slices/PopupSlice";

const linksObject = [
  {
    name: "All",
    slug: "/",
    noteState: "all",
  },
  {
    name: "Important",
    slug: "/imp",
    noteState: "is_important",
  },
  {
    name: "Completed",
    slug: "/complete",
    noteState: "complete",
  },
];

const Nav = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="fixed top-0 z-10 flex h-20 w-screen items-center justify-between bg-white px-4 py-2 md:px-16">
        <span className="hidden text-2xl font-semibold md:inline">
          Note Fusion
        </span>
        <span className="inline text-2xl font-semibold md:hidden">NF</span>
        <nav className="flex h-16 w-full -translate-x-7 translate-y-5 items-end justify-start gap-4 md:w-fit md:translate-x-0 md:translate-y-0 md:items-center md:gap-10">
          {linksObject.map((li) => {
            return (
              <div key={li.slug}>
                <NavLink
                  to={`${li.slug}`}
                  className={({ isActive }) => {
                    return `capitalize duration-150 ${isActive ? "text-black" : "text-gray-400"}`;
                  }}
                >
                  {li.name}
                </NavLink>
              </div>
            );
          })}
        </nav>

        <button
          type="submit"
          onClick={() => {
            dispatch(
              openPopUp({
                isEditing: false,
                currentNote: { uid: "", description: "" },
              })
            );
          }}
          className="font-medium tracking-tight text-blue-500"
        >
          <i className="fa-solid fa-plus mr-3 rounded-full border border-blue-500 p-1"></i>
          <span className="hidden md:inline">Add new note</span>
        </button>
      </div>
    </>
  );
};

export default Nav;
