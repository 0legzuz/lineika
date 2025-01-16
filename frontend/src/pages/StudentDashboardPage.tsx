import React, { useState, useEffect } from "react";
import UserList from "../components/UserList/UserList";
import ProfileSection from "../components/ProfileSection/ProfileSection";
import TestSection from "../components/TestSection/TestSection";
import { useAuth } from "../contexts/AuthContext";
import Calendar from "../components/Calendar/Calendar";
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

const StudentDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [isProfileFilled, setIsProfileFilled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedIsProfileFilled = localStorage.getItem("isProfileFilled");
    if (storedIsProfileFilled) {
      setIsProfileFilled(storedIsProfileFilled === "true");
    }
  }, []);

  const handleProfileFilled = (isFilled: boolean) => {
    setIsProfileFilled(isFilled);
    localStorage.setItem("isProfileFilled", String(isFilled));
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
            onProfileFilled={handleProfileFilled}
            isFilled={isProfileFilled}
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
