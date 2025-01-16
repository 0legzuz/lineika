import React, { useState, useEffect } from "react";
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
  const { user } = useAuth();
  const [isProfileFilled, setIsProfileFilled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const storedIsProfileFilled = localStorage.getItem("isProfileFilled");
    if (storedIsProfileFilled) {
      setIsProfileFilled(storedIsProfileFilled === "true");
    }
  }, []);

  const handleNavigateToMain = () => {
    navigate("/");
  };
  const handleProfileFilled = (isFilled: boolean) => {
    setIsProfileFilled(isFilled);
    localStorage.setItem("isProfileFilled", String(isFilled));
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
            onProfileFilled={handleProfileFilled}
            isFilled={isProfileFilled}
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
