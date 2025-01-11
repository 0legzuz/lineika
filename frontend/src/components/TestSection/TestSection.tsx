import React, { useState, useEffect } from "react";
import "./TestSectionStyles.tsx";
import styled from "styled-components";
import { api } from "../../services/api";
import { Test } from "../../types";
import TestCard from "../TestCard/TestCard";
import Colors from "../../AppStyles.tsx";
import ActionButton from "../ui/ActionButton/ActionButton.tsx";
import { useNavigate } from "react-router-dom";

const Section = styled.div`
  margin-top: 50px;
  border-radius: 8px;
  font-family: "Raleway", sans-serif;
  width: 100%;
`;

const TestList = styled.div`
  display: flex;
  overflow-x: auto;
  margin: 20px 0;
`;

interface TestSectionProps {
  role: "student" | "teacher" | "moderator";
  userId: string;
}

const TestSection: React.FC<TestSectionProps> = ({ role, userId }) => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    api
      .getTests()
      .then((res) => {
        setTests(res.tests);
        setLoading(false);
      })
      .catch((e) => {
        console.error("Failed to load tests ", e);
        setLoading(false);
      });
  }, []);
  const handleNavigateToTests = () => {
    navigate("/tests");
  };
  return (
    <Section>
      <h2>Тесты и рейтинг учеников:</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <TestList>
          {tests.map((test) => (
            <TestCard key={test.id} test={test} role={role} userId={userId} />
          ))}
        </TestList>
      )}
      {role === "teacher" && (
        <ActionButton
          variant="orange"
          textButton="Перейти к тестам"
          onClick={handleNavigateToTests}
        />
      )}
      {role === "moderator" && (
        <ActionButton
          variant="orange"
          textButton="Перейти к тестам"
          onClick={handleNavigateToTests}
        />
      )}
    </Section>
  );
};

export default TestSection;
