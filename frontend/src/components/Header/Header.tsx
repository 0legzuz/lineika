import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../../public/images/logo.svg";
import Colors from "../../AppStyles"; // Подключаем ваши глобальные стили
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AuthModal from "../AuthModal/AuthModal";
import ActionButton from "../ui/ActionButton/ActionButton";
const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleBurgerClick = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const handleTestClick = () => {
    navigate("/tests");
  };

  const handleProfileClick = () => {
    if (user?.role === "student") {
      navigate("/student");
    } else if (user?.role === "teacher") {
      navigate("/teacher");
    }
  };

  return (
    <HeaderContainer>
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
      <ButtonsContainer>
        <LogoContainer>
          <Logo src={logo} alt="Логотип" />
        </LogoContainer>
        {/* <Button>О школе</Button> */}
        {/* <Button>Программы</Button> */}
        {!user && <Button onClick={handleTestClick}>Экспресс-тест</Button>}
        <Button onClick={user ? handleProfileClick : openAuthModal}>
          {user ? "Личный кабинет" : "Вход/Регистрация"}
        </Button>
        {user && <Button onClick={handleLogout}>Выйти</Button>}
        {/* <PhoneButton>+7 (999) 999-99-99</PhoneButton> */}
        <BurgerButton onClick={handleBurgerClick} aria-label="Меню">
          <span />
          <span />
          <span />
          <span />
        </BurgerButton>
      </ButtonsContainer>
      {isDropdownOpen && (
        <DropdownMenu>
          {/* <DropdownItem>О школе</DropdownItem> */}
          {/* <DropdownItem>Программы</DropdownItem> */}
          <DropdownItem onClick={handleTestClick}>Экспресс-тест</DropdownItem>
          <DropdownItem onClick={user ? handleProfileClick : openAuthModal}>
            {user ? "Личный кабинет" : "Вход/Регистрация"}
          </DropdownItem>
          {user && <DropdownItem onClick={handleLogout}>Выйти</DropdownItem>}
        </DropdownMenu>
      )}
    </HeaderContainer>
  );
};

export default Header;

// Styled Components

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1530px;
  padding: 8px 0;

  @media (min-width: 769px) {
    font-size: 14px;
  }

  @media (min-width: 1025px) {
    font-size: 16px;
    padding: 10px 10px;
    gap: 15px;
  }

  @media (min-width: 1441px) {
    font-size: 18px;
    padding: 20px 15px;
  }
`;

const Button = styled.button`
  position: relative;
  background: none;
  border: none;
  font-family: "Raleway", sans-serif;
  font-weight: 300;
  font-size: 14px; /* Базовый стиль для мобильных устройств */
  padding: 15px 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  display: none;

  @media (min-width: 769px) {
    font-size: 16px;
    padding: 20px 10px;
    display: flex;
  }

  @media (min-width: 1025px) {
    font-size: 18px;
    padding: 25px 15px;
  }

  @media (min-width: 1441px) {
    font-size: 20px;
    padding: 30px;
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    height: 1px;
    width: 0;
    background-color: ${Colors.black};
    transition: width 0.3s ease;
  }

  &:before {
    top: 0;
    left: 0;
  }

  &:after {
    bottom: 0;
    left: 0;
  }

  &:hover:before,
  &:hover:after {
    width: 100%;
  }

  &:hover {
    font-weight: 600;
  }
`;

const PhoneButton = styled(Button)`
  @media (max-width: 1135px) {
    display: none;
  }
`;

const LogoContainer = styled.div`
  width: 125px; /* Базовое значение */
  padding: 0 20px;
  border-top: 1px solid ${Colors.black};
  border-bottom: 1px solid ${Colors.black};

  @media (min-width: 769px) {
    width: 145px;
  }

  @media (min-width: 1025px) {
    width: 167px; /* Базовое значение */
  }

  @media (min-width: 1441px) {
    width: 185px;
  }
`;

const Logo = styled.img`
  height: auto;
  cursor: pointer;
`;

const BurgerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 38px;
  height: 30px;
  box-sizing: content-box; /* Добавлено, чтобы учитывать padding */

  @media (min-width: 769px) {
    display: none;
  }

  span {
    display: block;
    width: 100%;
    height: 2px;
    background-color: ${Colors.black};
    transition: all 0.3s ease;
  }
`;

// Dropdown Menu Styled Components

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0; /* Adjust as needed */
  background-color: ${Colors.beige};
  border: 1px solid ${Colors.black};
  border-radius: 12px;
  -webkit-box-shadow: 7px 7px 0px 0 rgba(0, 0, 0, 1);
  -moz-box-shadow: 7px 7px 0px 0 rgba(0, 0, 0, 1);
  box-shadow: 7px 7px 0px 0 rgba(0, 0, 0, 1);
  width: 200px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  @media (min-width: 769px) {
    display: none;
  }
`;

const DropdownItem = styled.button`
  background: none;
  border: none;
  padding: 12px 16px;
  text-align: left;
  width: 100%;
  font-family: "Raleway", sans-serif;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${Colors.lightGray};
  }
`;
