// src/components/ui/Modal/Modal.tsx
import React from "react";
import "./ModalStyles.tsx";
import styled from "styled-components";
import Colors from "../../../AppStyles.tsx";
import ActionButton from "../ActionButton/ActionButton";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeButton?: boolean;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  padding: 20px;
  background: ${Colors.white};
  border-radius: 8px;
  border: 2px solid ${Colors.black};
  -webkit-box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  -moz-box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  closeButton = true,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = () => {
    onClose();
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {closeButton && (
          <ModalHeader>
            <ActionButton
              textButton="Закрыть"
              onClick={onClose}
              variant="orange"
            />
          </ModalHeader>
        )}
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
