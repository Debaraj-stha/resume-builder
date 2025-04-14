import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-screen flex  justify-center bg-gray-100 border-t mt-40 p-0 py-6 px-4 text-center md:text-left ">
      <div className=" md:flex-row justify-between items-center gap-4">
        <div><h2 className="text-sm sm:text-lg md:text-xl font-bold text-blue-600 my-3 text-center">
          Resume Builder
        </h2>

          <p className="text-sm text-gray-600 my-2 text-center">
          &copy; {new Date().getFullYear()} Resume Builder. All rights reserved.
          </p>
        </div>

        <ul className="flex  justify-center gap-4 text-sm text-gray-600">
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/privacy" className="hover:text-blue-600">Privacy</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact</Link>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
