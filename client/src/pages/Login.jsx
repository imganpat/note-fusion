import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import backendUrl from "../constants/backend_url.js";

// Setting the url for authentication
const URL = `${backendUrl}/auth`;

// Creating come default background color for profile pic or icon (inspired from google)
const backgroundColorsList = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-slate-500",
  "bg-gray-500",
  "bg-stone-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-lime-600",
  "bg-teal-700",
  "bg-violet-600",
  "bg-fuchsia-700",
  "bg-pink-500",
  "bg-rose-500",
];

// Function to five a random profile picture. On every login the baclground color is changed to get a fresh look
const generateProfileBgColor = (backgroundColorsList) => {
  return backgroundColorsList[
    Math.floor(Math.random() * backgroundColorsList.length)
  ];
};

let profileBgColor = generateProfileBgColor(backgroundColorsList);

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState(""); // State to handle errors

  // Function to handle login request
  const fetchLogin = async (user) => {
    try {
      const response = await axios.post(`${URL}/login`, user, {
        withCredentials: true, // Ensure cookies are included
      });
      navigate("/"); // Redirect upon successful login
      Cookies.set("profile-bg-color", profileBgColor, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      });
      return response.data;
    } catch (error) {
      // Handle error if login fails
      setError(error.response?.data?.message || "Login failed");
      console.error("Login failed:", error);
      return null;
    }
  };

  // Handler for form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await fetchLogin(user);
    if (data) {
      console.log("Login successful:", data);
    } else {
      console.log("Login failed");
    }
  };

  return (
    <>
      <div className="-mt-5 flex h-dvh w-screen items-center justify-center bg-slate-400 p-6 lg:h-screen">
        <div className="flex h-fit w-80 gap-4 rounded-lg bg-white p-2 lg:h-4/5 lg:w-4/6 lg:rounded-2xl lg:p-4">
          <div className="hidden h-full w-1/2 flex-col justify-center gap-8 bg-slate-200 p-10 lg:flex">
            <span className="text-3xl font-semibold">Note Fusion</span>
            <div className="flex w-full flex-col gap-4">
              <h3 className="text-2xl font-semibold leading-9">
                Elevate Your Workflow: A Professional's Guide to Organize
                Thoughts and Enhance Productivity.
              </h3>
              <p className="text-gray-600">
                Our registration process is quick and easy, taking no more than
                5 minutes to complete
              </p>
            </div>
            <div className="h-2/5 w-full"></div>
          </div>
          <div className="h-full w-96 py-3 lg:w-1/2 lg:py-0">
            <form onSubmit={handleLogin}>
              <div className="flex h-96 w-full flex-col gap-3 p-2 lg:h-full lg:p-8">
                <div className="relative mb-4">
                  <h2 className="text-center text-3xl font-semibold text-gray-700 lg:mb-2 lg:text-start">
                    Log in
                  </h2>
                </div>
                <div className="w-full">
                  <label
                    className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-700"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    className="mb-3 w-full appearance-none rounded border-2 border-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                  />
                </div>
                <div className="w-full">
                  <label
                    className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="mb-3 w-full appearance-none rounded border-2 border-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </div>
                {/* Display error if any */}
                {error && <p className="text-red-500">{error}</p>}{" "}
                <button
                  className="focus:shadow-outline rounded bg-blue-500 px-4 py-3 font-bold text-white hover:bg-blue-600 focus:outline-none"
                  type="submit"
                >
                  Log in
                </button>
                <p className="mt-3 text-center">
                  Don't have an account?{" "}
                  <strong className="cursor-pointer text-blue-500">
                    <Link to={"/auth/register"}>Sign Up</Link>
                  </strong>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;