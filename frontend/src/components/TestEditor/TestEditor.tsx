import React, { useState } from "react";
import styled from "styled-components";
import { api } from "../../services/api";
import { Test, Question } from "../../types";
import QuestionEditor from "../QuestionEditor/QuestionEditor";
import ActionButton from "../ui/ActionButton/ActionButton";

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;
const Textarea = styled.textarea`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const QuestionEditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  margin-bottom: 10px;
  padding: 10px;
`;
interface TestEditorProps {
  onClose: () => void;
  test?: Test;
  onSave: (data: Test) => void;
}

const TestEditor: React.FC<TestEditorProps> = ({ onClose, test, onSave }) => {
  const [testTitle, setTestTitle] = useState(test?.title || "");
  const [testTopics, setTestTopics] = useState(test?.topics?.join(",") || "");
  const [questions, setQuestions] = useState<Question[]>(test?.questions || []);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);

  const handleAddQuestion = () => {
    setIsAddingQuestion(true);
  };
  const handleSaveQuestion = (question: any) => {
    setQuestions([...questions, question]);
    setIsAddingQuestion(false);
  };
  const handleCancelQuestion = () => {
    setIsAddingQuestion(false);
  };
  const handleSaveTest = async () => {
    const newTest = {
      id: test?.id || crypto.randomUUID(),
      title: testTitle,
      topics: testTopics.split(",").map((topic) => topic.trim()),
      questions,
      status: test?.status,
    } as Test;
    onSave(newTest);
    onClose();
  };

  return (
    <Container>
      <h2>{test ? "Редактировать тест" : "Создать тест"}</h2>
      <label>Название теста:</label>
      <Input
        type="text"
        value={testTitle}
        onChange={(e) => setTestTitle(e.target.value)}
      />

      <label>Темы (через запятую):</label>
      <Input
        type="text"
        value={testTopics}
        onChange={(e) => setTestTopics(e.target.value)}
      />
      <QuestionList>
        {questions.map((question, index) => {
          return (
            <QuestionEditorContainer key={crypto.randomUUID()}>
              <h3>Вопрос #{index + 1}</h3>
              <p>{question.text}</p>
            </QuestionEditorContainer>
          );
        })}
      </QuestionList>
      {!isAddingQuestion && (
        <ActionButton
          textButton="Добавить вопрос"
          onClick={handleAddQuestion}
        />
      )}
      {isAddingQuestion && (
        <QuestionEditor
          onSave={handleSaveQuestion}
          onCancel={handleCancelQuestion}
        />
      )}
      <ActionButton textButton="Сохранить тест" onClick={handleSaveTest} />
      <ActionButton textButton="Отмена" onClick={onClose} />
    </Container>
  );
};

export default TestEditor;
