import React from "react";
import styled, { useTheme } from "styled-components";
import { Button } from "./CustomComponents";
import { IconHolder } from "./elements/resumeSectionWrapper";

// Styled version of your themed Button
const StyledIconButton = styled(Button).withConfig({
  shouldForwardProp: (prop) => !["backgroundColor", "hover", "color"].includes(prop),
})`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${({ theme, backgroundColor, variant }) =>
    backgroundColor || theme.colors.button[variant].bg};
  color: ${({ theme, color, variant }) =>
    color || theme.colors.button[variant].text};

  &:hover {
    background-color: ${({ theme, hover, variant }) =>
      hover || theme.colors.button[variant].hoverBg};
    color: ${({ theme, variant }) => theme.colors.button[variant].hoverText};
  }
`;

const TextIconButton = ({ icon, text, id="all_templates", variant = "outline" }) => {
  const theme = useTheme();
  const iconStyle = theme.colors.icons[id];

  return (
    <StyledIconButton
      variant={variant}
      backgroundColor={iconStyle?.bg}
      hover={iconStyle?.hover}
      color={iconStyle?.color}
    >
    <IconHolder backgroundColor={`${iconStyle.iconBg}`} padding="10px" borderRadius="10px">
        {icon}
      </IconHolder>
      <span className="text-md  text-black">{text}</span>
    </StyledIconButton>
  );
};

export default TextIconButton;
