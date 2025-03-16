import React, { useState, useEffect } from "react";
import UserList from "../components/UserList/UserList";
import ProfileSection from "../components/ProfileSection/ProfileSection";
import TestSection from "../components/TestSection/TestSection";
import { useAuth } from "../contexts/AuthContext";
import Calendar from "../components/Calendar/Calendar";
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

const StudentDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [isProfileFilled, setIsProfileFilled] = useState(false);
  const navigate = useNavigate();

  // Проверка заполненности профиля при входе
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

  // Обновление статуса заполненности профиля после сохранения
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
    <div>
      {user && (
        <>
          <Header>
            <h1>Личный кабинет ученика</h1>
            <ActionButton
              textButton="На главную"
              onClick={handleNavigateToMain}
              variant="mint"
            />
          </Header>
          <ProfileSection
            user={user}
            onSave={handleSaveProfile}
            userRole="student"
          />
          {isProfileFilled && (
            <>
              <Calendar userId={user.id} role="student" />
              <UserList userRole="student" userId={user.id} />
              <TestSection role="student" userId={user.id} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default StudentDashboardPage;
