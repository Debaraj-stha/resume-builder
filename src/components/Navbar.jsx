import React from "react";
import Nav from "./Nav";
import UserCard from "./UserCard";

import ThemeToggler from "./ThemeToggler";
import { StyledNavLink } from "./CustomComponents";
import { useTheme } from "styled-components";
;


const Navbar = () => {
  const theme=useTheme()
  return (
    <div className="healthcare-navbar" style={{color:theme.colors.text,background:theme.colors.navBackground}}>
      {/* Left Section: Resume Builder Banner */}
      <div className="navbar-brand">
        <StyledNavLink isBanner={true}  to="/" className="transition-all text-lg font-bold">
          ResuAI Healthcare
        </StyledNavLink >
      </div>

      {/* Center Section: Navigation Links */}
      <div className="navbar-links">
        <Nav />
      </div>
      {/* theme toggle button  */}
      <div className="navbar-actions"><ThemeToggler/>

      {/* Right Section: User Card */}
      <div className="flex items-center">
        <UserCard />
      </div></div>
    </div>
  );
};

export default Navbar;
