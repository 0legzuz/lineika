import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import styled from "styled-components";
import AuthModal from "../components/AuthModal/AuthModal";
import ActionButton from "../components/ui/ActionButton/ActionButton";
import { QuestionWithAllAnswers } from "../types";
import { AuthContext } from "../contexts/AuthContext";

const QuestionContainer = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background: #eee;
  border-radius: 5px;
`;

const StyledButton = styled.button<{ isSelected: boolean }>`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
  border: ${(props) => (props.isSelected ? "2px solid #007bff" : "none")};
  box-shadow: ${(props) => (props.isSelected ? "0px 0px 5px #007bff" : "none")};

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
const NavigationContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

interface TestApiResponse {
  test: {
    id: string;
    title: string;
    topics: string[];
    questions: string;
    status: string;
    createdat: string;
    updatedat: string;
    creatorid: string;
    modifierid: string;
  };
}
interface CheckTestResponse {
  correctAnswersCount: number;
}

const TestPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<QuestionWithAllAnswers[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [testCompleted, setTestCompleted] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number | null>(
    null
  );
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    api
      .getTestById(id!)
      .then((res: TestApiResponse) => {
        try {
          const parsedQuestions = JSON.parse(
            res.test.questions
          ) as QuestionWithAllAnswers[];
          setQuestions(parsedQuestions);
        } catch (error) {
          console.error("Error parsing questions:", error);
          setQuestions([]);
        } finally {
          setLoading(false);
        }
      })
      .catch((e) => {
        console.error("Failed to load test ", e);
        setLoading(false);
        setQuestions([]);
      });
  }, [id]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestion] = answer;
      return newAnswers;
    });
  };
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    }
  };
  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
    }
  };

  const handleOpenAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleSubmit = async () => {
    setTestCompleted(true);
    setSelectedAnswer(null);

    try {
      setLoading(true);
      const userId = user ? user.id : null;
      const res = await api.checkTest(id!, answers, userId);
      setCorrectAnswersCount(res.correctAnswersCount);
      setLoading(false);
    } catch (error) {
      console.error("Error submitting test", error);
      setCorrectAnswersCount(0);
    }
  };

  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === questions.length - 1;
  //Method to go to the user profile
  const goToUserProfile = () => {
    navigate(`/student`);
  };
  //Method to go to the tests
  const goToTests = () => {
    navigate(`/tests`);
  };

  if (testCompleted) {
    return (
      <ResultContainer>
        <h2>Тест завершен!</h2>
        {loading ? (
          <div>Загрузка...</div>
        ) : (
          <>
            {correctAnswersCount !== null && (
              <>
                <h3>
                  Правильных ответов: {correctAnswersCount} из{" "}
                  {questions.length}
                </h3>
                {/* Conditional message based on user login status */}
                {user ? (
                  <>
                    <p>Отличный результат!</p>
                    <ActionButton
                      textButton="В профиль"
                      onClick={goToUserProfile}
                      variant="orange"
                    />
                    <ActionButton
                      textButton="К тестам"
                      onClick={goToTests}
                      variant="orange"
                    />
                  </>
                ) : (
                  <>
                    <p>
                      Отличный результат! Зарегистрируйтесь, чтобы получить
                      доступ ко всем нашим материалам и возможностям!
                    </p>
                    <ActionButton
                      textButton="Зарегистрироваться"
                      onClick={handleOpenAuthModal}
                      variant="orange"
                    />
                  </>
                )}
              </>
            )}
          </>
        )}

        <AuthModal isOpen={isAuthModalOpen} onClose={handleCloseAuthModal} />
      </ResultContainer>
    );
  }

  return (
    <div>
      <h1>Страница теста</h1>
      {loading ? (
        <div>Загрузка...</div>
      ) : questions.length === 0 ? (
        <div>Тест пустой.</div>
      ) : (
        <QuestionContainer>
          <p>
            Вопрос {currentQuestion + 1} из {questions.length}
          </p>
          <h2>{questions[currentQuestion].text}</h2>
          {questions.length > 0 &&
            questions[currentQuestion].answers.map((answer) => (
              <StyledButton
                onClick={() => handleAnswer(answer)}
                key={crypto.randomUUID()}
                isSelected={selectedAnswer === answer}
              >
                {answer}
              </StyledButton>
            ))}
        </QuestionContainer>
      )}
      <NavigationContainer>
        {!isFirstQuestion && (
          <ActionButton
            textButton="Назад"
            onClick={previousQuestion}
            variant="mint"
          />
        )}
        {!isLastQuestion && (
          <ActionButton
            textButton="Вперед"
            onClick={nextQuestion}
            variant="mint"
          />
        )}
        <ActionButton
          textButton="Завершить тест"
          onClick={handleSubmit}
          variant="orange"
        />
      </NavigationContainer>
    </div>
  );
};

export default TestPage;
