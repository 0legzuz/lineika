import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import { Question } from "../types";
import styled from "styled-components";
import AuthModal from "../components/AuthModal/AuthModal";
import ActionButton from "../components/ui/ActionButton/ActionButton";

const QuestionContainer = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background: #eee;
  border-radius: 5px;
`;
const StyledButton = styled.button`
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
const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
`;

const TestPage: React.FC = () => {
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [testCompleted, setTestCompleted] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    api
      .getTestById(id!)
      .then((res) => {
        setQuestions(res.test.questions);
        setLoading(false);
      })
      .catch((e) => {
        console.error("Failed to load test ", e);
        setLoading(false);
      });
  }, [id]);

  const handleAnswer = (answer: string) => {
    setAnswers([...answers, answer]);
  };
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleOpenAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleSubmit = () => {
    setTestCompleted(true);
  };
  const correctAnswersCount = answers.reduce((acc, answer, index) => {
    if (answer === questions[index].correctAnswer) {
      return acc + 1;
    }
    return acc;
  }, 0);

  if (testCompleted) {
    return (
      <ResultContainer>
        <h2>Тест завершен!</h2>
        <h3>
          Правильных ответов: {correctAnswersCount} из {questions.length}
        </h3>
        <p>
          Отличный результат! Зарегистрируйтесь, чтобы получить доступ ко всем
          нашим материалам и возможностям!
        </p>
        <ActionButton
          textButton="Зарегистрироваться"
          onClick={handleOpenAuthModal}
          variant="orange"
        />
        <AuthModal isOpen={isAuthModalOpen} onClose={handleCloseAuthModal} />
      </ResultContainer>
    );
  }

  return (
    <div>
      <h1>Страница теста</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <QuestionContainer>
          <h2>{questions[currentQuestion].text}</h2>
          {questions[currentQuestion].incorrectAnswers
            .concat(questions[currentQuestion].correctAnswer)
            .sort(() => Math.random() - 0.5)
            .map((answer) => (
              <StyledButton
                onClick={() => handleAnswer(answer)}
                key={crypto.randomUUID()}
              >
                {answer}
              </StyledButton>
            ))}
        </QuestionContainer>
      )}
      <div>
        <ActionButton
          textButton="Назад"
          onClick={previousQuestion}
          variant="mint"
        />
        <ActionButton
          textButton="Вперед"
          onClick={nextQuestion}
          variant="mint"
        />
        <ActionButton
          textButton="Завершить тест"
          onClick={handleSubmit}
          variant="orange"
        />
      </div>
    </div>
  );
};

export default TestPage;
