import React, { useState } from "react";
import Modal from "../ui/Modal/Modal";
import ActionButton from "../ui/ActionButton/ActionButton";
import styled from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import Input from "../ui/Input/Input";
import Slider from "../ui/Slider/Slider";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContent = styled.div`
  padding: 20px;
  background: white;
  border-radius: 8px;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
`;

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistration, setIsRegistration] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const { login: authLogin } = useAuth();

  const handleToggleRegistration = () => {
    setIsRegistration(!isRegistration);
  };

  const handleAuth = async () => {
    const user = await api.login(login, password);
    if (user) {
      authLogin(user);
      onClose();
    }
  };
  const handleRegistration = async () => {
    // Заглушка для регистрации, не забыть поменять на реальный запрос
    authLogin({
      id: crypto.randomUUID(),
      name: login,
      role: isTeacher ? "teacher" : "student",
      status: "новый",
    });
    onClose();
  };

  const handleToggleRole = () => {
    setIsTeacher(!isTeacher);
  };
  if (!isOpen) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <h2>{isRegistration ? "Регистрация" : "Вход"}</h2>
        <RadioGroup>
          <Slider
            labelOn="Регистрация"
            labelOff="Вход"
            isOn={isRegistration}
            onToggle={handleToggleRegistration}
            variant="orange"
          />
        </RadioGroup>
        {isRegistration && (
          <RadioGroup>
            <Slider
              labelOn="Преподаватель"
              labelOff="Ученик"
              isOn={isTeacher}
              onToggle={handleToggleRole}
              variant="orange"
            />
          </RadioGroup>
        )}
        <label htmlFor="login">Логин</label>
        <Input
          placeholder="Введите логин"
          type="text"
          id="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />

        <label htmlFor="password">Пароль</label>
        <Input
          placeholder="Введите пароль"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isRegistration ? (
          <ActionButton
            textButton="Зарегистрироваться"
            onClick={handleRegistration}
            variant="orange"
          />
        ) : (
          <ActionButton
            textButton="Войти"
            onClick={handleAuth}
            variant="orange"
          />
        )}
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
