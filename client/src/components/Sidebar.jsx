import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { openPopUp } from "../store/slices/popup_slice.js";
import AddIcon from "../../public/assets/svgs/AddIcon";

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

const Sidebar = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div
        id="sidebar"
        className="relative z-50 hidden h-full px-0 shadow-lg sm:block sm:w-40 md:w-64"
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
                      return `flex h-10 w-full cursor-pointer items-center rounded-md rounded-r-full border px-2 py-2 capitalize duration-200 hover:border-gray-500 sm:px-4 sm:text-sm ${isActive ? "bg-gradient-to-br from-blue-950 to-blue-900 text-blue-50" : "bg-transparent"}`;
                    }}
                  >
                    {li.name}
                  </NavLink>
                </div>
              );
            })}
          </nav>
        </div>
      </div>

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
              currentNote: { uid: "", description: "" },
            })
          );
        }}
      >
        <div className="flex items-center justify-between gap-2">
          <AddIcon />
          <span className="hidden md:inline">Add new note</span>
        </div>
      </button>
    </>
  );
};

export default Sidebar;
