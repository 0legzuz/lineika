import React, { useState } from "react";
import TestList from "../components/TestList/TestList";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button/Button";
import { useAuth } from "../contexts/AuthContext";

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
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

const TestListPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const availableTopics = [
    "математика",
    "физика",
    "химия",
    "биология",
    "информатика",
  ]; // Примерный список тем

  const handleStartTest = () => {
    // Здесь должна быть логика перехода к конкретному тесту.
    // Пока что просто переходим на страницу теста (например, с ID 1)
    navigate(`/tests/1`);
  };

  const toggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };
  const handleTopicCheck = (topic: string) => {
    return selectedTopics.includes(topic);
  };

  return (
    <div>
      <h1>Страница тестов</h1>
      {!user ? (
        <Form>
          <h2>Пройти экспресс-тест</h2>
          <label htmlFor="class">Класс обучения:</label>
          <Input
            type="number"
            id="class"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          />

          <label htmlFor="topics">Выберите темы:</label>
          <div>
            {availableTopics.map((topic) => (
              <label key={topic}>
                <input
                  type="checkbox"
                  value={topic}
                  checked={handleTopicCheck(topic)}
                  onChange={() => toggleTopic(topic)}
                />{" "}
                {topic}
              </label>
            ))}
          </div>

          <Button onClick={handleStartTest}>Начать тест</Button>
        </Form>
      ) : (
        <TestList />
      )}
    </div>
  );
};

export default TestListPage;
