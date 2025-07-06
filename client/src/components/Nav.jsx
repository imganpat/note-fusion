import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import URL from "../constants/backend_url";
import { clearAllNotes } from "../store/slices/notes_slice";
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
import { Avatar, AvatarFallback } from "./ui/avatar";
import { LogOut, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { AlertDialog } from "./ui/alert-dialog";
import ConfirmDialog from "./ConfirmDialog";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isMobile = useIsMobile();

  const [user, setuser] = useState({
    name: localStorage.getItem("username") || "User",
    email: localStorage.getItem("email") || "",
  });

  const [profileBgColor, setProfileBgColor] = useState(
    localStorage.getItem("profile-bg-color") // accessing profile-bg-color cookie to set profile icon background color
  );

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  useEffect(() => {
    // Capitalizing first letter of username and setting it to state
    const username = localStorage.getItem("username") || "User";
    const userMail = localStorage.getItem("email") || "";
    setuser({
      name: username.charAt(0).toUpperCase() + username.slice(1),
      email: userMail,
    });
  }, []);

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

  return (
    <>
      <div className="sticky top-0 z-10 flex min-h-14 w-full items-center justify-end bg-secondary px-5 py-2 sm:px-4 md:px-6 lg:px-8">
        <div
          id="profile"
          className="flex h-full w-fit items-center justify-center gap-2"
        >
          <span className="">Hello, {user.name}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarFallback
                  className={`rounded-lg text-white ${profileBgColor}`}
                >
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
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
                    <AvatarFallback
                      className={`rounded-lg text-white ${profileBgColor}`}
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <NavLink to="/profile">
                  <DropdownMenuItem className="cursor-pointer">
                    <User /> <span>View profile</span>
                  </DropdownMenuItem>
                </NavLink>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => setIsLogoutDialogOpen(true)}
                >
                  <LogOut /> Logout
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <AlertDialog
        open={isLogoutDialogOpen}
        onOpenChange={setIsLogoutDialogOpen}
      >
        <ConfirmDialog
          title="Confirm Logout"
          description="Are you sure you want to log out?"
          confirmText="Logout"
          onConfirm={handleLogout}
        />
      </AlertDialog>
    </>
  );
};

export default Nav;
