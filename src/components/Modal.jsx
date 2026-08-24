import React, { useEffect } from "react";
import { createPortal } from "react-dom";
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
  width: min(28rem, calc(100vw - 2rem));
  max-width: 28rem;
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
  position: relative;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: rgba(15, 32, 46, .58);
  backdrop-filter: blur(3px);
`;


const Modal = React.memo(({ children, onClose, header, footer,bg}) => {
  const theme=useTheme()
  useEffect(() => {
    const closeOnEscape = event => { if (event.key === "Escape") onClose?.(); };
    document.addEventListener("keydown", closeOnEscape);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", closeOnEscape); document.body.style.overflow = previousOverflow; };
  }, [onClose]);

  if (typeof document === "undefined") return null;
  return createPortal(
    <Overlay role="dialog" aria-modal="true" onMouseDown={event => { if (event.target === event.currentTarget) onClose?.(); }}>
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
    </Overlay>,
    document.body
  );
});

export default Modal;
