import React, { useState } from "react";
import Modal from "../../ui/Modal/Modal";
import { Lesson } from "../../../types";
import styled from "styled-components";
interface ChangeEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Lesson;
  role: "teacher" | "student";
}
const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
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

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: white;
  border-radius: 8px;
`;
const ChangeEventModal: React.FC<ChangeEventModalProps> = ({
  isOpen,
  onClose,
  event,
  role,
}) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isRegular, setIsRegular] = useState(false);
  const handleCancel = () => {
    // Отправляем запрос на отмену
    onClose();
  };
  const handleSaveChanges = () => {
    // Отправляем запрос на изменение
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <h2>Изменить занятие</h2>
        <label htmlFor="startTime">Время начала:</label>
        <Input
          type="time"
          id="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <label htmlFor="endTime">Время окончания:</label>
        <Input
          type="time"
          id="endTime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <label htmlFor="isRegular">Регулярное:</label>
        <input
          type="checkbox"
          id="isRegular"
          value={isRegular}
          onChange={() => setIsRegular(!isRegular)}
        />
        <Button onClick={handleSaveChanges}>Сохранить изменения</Button>
        <Button onClick={handleCancel}>Отменить занятие</Button>
      </ModalContent>
    </Modal>
  );
};

export default ChangeEventModal;
