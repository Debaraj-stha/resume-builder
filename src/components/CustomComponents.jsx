import { Link } from "react-router-dom";
import styled from "styled-components";

const Hspace=styled.div`
height:130px;
width:100%;
margin-bottom:30px;
`
export  {Hspace}


export const StyledNavLink = styled(Link).withConfig({
    shouldForwardProp:(props)=>!["isBanner"].includes(props)
})`
  color: ${({ theme,isBanner }) => isBanner ? theme.colors.bannerText: theme.colors.navText};
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover {
    color: ${({ theme ,isBanner}) => isBanner ? theme.colors.bannerHoverText:theme.colors.navHoverText};
  }
`;



export const Button = styled.button`
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:10px;
  background-color: ${({ theme, variant = 'primary' }) => theme.colors.button[variant].bg};
  color: ${({ theme, variant = 'primary' }) => theme.colors.button[variant].text};
  border: 1px solid ${({ theme, variant = 'primary' }) => theme.colors.button[variant].border};
  padding: 0.5rem 1.25rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme, variant = 'primary' }) => theme.colors.button[variant].hoverBg};
    color: ${({ theme, variant = 'primary' }) => theme.colors.button[variant].hoverText};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.button.disabled.bg};
    color: ${({ theme }) => theme.colors.button.disabled.text};
    border-color: ${({ theme }) => theme.colors.button.disabled.border};
    cursor: not-allowed;
  }
`;
