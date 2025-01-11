import React, { useState } from "react";
import Modal from "../../ui/Modal/Modal";
import styled from "styled-components";
import { Lesson } from "../../../types";
import PaymentModal from "../PaymentModal/PaymentModal";
import ChangeEventModal from "../ChangeEventModal/ChangeEventModal";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Lesson;
  role: "teacher" | "student";
}

const ModalContent = styled.div`
  padding: 20px;
  background: white;
  border-radius: 8px;
`;
const ModalInfo = styled.div`
  margin-bottom: 10px;
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

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  event,
  role,
}) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isChangeEventModalOpen, setIsChangeEventModalOpen] = useState(false);
  const openPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };
  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };
  const openChangeEventModal = () => {
    setIsChangeEventModalOpen(true);
  };
  const closeChangeEventModal = () => {
    setIsChangeEventModalOpen(false);
  };
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <h2>{event.title}</h2>
        <ModalInfo>
          {role === "student" ? (
            <div>Преподаватель: {event.teacherId}</div>
          ) : (
            <div>Ученик: {event.studentId}</div>
          )}
          <div>Статус оплаты: {event.status}</div>
          <div>Начало: {event.startTime.toLocaleString()}</div>
          <div>Конец: {event.endTime.toLocaleString()}</div>
        </ModalInfo>
        {role === "student" && (
          <Button onClick={openPaymentModal}>Оплатить</Button>
        )}
        <Button onClick={openChangeEventModal}> Изменить/Отменить</Button>
        <PaymentModal isOpen={isPaymentModalOpen} onClose={closePaymentModal} />
        <ChangeEventModal
          isOpen={isChangeEventModalOpen}
          onClose={closeChangeEventModal}
          event={event}
          role={role}
        />
      </ModalContent>
    </Modal>
  );
};

export default EventModal;
