import React from "react";

import styled from "styled-components";
import { StyledNavLink } from "./CustomComponents";
import { seoPageLinks } from "../data/healthcareSeoPages";

const FooterWrapper = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.navBackground};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: 6rem;
  padding: 3.5rem clamp(1.25rem, 4vw, 4rem);
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const FooterContent = styled.div`
  width: min(1180px, 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const Title = styled.h2`
  font-size: 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.accent};

  @media (min-width: 640px) {
    font-size: 1.125rem;
  }

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const Paragraph = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
`;

const FooterLinks = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(140px, 1fr));
  justify-content: center;
  gap: .7rem 1.5rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};

  a {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.navText};
    }
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <div>
          <Title>ResuAIBuilder</Title>
          <Paragraph>
            &copy; {new Date().getFullYear()} ResuAIBuilder. All rights reserved.
          </Paragraph>
        </div>
        <FooterLinks>
          {seoPageLinks.map(([label, path]) => <StyledNavLink key={path} to={path}>{label}</StyledNavLink>)}
          <StyledNavLink to="/healthcare-cv-examples">CV Examples</StyledNavLink>
          <StyledNavLink to="/gcc-eligibility-checker">GCC Checklist</StyledNavLink>
          <StyledNavLink to="/licensing-exam-prep">Licensing Exam Prep</StyledNavLink>
          <StyledNavLink to="/healthcare-interview-questions">Interview Questions</StyledNavLink>
          <StyledNavLink to="/healthcare-salary-explorer">Salary Explorer</StyledNavLink>
          <StyledNavLink to="/application-tracker">Application Tracker</StyledNavLink>
          <StyledNavLink to="/career-readiness-score">Readiness Score</StyledNavLink>
          <StyledNavLink to="/about">About</StyledNavLink>
          <StyledNavLink to="/privacy">Privacy</StyledNavLink>
          <StyledNavLink to="/refund-policy">Refunds</StyledNavLink>
          <StyledNavLink to="/contact">Contact</StyledNavLink>
        </FooterLinks>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;
