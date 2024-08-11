import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/dashboard/login");
  };

  return (
    <nav className="bg-teal-500 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home" className="text-white text-2xl font-bold">
          Home
        </Link>
        <div className="flex space-x-4">
          {token ? (
            <>
              <Link
                to="/dashboard/main"
                className="text-white hover:text-teal-200 transition duration-300"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-teal-200 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/dashboard/login"
              className="text-white hover:text-teal-200 transition duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
