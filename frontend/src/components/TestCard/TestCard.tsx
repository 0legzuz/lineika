import React, { useState } from "react";
import "./TestCardStyles.tsx";
import styled from "styled-components";
import { Test } from "../../types";
import Colors from "../../AppStyles.tsx";
import { useNavigate } from "react-router-dom";
import TestEditor from "../TestEditor/TestEditor";
import Modal from "../ui/Modal/Modal";
import { api } from "../../services/api";

interface TestCardProps {
  test: Test;
  role: "teacher" | "student" | "moderator";
  userId: string;
}

const Card = styled.div`
  padding: 10px;
  text-align: center;
  cursor: pointer;
  width: 200px;
  margin: 5px;
  border: 2px solid ${Colors.black};
  border-radius: 8px;
  -webkit-box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  -moz-box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  cursor: pointer;
`;

const CardInfo = styled.div`
  text-align: left;
  text-wrap: wrap;
  font-family: "Raleway", sans-serif;
`;

const CardInfoHeader = styled.p`
  font-weight: 600;
  font-family: "Raleway", sans-serif;
`;
const TopicContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const TopicBox = styled.div`
  border: 1px solid ${Colors.black};
  padding: 5px;
  border-radius: 4px;
`;

const TestCard: React.FC<TestCardProps> = ({ test, role, userId }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const handleTestClick = () => {
    if (role === "student") {
      navigate(`/tests/${test.id}`);
    } else if (role === "teacher" || role === "moderator") {
      setIsEditing(true);
    }
  };
  const handleCloseEditor = () => {
    setIsEditing(false);
  };
  const handleSaveTest = async (data: Test) => {
    await api.addTest(data);
    setIsEditing(false);
  };

  return (
    <>
      <Card onClick={handleTestClick}>
        <h3>{test.title}</h3>
        <CardInfo>
          <CardInfoHeader>Количество вопросов:</CardInfoHeader>
          <p>{test.questions.length}</p>
          <CardInfoHeader>Темы:</CardInfoHeader>
          <TopicContainer>
            {test.topics.map((topic) => (
              <TopicBox key={topic}>{topic}</TopicBox>
            ))}
          </TopicContainer>
        </CardInfo>
      </Card>
      {isEditing && (
        <Modal isOpen={isEditing} onClose={handleCloseEditor}>
          <TestEditor
            onClose={handleCloseEditor}
            test={test}
            onSave={handleSaveTest}
          />
        </Modal>
      )}
    </>
  );
};

export default TestCard;
