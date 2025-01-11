import React, { useState, useEffect } from "react";
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

interface UserListProps {
  userRole: "student" | "teacher";
  userId: string;
}
const UserList: React.FC<UserListProps> = ({ userRole, userId }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      if (userRole === "student") {
        const res = await api.getTeachers();
        const studentTeachers = res.teachers.filter((teacher) => {
          return true; // тут нужно будет добавить фильтрацию по текущему ученику
        });
        setUsers(studentTeachers as any);
      } else {
        const res = await api.getStudents();
        const teachersStudents = res.students.filter((student) => {
          return true; // тут нужно будет добавить фильтрацию по текущему учителю
        });
        setUsers(teachersStudents as any);
      }
      setLoading(false);
    };
    fetchUsers().catch((e) => {
      console.error("Failed to load users", e);
      setLoading(false);
    });
  }, [userId, userRole]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Container>
          <Header>Текущие ученики:</Header>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </Container>
      )}
    </>
  );
};

export default UserList;
