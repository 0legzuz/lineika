import React, { useState, useEffect } from "react";
import Calendar from "../components/Calendar/Calendar";
import UserList from "../components/UserList/UserList";
import ProfileSection from "../components/ProfileSection/ProfileSection";
import TestSection from "../components/TestSection/TestSection";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ActionButton from "../components/ui/ActionButton/ActionButton";
import { api } from "../services/api";
import { User } from "../types";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Raleway", sans-serif;
  width: 100%;
  margin-bottom: 50px;
`;

const TeacherDashboardContainer = styled.div`
  width: 70vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  @media (min-width: 1441px) {
    padding: 40px;
  }
`;

const TeacherDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [isProfileFilled, setIsProfileFilled] = useState(false);
  const navigate = useNavigate();

  // Проверка заполненности профиля при загрузке страницы
  useEffect(() => {
    const checkProfileFilled = async () => {
      if (user) {
        try {
          const response = await api.getUser(user.id);
          const userData = response.user;
          if (userData) {
            const [surnameValue, nameValue, middlenameValue] = (
              userData.name || ""
            ).split(" ");
            const fieldsFilled =
              surnameValue &&
              nameValue &&
              middlenameValue &&
              userData.birthdate &&
              userData.phone &&
              userData.gender &&
              userData.email &&
              userData.timezone;
            setIsProfileFilled(Boolean(fieldsFilled));
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          setIsProfileFilled(false);
        }
      }
    };

    checkProfileFilled();
  }, [user]);

  // Функция, вызываемая после сохранения профиля
  const handleSaveProfile = (updatedData: Partial<User>) => {
    if (
      updatedData.name &&
      updatedData.birthdate &&
      updatedData.phone &&
      updatedData.gender &&
      updatedData.email &&
      updatedData.timezone
    ) {
      setIsProfileFilled(true);
    } else {
      setIsProfileFilled(false);
    }
  };

  const handleNavigateToMain = () => {
    navigate("/");
  };

  return (
    <TeacherDashboardContainer>
      {user && (
        <>
          <Header>
            <h1>Личный кабинет преподавателя</h1>
            <ActionButton
              textButton="На главную"
              onClick={handleNavigateToMain}
              variant="mint"
            />
          </Header>
          <ProfileSection
            user={user}
            onSave={handleSaveProfile}
            userRole="teacher"
          />
          {isProfileFilled && (
            <>
              <Calendar userId={user.id} role="teacher" />
              <UserList userRole="teacher" userId={user.id} />
              <TestSection role="teacher" userId={user.id} />
            </>
          )}
        </>
      )}
    </TeacherDashboardContainer>
  );
};

export default TeacherDashboardPage;
