import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../redux/actions/authActions";

const Navbar = () => {
  const authState = useSelector((state) => state.authReducer);
  const tasks = useSelector((state) => state.tasksReducer);
  const dispatch = useDispatch();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const location = useLocation();

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  const isHomePage = location.pathname === "/";
  const isSignUpPage = location.pathname === "/signup";
  const isSignInPage = location.pathname === "/login";

  const hasTasks = Array.isArray(tasks) && tasks.length > 0;

  useEffect(() => {
    console.log("Tasks:", tasks);
  }, [tasks]);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-700 to-indigo-700 shadow-2xl">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');`}
      </style>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center font-poppins">
        
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center">
            <img
              src="https://preview.redd.it/hi-this-is-a-logo-for-the-task-manager-application-called-v0-si3hzlaglc7b1.png?width=640&crop=smart&auto=webp&s=04d231d246026a59f988ac183a82e0ea2ca8ef4e" 
              alt="Logo"
              className="w-12 h-12"
            />
            <h1 className="text-4xl font-bold uppercase tracking-widest text-white hover:scale-110 transition-transform">
              Task Manager
            </h1>
          </Link>
        </div>

        
        <nav className="hidden md:flex items-center gap-8 text-white uppercase font-semibold text-lg">
          {authState.isLoggedIn ? (
            <>
              {hasTasks && (
                <Link
                  to="/tasks/add"
                  className="bg-gradient-to-r from-blue-500 to-green-400 px-5 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 hover:from-blue-600 hover:to-green-500 transition-all duration-300 flex items-center gap-2"
                >
                  <i className="fa-solid fa-plus"></i> Add Task
                </Link>
              )}
              <button
                onClick={handleLogoutClick}
                className="hover:underline hover:text-gray-300 transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {isSignInPage && (
                <Link
                  to="/signup"
                  className="hover:text-gray-300 hover:underline transition-all duration-300"
                >
                  Sign Up
                </Link>
              )}
            </>
          )}
        </nav>

       
        <button
          className="md:hidden text-white text-3xl focus:outline-none hover:text-gray-300"
          onClick={toggleNavbar}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      
      <div
        className={`absolute md:hidden top-0 right-0 h-full w-80 bg-gradient-to-b from-purple-700 to-indigo-700 text-white transform transition-transform duration-500 ${
          isNavbarOpen ? "translate-x-0" : "translate-x-full"
        } shadow-2xl`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-300">
          <h2 className="text-2xl font-bold">Menu</h2>
          <button
            className="text-2xl focus:outline-none hover:text-gray-300"
            onClick={toggleNavbar}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <nav className="flex flex-col gap-6 p-6 text-center text-lg font-medium">
          {authState.isLoggedIn ? (
            <>
              {hasTasks && (
                <Link
                  to="/tasks/add"
                  className="bg-gradient-to-r from-blue-500 to-green-400 px-5 py-2 rounded-full shadow-md hover:shadow-lg hover:from-blue-600 hover:to-green-500 transition-all duration-300"
                >
                  <i className="fa-solid fa-plus"></i> Add Task
                </Link>
              )}
              <button
                onClick={handleLogoutClick}
                className="hover:underline transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {isHomePage && (
                <>
                  <Link
                    to="/login"
                    className="hover:text-gray-300 hover:underline transition-all duration-300"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="hover:text-gray-300 hover:underline transition-all duration-300"
                  >
                    Sign Up
                  </Link>
                </>
              )}
              {isSignUpPage && (
                <Link
                  to="/login"
                  className="hover:text-gray-300 hover:underline transition-all duration-300"
                >
                  Sign In
                </Link>
              )}
              {isSignInPage && (
                <Link
                  to="/signup"
                  className="hover:text-gray-300 hover:underline transition-all duration-300"
                >
                  Sign Up
                </Link>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
