import React, { useState, useCallback } from "react";
import styled from "styled-components";

// === Styled Components ===
const FieldWrapper = styled.div`
  position: relative;
  margin-bottom: 2rem;
  width: 100%;
`;

const Label = styled.label`
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
`;

const Modal = styled.div`
  position: absolute;
  bottom: 120%; /* Appear just above the label */
  left: 0;
  background: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  z-index: 11111;
  width: 100%;
  height: 300px; /* Or your preferred height */
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1; /* Takes full height of modal */
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const CloseButton = styled.button`
  margin-top: 1rem;
  background: #333;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  align-self: flex-end;
  cursor: pointer;
`;

// === Component ===
const InputWithModal = ({ fieldName, value, onChange }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = useCallback(() => {
    setShowModal(prev => !prev);
  }, []);

  return (
    <FieldWrapper>
      <Label onClick={toggleModal}>{fieldName}</Label>
      {showModal && (
        <Modal>
          <Input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            autoFocus
          />
          <CloseButton onClick={toggleModal}>Close</CloseButton>
        </Modal>
      )}
    </FieldWrapper>
  );
};

export default InputWithModal;
