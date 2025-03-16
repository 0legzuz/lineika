import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "../UserCard/UserCard";
import { api } from "../../services/api";
import { GetStudentsResponse, User } from "../../types";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  width: 100%;
`;

const Header = styled.h2`
  text-align: center;
  font-family: "Raleway", sans-serif;
  font-weight: 700;
  margin: 0;
  font-size: 25px;
  margin-top: 50px;
`;

const Button = styled.button`
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 16px;
  font-family: "Raleway", sans-serif;
  cursor: pointer;
  border: none;
  background-color: #4caf50;
  color: white;
  border-radius: 4px;
`;

interface UserListProps {
  userRole: "student" | "teacher";
  userId: string;
}

const UserList: React.FC<UserListProps> = ({ userRole, userId }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      try {
        if (userRole === "student") {
          const res = await api.getStudentTeachers(userId);
          setUsers(res.teachers as any);
        } else {
          const res = await api.getTeacherStudents(userId);
          setUsers(res.students as any);
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to load users", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, [userId, userRole]);

  const handleViewAllTeachers = () => {
    navigate("/teachers");
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Container>
          <Header>
            {userRole === "teacher" ? "Ваши ученики:" : "Ваши преподаватели:"}
          </Header>
          {userRole === "student" && (
            <Button onClick={handleViewAllTeachers}>
              Посмотреть всех преподавателей
            </Button>
          )}
          {users.map((user) => (
            // Если роль teacher, передаём teacherId равным userId текущего преподавателя
            <UserCard
              key={user.id}
              user={user}
              teacherId={userRole === "teacher" ? userId : undefined}
            />
          ))}
        </Container>
      )}
    </>
  );
};

export default UserList;
