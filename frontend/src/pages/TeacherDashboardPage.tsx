import React, { useState } from "react";
import Calendar from "../components/Calendar/Calendar";
import UserList from "../components/UserList/UserList";
import ProfileSection from "../components/ProfileSection/ProfileSection";
import TestSection from "../components/TestSection/TestSection";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ActionButton from "../components/ui/ActionButton/ActionButton";

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
  const { user, login } = useAuth();
  const [isProfileFilled, setIsProfileFilled] = useState(false);
  const navigate = useNavigate();
  if (!user) {
    login({
      id: "2",
      name: "Jane Smith",
      role: "teacher",
      status: "преподает",
      age: 35,
      experience: 10,
      description: "опытный преподаватель",
    });
  }
  const handleSaveProfile = (data: any) => {
    console.log(data);
    // Запрос на сохранение данных
  };
  const handleNavigateToMain = () => {
    navigate("/");
  };
  const handleProfileFilled = (isFilled: boolean) => {
    setIsProfileFilled(isFilled);
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
            userRole="teacher"
            onSave={handleSaveProfile}
            onProfileFilled={handleProfileFilled}
            isFilled={isProfileFilled}
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
