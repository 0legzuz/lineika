import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { User } from "../types";
import styled from "styled-components";
import UserCard from "../components/UserCard/UserCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Header = styled.h2`
  font-family: "Raleway", sans-serif;
  font-weight: 700;
  margin-top: 50px;
  font-size: 25px;
  text-align: center;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;
`;

const BackButton = styled.button`
  margin: 20px;
  padding: 10px 20px;
  font-size: 16px;
  font-family: "Raleway", sans-serif;
  cursor: pointer;
  border: none;
  background-color: #4caf50;
  color: white;
  border-radius: 4px;
`;

const TeachersPage: React.FC = () => {
  const [teachers, setTeachers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Определяем текущего пользователя из localStorage
  const currentUserData = localStorage.getItem("user");
  let isStudent = false;
  if (currentUserData) {
    const currentUser = JSON.parse(currentUserData);
    isStudent = currentUser.role === "student";
  }

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await api.getTeachers();
        setTeachers(res.teachers);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load teachers", error);
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <BackButton onClick={handleBack}>Назад</BackButton>
      <Header>Все преподаватели</Header>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <CardsGrid>
          {teachers.map((teacher) => (
            // Передаём showAddButton только если текущий пользователь – ученик
            <UserCard
              key={teacher.id}
              user={teacher}
              showAddButton={isStudent}
            />
          ))}
        </CardsGrid>
      )}
    </Container>
  );
};

export default TeachersPage;
