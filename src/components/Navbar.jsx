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
    <div className="header shadow p-4 flex justify-between items-center w-fullfixed top-0 left-0 z-50"style={{color:theme.colors.text,background:theme.colors.navBackground}}>
      {/* Left Section: Resume Builder Banner */}
      <div className="flex-1 text-left">
        <StyledNavLink isBanner={true}  to="/" className="transition-all text-lg font-bold">
          Resume Builder
        </StyledNavLink >
      </div>

      {/* Center Section: Navigation Links */}
      <div className="flex-1 flex justify-center">
        <Nav />
      </div>
      {/* theme toggle button  */}
    <ThemeToggler/>

      {/* Right Section: User Card */}
      <div className="flex items-center">
        <UserCard />
      </div>
    </div>
  );
};

export default Navbar;
