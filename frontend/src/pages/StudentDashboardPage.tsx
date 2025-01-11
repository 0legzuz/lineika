import React, { useState } from "react";
import UserList from "../components/UserList/UserList";
import ProfileSection from "../components/ProfileSection/ProfileSection";
import TestSection from "../components/TestSection/TestSection";
import { useAuth } from "../contexts/AuthContext";
import Calendar from "../components/Calendar/Calendar";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StudentDashboardPage: React.FC = () => {
  const { user, login } = useAuth();
  const [isProfileFilled, setIsProfileFilled] = useState(false);
  const navigate = useNavigate();

  if (!user) {
    login({ id: "1", name: "John Doe", role: "student", status: "обучается" });
  }
  const handleSaveProfile = (data: any) => {
    console.log(data);
    // Запрос на сохранение данных
  };
  const handleProfileFilled = (isFilled: boolean) => {
    setIsProfileFilled(isFilled);
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
            <button onClick={handleNavigateToMain}>На главную</button>
          </Header>

          <ProfileSection
            user={user}
            onSave={handleSaveProfile}
            onProfileFilled={handleProfileFilled}
            isFilled={isProfileFilled}
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
