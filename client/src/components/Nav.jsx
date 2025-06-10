import { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import URL from "../constants/backend_url";
import { clearAllNotes, sortNotes } from "../store/slices/notes_slice";
import { useDispatch } from "react-redux";

// links object for navigation
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

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profilePopupRef = useRef(); // profile popup ref for toggling visibility of profile popup on clicking profile icon

  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [userMail, setUserMail] = useState(localStorage.getItem("email") || "");

  const [profileBgColor, setProfileBgColor] = useState(
    localStorage.getItem("profile-bg-color") // accessing profile-bg-color cookie to set profile icon background color
  );

  useEffect(() => {
    setUsername(username.slice(0, 1).toUpperCase() + username.slice(1)); // Capitalizing first letter of username and setting it to state
    setUserMail(userMail); // setting user email to state
  }, [username, userMail]);

  const handleLogout = async () => {
    await axios.get(`${URL}/api/auth/logout`, {
      withCredentials: true,
    });
    dispatch(clearAllNotes());
    localStorage.clear("username");
    localStorage.clear("email");
    localStorage.clear("profile-bg-color");
    navigate("/"); // redirecting to home page after logout
  };

  document.addEventListener("keydown", (e) => {
    if (e.key == "Escape") profilePopupRef.current.classList.add("hidden");
  });

  document.addEventListener("click", (e) => {
    profilePopupRef.current.classList.add("hidden");
  });

  return (
    <>
      <div className="flex min-h-16 w-full items-center justify-end px-0 py-2 shadow sm:px-4 md:px-6 lg:px-8">
        <div
          id="profile"
          className="flex h-full w-fit items-center justify-center gap-4"
        >
          <span className="">Hello, {username}</span>

          {/* checking if username is present or not to display profile icon. If not logged in profile icon is not displayed */}
          {username && (
            <span
              className={`mr-4 grid h-10 w-10 cursor-pointer place-items-center rounded-full ${profileBgColor} text-lg font-semibold text-white`}
              onClick={(e) => {
                e.stopPropagation();
                profilePopupRef.current.classList.toggle("hidden"); // toggling visibility of profile popup on clicking profile icon
              }}
            >
              {/* displaying first letter of username in profile icon */}
              <span>{username[0]}</span>{" "}
            </span>
          )}

          {/* Profile popup */}
          <div
            ref={profilePopupRef}
            className="absolute right-4 top-12 z-20 flex hidden h-40 w-64 flex-col gap-2 rounded-lg bg-slate-50 px-4 py-5 shadow-lg md:w-80"
          >
            <span className="font-semibold">Note Fusion</span>

            <span
              className="absolute right-6 top-8 cursor-pointer hover:text-blue-700"
              onClick={() => handleLogout()}
            >
              Logout
            </span>

            <div className="flex h-16 w-full flex-1 gap-2">
              <div className="flex h-full min-w-fit items-center justify-center">
                <span
                  // setting background color of profile icon from profile-bg-color cookie
                  className={`grid h-12 w-12 place-items-center rounded-full ${profileBgColor} text-lg font-semibold text-white`}
                >
                  {/* displaying first letter of username in profile icon */}
                  <span>{username[0]}</span>
                </span>
              </div>
              <div className="flex h-full md:w-2/3">
                <div className="flex h-full w-full flex-col justify-center">
                  <span className="text-lg font-semibold">{username}</span>
                  <span className="-mt-1 text-sm text-gray-600">
                    {userMail}
                  </span>
                  <NavLink
                    to={"/profile"}
                    className="mt-1 w-fit cursor-pointer text-sm text-gray-600 hover:text-blue-700 hover:underline"
                    onClick={() =>
                      profilePopupRef.current.classList.toggle("hidden")
                    }
                  >
                    View Profile
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation links for mobile view only */}
      <nav className="mx-4 my-3 flex gap-4 text-sm sm:hidden">
        <select
          name="nav-links"
          className="rounded-md border px-2 py-2 text-sm text-gray-700 outline-none sm:px-4"
          defaultValue={window.location.pathname}
          onChange={(e) => {
            const selectedSlug = e.target.value;
            if (selectedSlug) {
              navigate(selectedSlug);
            }
          }}
        >
          {linksObject.map((li) => {
            return (
              <option
                key={li.slug}
                value={li.slug}
                className="cursor-pointer capitalize"
              >
                {li.name}
              </option>
            );
          })}
        </select>

        <select
          name="sorting-order"
          className="rounded-md border px-2 py-2 text-sm text-gray-700 outline-none sm:px-4"
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
    </>
  );
};

export default Nav;
