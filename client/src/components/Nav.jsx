import { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import URL from "../constants/backend_url";
import { clearAllNotes, sortNotes } from "../store/slices/notes_slice";
import { useDispatch } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";

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

  const user = {
    name: localStorage.getItem("username") || "User",
    email: localStorage.getItem("email") || "",
    avatar: "https://avatars.githubusercontent.com/u/12345678?v=4", // replace with actual avatar URL
  };

  const isMobile = false;

  return (
    <>
      <div className="flex min-h-14 w-full items-center justify-end px-5 py-2 sm:px-4 md:px-6 lg:px-8">
        <div
          id="profile"
          className="flex h-full w-fit items-center justify-center gap-2"
        >
          <span className="">Hello, {username}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">GC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) mt-8 min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="start"
              sideOffset={-30}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-full">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Sparkles />
                  Upgrade to Pro
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
