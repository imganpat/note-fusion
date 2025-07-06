import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backendUrl from "../constants/backend_url.js";
import { setLoading } from "../store/slices/notes_slice.js";
import { useDispatch } from "react-redux";
import { Label } from "@/components/ui/label.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Loader2Icon } from "lucide-react";

// Setting the url for authentication
const URL = `${backendUrl}/api/auth`;

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
  const [loginLoading, setLoginLoading] = useState(false);
  const dispatch = useDispatch();

  // check if alredy logged in
  useEffect(() => {
    const path = window.location.pathname;
    if (localStorage.getItem("token") && !path.startsWith("/note/")) {
      navigate("/");
    }
  });

  // Function to handle login request
  const fetchLogin = async (user) => {
    try {
      const response = await axios.post(`${URL}/login`, user);
      localStorage.setItem("profile-bg-color", profileBgColor);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("email", response.data.email);
      dispatch(setLoading(true));
      navigate("/"); // Redirect upon successful login
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
    setError("");
    setLoginLoading(true); // Set loading to true when starting the request
    const data = await fetchLogin(user);
    setLoginLoading(false); // Set loading to false after the request is complete
  };

  return (
    <>
      <div className="flex h-dvh w-screen items-center justify-center bg-gradient-to-br from-slate-500 to-slate-400 p-6 lg:h-screen">
        <div className="flex h-fit w-80 gap-4 rounded-lg bg-white p-2 lg:h-4/5 lg:w-4/6 lg:rounded-2xl lg:p-4">
          <div className="hidden h-full w-1/2 flex-col justify-center gap-8 bg-gradient-to-br from-slate-200 to-blue-200 p-10 lg:flex">
            <span className="text-3xl font-semibold">Note Fusion</span>
            <div className="flex w-full flex-col gap-4">
              <h3 className="text-2xl font-semibold leading-9">
                Elevate Your Workflow: A Professional's Guide to Organize
                Thoughts and Enhance Productivity.
              </h3>
              <p className="text-gray-600">
                Our log-in process is quick and easy, taking no more than 2
                minutes to complete.
              </p>
            </div>
            <div className="h-2/5 w-full"></div>
          </div>

          <div className="flex h-full w-96 flex-col items-center justify-center py-3 lg:w-1/2 lg:py-0">
            <form
              onSubmit={handleLogin}
              className="flex h-full w-full flex-col gap-6 p-4"
            >
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                  Enter your credentials below to login to your account
                </p>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="e.g. jhon123"
                    required
                    value={user.username}
                    onChange={(e) => {
                      setUser({
                        ...user,
                        username: e.target.value.trim().toLowerCase(),
                      });
                      setError(""); // Clear error on input change
                    }}
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={user.password}
                    onChange={(e) => {
                      setError("");
                      setUser({ ...user, password: e.target.value });
                    }}
                  />
                </div>
                {/* Display error if any */}
                {error && <p className="text-red-500">{error}</p>}{" "}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loginLoading} // disable the button if loading is true
                >
                  {/* Show loading spinner if loading is true */}
                  {loginLoading ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    // Show login text if loading is false
                    "Log in"
                  )}
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  to={"/auth/register"}
                  className="underline underline-offset-4"
                >
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
