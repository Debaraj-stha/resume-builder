import React from "react";
import { StyledNavLink } from "./CustomComponents";


const Nav = () => {
  return (
    <nav className="w-full">
      <ul className="flex space-x-8 text-white sm:font-sm">
        <li>
          <StyledNavLink to="/dashboard">Dashboard</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/templates">Templates</StyledNavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
