import React from "react";
import { CgClose } from "react-icons/cg";
import styled, { keyframes, useTheme } from "styled-components";
import ScrollableModal from "./ScrollableModal";
import { CloseButton } from "./CustomComponents";
const scaleUp = keyframes`
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;
const Card = styled.div.withConfig({shouldForwardProp: (props) => !["backgroundColor"].includes(props)})`
  animation: ${scaleUp} 0.3s ease-out forwards;
  transform-origin: center;
  background-color: ${({ theme,backgroundColor }) => backgroundColor||theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  width: 91.666667%;
  max-width: 28rem;
  position: relative;
`;


const Modal = React.memo(({ children, onClose, header, footer,bg}) => {
  const theme=useTheme()
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <Card backgroundColor={bg}>
        {/* Header */}
        <div className="mb-4 flex justify-between items-center border-b pb-2">
          <div className="text-lg font-semibold">{header}</div>
          <CloseButton
            onClick={onClose}
            
          >
            <CgClose  />
          </CloseButton>
        </div>

        {/* Body */}
        <div className="mb-4">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="pt-3 mt-3 border-t">
            {footer}
          </div>
        )}
      </Card>
    </div>
  );
});

export default Modal;
