import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backendUrl from "../../src/constants/backend_url";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

const URL = `${backendUrl}/api/auth`;

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState(""); // State for error messages
  const [success, setSuccess] = useState(""); // State for success messages
  const [registerLoading, setRegisterLoading] = useState(false); // State for loading spinner
  // check if alredy logged in
  useEffect(() => {
    const path = window.location.pathname;
    if (localStorage.getItem("token") && !path.startsWith("/note/")) {
      navigate("/");
    }
  });
  const registerUser = async (user) => {
    try {
      setRegisterLoading(true); // Set loading to true when starting the request
      await axios.post(`${URL}/register`, user);
      setSuccess("Registration successful! Redirecting to login...");
      setError(""); // Clear any previous errors
      setRegisterLoading(false); // Set loading to false after the request is complete
      setTimeout(() => {
        navigate("/auth/login");
      }, 1000); // Redirect after 1 seconds
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      setSuccess(""); // Clear any previous success message
      setRegisterLoading(false); // Set loading to false if there's an error
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error messages
    registerUser(user);
  };

  return (
    <>
      <div className="flex h-dvh w-screen items-center justify-center bg-gradient-to-br from-slate-500 to-slate-400 p-6 lg:h-screen">
        <div className="flex h-fit w-80 gap-4 rounded-lg bg-white p-2 pb-12 lg:h-4/5 lg:w-4/6 lg:rounded-2xl lg:p-4">
          <div className="hidden h-full w-1/2 flex-col justify-center gap-8 bg-gradient-to-br from-slate-200 to-blue-200 p-10 lg:flex">
            <span className="text-3xl font-semibold">Note Fusion</span>
            <div className="flex w-full flex-col gap-4">
              <h3 className="text-2xl font-semibold leading-9">
                Elevate Your Workflow: A Professional's Guide to Organize
                Thoughts and Enhance Productivity.
              </h3>
              <p className="text-gray-600">
                Our registration process is quick and easy, taking no more than
                5 minutes to complete.
              </p>
            </div>
            <div className="h-2/5 w-full"></div>
          </div>
          <div className="h-full w-96 py-3 lg:w-1/2 lg:py-0">
            <form
              onSubmit={handleSubmit}
              className="flex h-full w-full flex-col gap-6 p-4"
            >
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">Register a new account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                  Enter your details below to create your account
                </p>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="e.g. example@gmail.com"
                    required
                    value={user.email}
                    onChange={(e) => {
                      setUser({
                        ...user,
                        email: e.target.value.trim().toLowerCase(),
                      });
                      setError(""); // Clear error on input change
                    }}
                  />
                </div>
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
                {success && <p className="text-green-500">{success}</p>}{" "}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={registerLoading} // disable the button if loading is true
                >
                  {/* Show loading spinner if loading is true */}
                  {registerLoading ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    // Show sign up text if loading is false
                    "Sign up"
                  )}
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  to={"/auth/login"}
                  className="underline underline-offset-4"
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
