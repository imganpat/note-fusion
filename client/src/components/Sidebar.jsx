import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { openPopUp } from "../store/slices/PopupSlice";
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
        className="hidden h-full px-3 shadow-lg sm:block sm:w-40 md:w-64 md:px-8"
      >
        <div id="logo" className="flex h-20 w-full items-center">
          <span className="text-2xl font-semibold">Note Fusion</span>
        </div>

        <div id="menu" className="flex h-[85%] w-full flex-col justify-between">
          <nav className="">
            {linksObject.map((li) => {
              return (
                <div key={li.slug}>
                  <NavLink
                    to={`${li.slug}`}
                    className={({ isActive }) => {
                      return `flex h-10 w-full cursor-pointer items-center rounded-md px-2 py-2 capitalize duration-200 hover:bg-blue-100 ${isActive ? "bg-blue-100" : "bg-transparent"}`;
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
        className="absolute bottom-10 left-9 flex h-14 items-center justify-center rounded-md bg-blue-200 px-8"
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
