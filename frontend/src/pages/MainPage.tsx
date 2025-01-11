import React, { useState } from "react";
import TeacherList from "../components/TeacherList/TeacherList";
import Button from "../components/ui/Button/Button";
import AuthModal from "../components/AuthModal/AuthModal";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const MainPage: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleTestClick = () => {
    navigate("/tests");
  };

  const handlePriceClick = () => {
    navigate("/prices");
  };

  const handleProfileClick = () => {
    if (user?.role === "student") {
      navigate("/student");
    } else if (user?.role === "teacher") {
      navigate("/teacher");
    }
  };

  return (
    <div>
      <h1>Главная страница</h1>
      <Button onClick={user ? handleProfileClick : openAuthModal}>
        {user ? "Личный кабинет" : "Вход"}
      </Button>
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
      <Button onClick={handleTestClick}>Экспресс тест</Button>
      <TeacherList />
      <Button onClick={handlePriceClick}>Цены</Button>
    </div>
  );
};

export default MainPage;
