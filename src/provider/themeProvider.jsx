
import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as StyledProvider } from "styled-components";
import { lightTheme, darkTheme } from "../theme/themes";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isdark, setIsdark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", isdark ? "dark" : "light");
  }, [isdark]);

  const toggleTheme = () => {
    setIsdark(prev => !prev);
    console.log("isdark",isdark)

  }
  const theme = isdark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isdark, toggleTheme }}>
      <StyledProvider theme={theme}>{children}</StyledProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme=()=>useContext(ThemeContext)