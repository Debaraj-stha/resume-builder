import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="w-full">
      <ul className="flex space-x-8 text-white sm:font-sm">
        <li>
          <Link to="/dashboard" className="text-blue-500 hover:text-blue-700 transition-all">Dashboard</Link>
        </li>
        <li>
          <Link to="/build-resume" className="text-blue-500 hover:text-blue-700 transition-all">Build Resume</Link>
        </li>
        <li>
          <Link to="/templates" className="text-blue-500 hover:text-pink-700 transition-all">Templates</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
