import React, { useState } from "react";
import styled from "styled-components";

interface QuestionEditorProps {
  onSave: (question: any) => void;
  onCancel: () => void;
}
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
const QuestionEditor: React.FC<QuestionEditorProps> = ({
  onSave,
  onCancel,
}) => {
  const [questionText, setQuestionText] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [incorrectAnswers, setIncorrectAnswers] = useState(["", "", ""]);

  const handleSave = () => {
    const question = {
      text: questionText,
      correctAnswer,
      incorrectAnswers,
    };
    onSave(question);
  };

  const handleIncorrectAnswerChange = (index: number, value: string) => {
    const newIncorrectAnswers = [...incorrectAnswers];
    newIncorrectAnswers[index] = value;
    setIncorrectAnswers(newIncorrectAnswers);
  };
  return (
    <div>
      <label>Вопрос:</label>
      <Textarea
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
      />

      <label>Верный ответ:</label>
      <Input
        type="text"
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
      />

      <label>Неверные ответы:</label>
      {incorrectAnswers.map((answer, index) => (
        <Input
          key={index}
          type="text"
          value={answer}
          onChange={(e) => handleIncorrectAnswerChange(index, e.target.value)}
        />
      ))}
      <Button onClick={handleSave}>Сохранить вопрос</Button>
      <Button onClick={onCancel}>Отмена</Button>
    </div>
  );
};

export default QuestionEditor;
