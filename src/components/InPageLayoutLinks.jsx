import React from "react";
import { MdDashboard } from 'react-icons/md';
import { FaCubes, FaPaintBrush } from 'react-icons/fa';
import { BiRectangle } from 'react-icons/bi';
import { HiOutlineDocumentText } from "react-icons/hi";
import styled from "styled-components";
import { useTheme } from "styled-components";
import { IconHolder } from "./elements/resumeSectionWrapper";

const IconDiv = styled.div.withConfig({
    shouldForwardProp:(props)=>!["textColor"].includes(props)
})`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.bg};
  transition: background-color 0.3s ease;

  &:hover ${IconHolder} {
    background-color: ${(props) => props.hover};
  }
`;

const iconData = [
  {
    id: "all_templates",
    label: "All Templates",
    icon: <MdDashboard />,
    href: "#all-templates",
  },
  {
    id: "classical",
    label: "Classical Templates",
    icon: <HiOutlineDocumentText />,
    href: "#classical",
  },
  {
    id: "modern",
    label: "Modern Templates",
    icon: <FaCubes />,
    href: "#modern",
  },
  {
    id: "creative",
    label: "Creative Templates",
    icon: <FaPaintBrush />,
    href: "#creative",
  },
  {
    id: "simple",
    label: "Simple Templates",
    icon: <BiRectangle />,
    href: "#simple",
  },
];

const InPageLayoutLinks = () => {
  const theme = useTheme();
  const icons = theme.colors.icons;

  return (
    <div className="fixed top-24 left-0 mt-4 w-full z-[999] shadow-md py-4 px-4 flex flex-wrap gap-4 justify-center"
         style={{ backgroundColor: theme.colors.navBackground }}>
      {iconData.map(({ id, label, icon, href }) => {
        const iconStyles = icons[id] || icons.default;
        return (
          <IconDiv
            key={id}
            bg={iconStyles.bg}
            hover={iconStyles.hover}
            textColor={theme.colors.text}
          >
            <IconHolder
              backgroundColor={iconStyles.iconBg}
              padding="10px"
              borderRadius="10px"
            >
              {icon}
            </IconHolder>
            <a href={href}>{label}</a>
          </IconDiv>
        );
      })}
    </div>
  );
};

export default InPageLayoutLinks;
