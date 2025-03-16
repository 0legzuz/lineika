import React, { useState } from "react";
import styled from "styled-components";
import { User } from "../../types";
import Colors from "../../AppStyles.tsx";
import Modal from "../ui/Modal/Modal";
import { api } from "../../services/api";

interface UserModalProps {
  user: User;
  onClose: () => void;
  // Новый пропс для контроля отображения кнопки "Добавить преподавателя"
  showAddButton?: boolean;
}

const ModalContent = styled.div`
  background: ${Colors.white};
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90vw;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const ModalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  background-color: ${Colors.mint};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 8px;
  border: 2px solid ${Colors.black};
  box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  text-align: center;
  margin-top: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const StyledLabel = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
  font-size: 20px;
  font-family: "Raleway", sans-serif;
  margin-left: 8px;
`;

const AddButton = styled.button`
  background-color: ${Colors.blue};
  color: ${Colors.white};
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
`;

const formatDate = (dateString: string | null): string => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  } catch (e) {
    return "";
  }
};

const getGenderTranslation = (gender: string | null): string => {
  if (!gender) return "Не указан";
  if (gender === "male") return "Мужской";
  if (gender === "female") return "Женский";
  return "Другой";
};

const calculateAge = (birthdate: string | null): number | string => {
  if (!birthdate) return "Не указан";
  try {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  } catch (e) {
    return "Не указан";
  }
};

const translateTimezoneToMSK = (timezone: string | null): string => {
  if (!timezone) return "Не указан";
  try {
    const offset = parseInt(timezone.replace("UTC", ""));
    const mskOffset = 3;
    const diff = offset + mskOffset;
    return `МСК${diff >= 0 ? "+" : ""}${diff}`;
  } catch (e) {
    return "Не указан";
  }
};

const UserModal: React.FC<UserModalProps> = ({
  user,
  onClose,
  showAddButton,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddTeacher = async () => {
    try {
      setIsAdding(true);
      // Получаем данные пользователя из localStorage
      const userData = localStorage.getItem("user");
      if (!userData) {
        setErrorMessage("Информация о пользователе не найдена");
        setIsAdding(false);
        return;
      }
      // Парсим данные и получаем идентификатор ученика
      const student = JSON.parse(userData);
      const studentId = student.id;
      await api.addTeacherRelation(studentId, user.id);
      alert("Преподаватель успешно добавлен");
      onClose();
    } catch (error: any) {
      setErrorMessage("Ошибка при добавлении преподавателя");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>{user.name}</h2>
        <ImageContainer>
          {user.photo && !imageError ? (
            <Image
              src={user.photo}
              alt={user.name}
              onError={() => setImageError(true)}
            />
          ) : (
            <StyledLabel>Фото не добавлено</StyledLabel>
          )}
        </ImageContainer>
        <ModalInfo>
          {user.description && <p>Описание: {user.description}</p>}
          {user.phone && <p>Телефон: {user.phone}</p>}
          {user.email && <p>Email: {user.email}</p>}
          {user.birthdate && <p>Дата рождения: {formatDate(user.birthdate)}</p>}
          {user.birthdate && (
            <p>Возраст (лет): {calculateAge(user.birthdate)}</p>
          )}
          <p>Пол: {getGenderTranslation(user.gender)}</p>
          <p>Статус: {user.status}</p>
          <p>Часовой пояс: {translateTimezoneToMSK(user.timezone)}</p>
          {user.class && <p>Класс: {user.class}</p>}
          {user.availableTimes && (
            <p>Доступное время: {user.availableTimes.join(", ")}</p>
          )}
        </ModalInfo>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {/* Кнопка "Добавить преподавателя" показывается только если showAddButton === true */}
        {showAddButton && (
          <AddButton onClick={handleAddTeacher} disabled={isAdding}>
            {isAdding ? "Добавление..." : "Добавить преподавателя"}
          </AddButton>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
