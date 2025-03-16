import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { User } from "../../types";
import Colors from "../../AppStyles.tsx";
import UserModal from "../UserModal.tsx/UserModal.tsx";
import { api } from "../../services/api";

interface UserCardProps {
  user: User & { relationStatus?: string };
  teacherId?: string; // Передаём идентификатор преподавателя, если карточка для teacher view
}

interface CardProps {
  isCooperate?: boolean;
}

const Card = styled.div<CardProps>`
  padding: 10px;
  text-align: center;
  cursor: pointer;
  width: 200px;
  margin: 5px;
  border-radius: 10px;
  border: 2px solid ${Colors.black};
  -webkit-box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  -moz-box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  font-family: "Raleway", sans-serif;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${(props) =>
    props.isCooperate ? Colors.green || "#d4edda" : Colors.white};
`;

const CardInfo = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  height: fit-content;
`;

const AcceptButton = styled.button`
  background-color: ${Colors.blue};
  color: ${Colors.white};
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 5px;
`;

const UserCard: React.FC<UserCardProps> = ({ user, teacherId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cachedImage, setCachedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const isImageLoading = useRef(false);
  const [relationStatus, setRelationStatus] = useState(user.relationStatus);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (user.photo && !isImageLoading.current) {
      isImageLoading.current = true;
      const img = new Image();
      img.src = user.photo;
      img.onload = () => {
        setCachedImage(user.photo);
        isImageLoading.current = false;
      };
      img.onerror = () => {
        setCachedImage(null);
        isImageLoading.current = false;
      };
    } else if (!user.photo) {
      setCachedImage(null);
    }
  }, [user.photo]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAccept = async (e: React.MouseEvent) => {
    e.stopPropagation(); // предотвращаем открытие модального окна
    if (!teacherId) return;
    try {
      setLoading(true);
      const updatedRelation = await api.acceptStudentRelation(
        teacherId,
        user.id
      );
      setRelationStatus(updatedRelation.status);
      alert("Ученик успешно принят!");
    } catch (error) {
      console.error("Ошибка при подтверждении ученика", error);
      alert("Ошибка при подтверждении ученика");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card
        onClick={handleCardClick}
        isCooperate={relationStatus === "cooperate"}
      >
        <img src={cachedImage || "/no-photo.png"} alt={user.name} width="100" />
        <CardInfo>
          <h3>{user.name}</h3>
          <p>Статус: {user.status}</p>
          {relationStatus && <p>Связь: {relationStatus}</p>}
          {relationStatus === "pending" && teacherId && (
            <AcceptButton onClick={handleAccept} disabled={loading}>
              {loading ? "Принятие..." : "Принять ученика"}
            </AcceptButton>
          )}
        </CardInfo>
      </Card>
      {isModalOpen && (
        <UserModal
          user={user}
          onClose={handleCloseModal}
          cachedImage={cachedImage}
        />
      )}
    </>
  );
};

export default UserCard;
