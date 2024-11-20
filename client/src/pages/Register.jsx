import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backendUrl from "../../src/constants/backend_url";
import { nanoid } from "@reduxjs/toolkit";

const URL = `${backendUrl}/api/auth`;

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userId: "",
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState(""); // State for error messages
  const [success, setSuccess] = useState(""); // State for success messages

  const registerUser = async (user) => {
    user.userId = nanoid();
    try {
      await axios.post(`${URL}/register`, user);
      setSuccess("Registration successful! Redirecting to login...");
      setError(""); // Clear any previous errors
      setTimeout(() => {
        navigate("/auth/login");
      }, 1000); // Redirect after 2 seconds
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      setSuccess(""); // Clear any previous success message
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(user);
  };

  return (
    <>
      <div className="flex h-dvh w-screen items-center justify-center bg-slate-400 p-6 lg:h-screen">
        <div className="flex h-[95%] w-80 gap-4 rounded-lg bg-white p-2 lg:h-4/5 lg:w-4/6 lg:rounded-2xl lg:p-4">
          <div className="hidden h-full w-1/2 flex-col justify-center gap-8 bg-slate-200 p-10 lg:flex">
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
            <form onSubmit={handleSubmit}>
              <div className="flex h-96 w-full flex-col gap-3 p-2 lg:h-full lg:p-4">
                <div className="relative mb-2">
                  <h2 className="text-center text-3xl font-semibold text-gray-700 lg:mb-2 lg:text-start">
                    Register
                  </h2>
                  <p className="text-center text-gray-500 lg:text-start">
                    Create your account here
                  </p>
                </div>
                <div className="w-full">
                  <label
                    className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    id="email"
                    type="email"
                    required
                    value={user.email}
                    onChange={(e) => {
                      setUser({ ...user, email: e.target.value });
                    }}
                  />
                </div>
                <div className="w-full">
                  <label
                    className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-700"
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    className="w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    id="username"
                    type="text"
                    required
                    value={user.username}
                    onChange={(e) => {
                      setUser({ ...user, username: e.target.value });
                    }}
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
                    className="w-full appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    id="password"
                    type="password"
                    required
                    value={user.password}
                    onChange={(e) => {
                      setUser({ ...user, password: e.target.value });
                    }}
                  />
                </div>
                {error && <p className="text-red-500">{error}</p>}{" "}
                {/* Display error if any */}
                {success && <p className="text-green-500">{success}</p>}{" "}
                {/* Display success message */}
                <button
                  className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none"
                  type="submit"
                >
                  Sign Up
                </button>
                <p className="mt-3 text-center">
                  Already have an account?{" "}
                  <strong className="cursor-pointer text-blue-500">
                    <Link to={"/auth/login"}> Login </Link>
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

export default Register;
