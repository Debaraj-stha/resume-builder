import React, { useState } from "react";
import styled from "styled-components";

// Wrapper for the trigger + tooltip
const ToolTipWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

// Styled tooltip box
const ToolTipBox = styled.div.withConfig({
  // Styled-components tries to pass all props to the underlying HTML element,
  // but non-standard props like "show" are not valid HTML attributes and will cause a warning.
  // shouldForwardProp tells styled-components to *exclude* certain props from being forwarded to the DOM.
  shouldForwardProp: (prop) => !['show'].includes(prop),
})`
  position: absolute;
  bottom: -115%;
  left: 50%;
  transform: translateX(-50%);
  padding: ${(props) => props.padding || "5px"};
  background: ${(props) => props.backgroundColor || "white"};
  border-radius: 10px;
  color: ${(props) => props.color || "black"};
  transition: opacity 0.3s ease-in-out;
  white-space: nowrap;
  z-index: 11111;
  opacity: ${(props) => (props.show ? 1 : 0)};
  pointer-events: none;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.6);
  font-size:14px;
  &::before {
    content: "";
    position: absolute;
    top: -20%;
    left: 50%;
    transform: translateX(-50%) rotate(70deg);
    border-width: 10px;
    border-style: solid;
    border-color: ${(props) => props.backgroundColor || "white"} transparent transparent transparent;
  }
`;



const ToolTip = React.memo(({ children,  backgroundColor, color, padding,text="Tooltip" }) => {
  const [show, setShow] = useState(false);

  return (
    <ToolTipWrapper
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <ToolTipBox
        className="tooltip"
        show={show}
        backgroundColor={backgroundColor}
        color={color}
        padding={padding}

      >
        {text}
      </ToolTipBox>
    </ToolTipWrapper>
  );
});

export default ToolTip;
