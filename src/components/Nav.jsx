import React from "react";
import { StyledNavLink } from "./CustomComponents";

const Nav = () => {
  return (
    <nav className="primary-nav" aria-label="Primary navigation">
      <ul>
        <li><StyledNavLink to="/dashboard">Dashboard</StyledNavLink></li>
        <li><StyledNavLink to="/ats-checker">AI CV & ATS</StyledNavLink></li>
        <li><StyledNavLink to="/uae-healthcare-jobs">UAE Jobs</StyledNavLink></li>
        <li><StyledNavLink to="/healthcare-cv-examples">Free Resources</StyledNavLink></li>
        <li><StyledNavLink to="/healthcare-interview-coach">Interview Coach</StyledNavLink></li>
        <li><StyledNavLink to="/licensing-exam-prep">Exam Prep</StyledNavLink></li>
        <li><StyledNavLink to="/credential-readiness">Country Readiness</StyledNavLink></li>
        <li><StyledNavLink to="/pricing">Pricing</StyledNavLink></li>
      </ul>
    </nav>
  );
};

export default Nav;
