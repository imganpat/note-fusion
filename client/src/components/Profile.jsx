import { useState } from "react";
import axios from "axios";
import URL from "../constants/backend_url";
import { clearAllNotes } from "../store/slices/notes_slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AlertDialog, AlertDialogTrigger } from "./ui/alert-dialog";
import ConfirmDialog from "./ConfirmDialog";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [userMail, setUserMail] = useState(localStorage.getItem("email") || "");

  const [profileBgColor, setProfileBgColor] = useState(
    localStorage.getItem("profile-bg-color") // accessing profile-bg-color cookie to set profile icon background color
  );

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
    <div className="relative flex w-full flex-1 flex-grow flex-col items-center justify-center p-2 shadow sm:p-4">
      <div className="h-36 w-full rounded-t-md bg-gradient-to-tr from-blue-700 to-blue-950"></div>
      <div
        className={`absolute left-6 top-1/4 flex h-28 w-28 items-center justify-center rounded-full border-4 border-white text-4xl font-semibold uppercase text-white sm:top-16 sm:h-32 sm:w-32 md:text-5xl lg:left-10 ${profileBgColor}`}
      >
        <span>{username[0]}</span>
      </div>
      <div className="flex w-full flex-col gap-2 rounded-b-md bg-slate-50 p-4 pt-14 lg:p-12 lg:pt-16">
        <h3 className="text-xl font-semibold leading-6 text-slate-900 md:text-2xl lg:text-2xl">
          {username}
        </h3>
        <p className="text-gray-600">{userMail}</p>
        <div className="flex h-14 items-end gap-4">
          <AlertDialog>
            <AlertDialogTrigger className="h-10 w-28 rounded-md border-2 text-sm font-medium text-gray-600 duration-200 hover:border-2 hover:border-gray-500 hover:bg-gray-200">
              Logout
            </AlertDialogTrigger>
            <ConfirmDialog
              title="Confirm Logout"
              description="Are you sure you want to log out?"
              confirmText="Logout"
              onConfirm={handleLogout}
            />
          </AlertDialog>

          <Link
            // className="flex h-10 w-36 items-center justify-center rounded-md border-2 text-sm font-medium text-gray-600 duration-200 hover:border-2 hover:border-gray-500 hover:bg-gray-200"
            className="relative flex h-10 w-36 items-center justify-center rounded bg-gradient-to-tr from-blue-900 to-blue-950 bg-[length:200%_200%] bg-left py-4 text-sm text-blue-50 transition-all duration-500 ease-in-out hover:bg-right"
            style={{
              backgroundImage:
                "linear-gradient(to right, #172554, #1E40AF, #172554)",
              transition: "background-position 0.3s ease-in-out",
            }}
            to="/"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
