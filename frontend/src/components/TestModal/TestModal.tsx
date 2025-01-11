import React, { useState } from "react";
import Modal from "../ui/Modal/Modal";
import styled from "styled-components";
import Button from "../ui/Button/Button";
import { useNavigate } from "react-router-dom";

interface TestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContent = styled.div`
  padding: 20px;
  background: white;
  border-radius: 8px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const TestModal: React.FC<TestModalProps> = ({ isOpen, onClose }) => {
  const [grade, setGrade] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTopics = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setTopics(selectedTopics);
  };

  const handleStartTest = () => {
    // Logic to start test with the chosen topics. Should be a unique id of test
    // In our case I redirect to first test
    navigate(`/tests/1`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <h2>Экспресс тест</h2>
        <label htmlFor="grade">Класс обучения</label>
        <Input
          type="number"
          id="grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
        <label htmlFor="topics">Темы</label>
        <Select
          id="topics"
          multiple
          value={topics}
          onChange={handleTopicChange}
        >
          <option value="math">Математика</option>
          <option value="biology">Биология</option>
          <option value="physics">Физика</option>
          <option value="chemistry">Химия</option>
        </Select>
        <Button onClick={handleStartTest}>Перейти к тесту</Button>
      </ModalContent>
    </Modal>
  );
};

export default TestModal;
