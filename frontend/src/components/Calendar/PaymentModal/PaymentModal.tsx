import React from "react";
import Modal from "../../ui/Modal/Modal";
import { api } from "../../../services/api";
import styled from "styled-components";
interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: white;
  border-radius: 8px;
`;
const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: #367c39;
  }
`;
const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const handleConfirm = () => {
    // Здесь будет запрос на подтверждение оплаты
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <h2>Реквизиты для оплаты</h2>
        <p>Номер карты: 1234 5678 9012 3456</p>
        <Button onClick={handleConfirm}>Подтвердить оплату</Button>
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;
