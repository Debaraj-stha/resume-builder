import React from "react";

import styled, { useTheme } from "styled-components";
import { StyledNavLink } from "./CustomComponents";

const FooterWrapper = styled.footer`
  width: 100vw;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.navBackground};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: 10rem;
  padding: 1.5rem 1rem;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
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
  display: flex;
  justify-content: center;
  gap: 1rem;
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
          <Title>Resume Builder</Title>
          <Paragraph>
            &copy; {new Date().getFullYear()} Resume Builder. All rights reserved.
          </Paragraph>
        </div>
        <FooterLinks>
          <StyledNavLink to="/about">About</StyledNavLink>
          <StyledNavLink to="/privacy">Privacy</StyledNavLink>
          <StyledNavLink to="/contact">Contact</StyledNavLink>
        </FooterLinks>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;
