import React from "react";
import { useTheme } from "../provider/themeProvider";
import { FaSun } from "react-icons/fa";
import { BiMoon } from "react-icons/bi";
import ToolTip from "./Tooltip";
import { Button } from "./CustomComponents";

const ThemeToggler = () => {
  const { isdark, toggleTheme } = useTheme();

  return (
    <ToolTip text="Toggle Theme">
    <Button
      onClick={toggleTheme}
      variant="outline"
      style={{
        fontSize: "1.5rem",
        transform: isdark ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.3s ease",
      }}
    >
      {isdark ? (
  <BiMoon /> // yellow-400
) : (
  <FaSun /> // gray-800
)}

    </Button>
    </ToolTip>
  );
};

export default ThemeToggler;
