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
  background-color: ${({ theme, backgroundColor, variant="primary" }) =>
    backgroundColor || theme.colors.button[variant].bg};
  color: ${({ theme, color, variant ="primary"}) =>
    color || theme.colors.button[variant].text};

  &:hover {
    background-color: ${({ theme, hover, variant="primary" }) =>
    hover || theme.colors.button[variant].hoverBg};
    color: ${({ theme, variant="primary" }) => theme.colors.button[variant].hoverText};
  }
`;
const IconButton = React.memo(({ children ,onClick}) => {
  const theme = useTheme();
  const iconStyle = theme.colors.icons["default"]
  return (
    <StyledIconButton backgroundColor={iconStyle.bg} hover={iconStyle.hover} color={iconStyle.color} onClick={onClick}>
      {children}
    </StyledIconButton>
  )
})

const TextIconButton = React.memo(({ icon, text, onClick, id = "all_templates", variant = "outline" }) => {
  const theme = useTheme();
  const iconStyle = theme.colors.icons[id] || theme.colors.icons['default'];

  return (
    <StyledIconButton
      variant={variant}
      backgroundColor={iconStyle?.bg}
      hover={iconStyle?.hover}
      color={iconStyle?.color}
      onClick={onClick}
     
    >
      <IconHolder backgroundColor={`${iconStyle.iconBg}`} padding="10px" borderRadius="10px">
        {icon}
      </IconHolder>
      <span className="text-md" style={{color:theme.colors.text}}>{text}</span>
    </StyledIconButton>
  );
});

export default TextIconButton;
export  {IconButton}