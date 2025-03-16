import React, { useState, useEffect } from "react";
import Modal from "../../ui/Modal/Modal";
import { api } from "../../../services/api";
import { Lesson, User } from "../../../types";
import styled from "styled-components";

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  role: "teacher" | "student";
  onLessonAdded: () => void;
  teacherId?: string;
  userId?: string; // Идентификатор ученика (для роли "student")
}
const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;
const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: #367c39;
  }
`;
const Select = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: white;
  border-radius: 8px;
`;

const AddEventModal: React.FC<AddEventModalProps> = ({
  isOpen,
  onClose,
  date,
  role,
  onLessonAdded,
  teacherId,
  userId,
}) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isRegular, setIsRegular] = useState(false);
  const [price, setPrice] = useState(100);
  const [topic, setTopic] = useState("");
  const [students, setStudents] = useState<User[]>([]);
  const [studentId, setStudentId] = useState("");

  // Состояния для списка преподавателей (для роли "student")
  const [teachers, setTeachers] = useState<User[]>([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");

  useEffect(() => {
    if (role === "teacher" && teacherId) {
      api
        .getTeacherStudents(teacherId)
        .then((res) => {
          setStudents(res.students);
          if (res.students.length > 0) {
            setStudentId(res.students[0].id);
          }
        })
        .catch((e) => console.error("Failed to load students ", e));
    } else if (role === "teacher" && !teacherId) {
      console.error("teacherId is undefined!");
    }

    if (role === "student") {
      console.log(userId);
      
      api
        .getStudentTeachers(userId)
        .then((res) => {
          setTeachers(res.teachers);
          console.log(res.teachers);

          if (res.teachers.length > 0) {
            setSelectedTeacherId(res.teachers[0].id);
          }
        })
        .catch((e) => console.error("Failed to load teachers", e));
    }
  }, [teacherId, role]);

const handleAddEvent = async () => {
  // Для роли "student" обязательно должен быть передан userId
  if (role === "student" && !userId) {
    console.error("Не передан идентификатор пользователя для роли 'student'.");
    return;
  }

  const start = new Date(date);
  const end = new Date(date);
  const startTimeParts = startTime.split(":");
  const endTimeParts = endTime.split(":");
  start.setHours(parseInt(startTimeParts[0]), parseInt(startTimeParts[1]));
  end.setHours(parseInt(endTimeParts[0]), parseInt(endTimeParts[1]));

  const newLesson = {
    id: crypto.randomUUID(),
    title: topic,
    // Для преподавателя выбирается ученик, а для ученика – используем userId
    studentid: role === "teacher" ? studentId : userId,
    // Для преподавателя используем teacherId, а для ученика — выбранного преподавателя
    teacherid: role === "teacher" ? teacherId : selectedTeacherId,
    startTime: start,
    endTime: end,
    price: parseInt(String(price), 10),
    status: "pending",
  } as Lesson;
  try {
    console.log("handleAddEvent: newLesson:", newLesson);
    await api.addLesson(newLesson);
    onClose();
    onLessonAdded();
    console.log("handleAddEvent: onLessonAdded called");
  } catch (error) {
    console.error("handleAddEvent: Failed to add lesson", error);
  }
};


  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <h2>
          {role === "student" ? "Попросить занятие" : "Добавить занятие"} на{" "}
          {date.toLocaleString("default", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </h2>
        {role === "teacher" && (
          <>
            <label htmlFor="student">Ученик:</label>
            <Select
              id="student"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            >
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </Select>
          </>
        )}
        {role === "student" && (
          <>
            <label htmlFor="teacher">Преподаватель:</label>
            <Select
              id="teacher"
              value={selectedTeacherId}
              onChange={(e) => setSelectedTeacherId(e.target.value)}
            >
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </Select>
          </>
        )}
        <label htmlFor="topic">Тема:</label>
        <Input
          type="text"
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <label htmlFor="price">Стоимость:</label>
        <Input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value, 10))}
        />
        <label htmlFor="startTime">Время начала:</label>
        <Input
          type="time"
          id="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <label htmlFor="endTime">Время окончания:</label>
        <Input
          type="time"
          id="endTime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <label htmlFor="isRegular">Регулярное:</label>
        <input
          type="checkbox"
          id="isRegular"
          checked={isRegular}
          onChange={() => setIsRegular(!isRegular)}
        />
        <Button onClick={handleAddEvent}>Сохранить</Button>
      </ModalContent>
    </Modal>
  );
};

export default AddEventModal;
