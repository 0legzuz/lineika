import React from "react";
import "./UserCardStyles.tsx";
import styled from "styled-components";
import { User } from "../../types";
import Colors from "../../AppStyles.tsx";

interface UserCardProps {
  user: User;
}
const Card = styled.div`
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
`;

const CardInfo = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  height: fit-content;
`;

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Card>
      <img src={user.photo || "/no-photo.png"} alt={user.name} width="100" />
      <CardInfo>
        <h3>{user.name}</h3>
        <p>Статус: {user.status}</p>
      </CardInfo>
    </Card>
  );
};

export default UserCard;
