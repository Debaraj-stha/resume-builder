import React from "react";
import Nav from "./Nav";
import UserCard from "./UserCard";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="header shadow p-2 flex justify-between items-center w-full bg-gray-800 text-white fixed top-0 left-0 z-50">
      {/* Left Section: Resume Builder Banner */}
      <div className="flex-1 text-left">
        <Link to="/" className="text-pink-500 hover:text-pink-700 transition-all text-lg font-bold">
          Resume Builder
        </Link>
      </div>

      {/* Center Section: Navigation Links */}
      <div className="flex-1 flex justify-center">
        <Nav />
      </div>

      {/* Right Section: User Card */}
      <div className="flex items-center">
        <UserCard />
      </div>
    </div>
  );
};

export default Navbar;
