import React from "react";
import { StyledNavLink } from "./CustomComponents";


const Nav = () => {
  return (
    <nav className="primary-nav" aria-label="Primary navigation">
      <ul>
        <li>
          <StyledNavLink to="/dashboard">Dashboard</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/templates">CV Builder</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/cover-letter">Cover Letter</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/ats-checker">ATS Check</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/ai-assistant">AI Assistant</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/pricing">Pricing</StyledNavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
