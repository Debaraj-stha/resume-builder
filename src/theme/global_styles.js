
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: all 0.3s ease;
    margin: 0;
    font-family: sans-serif;
    width: 100%;
    overflow-x: hidden;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
