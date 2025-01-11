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
}) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isRegular, setIsRegular] = useState(false);
  const [price, setPrice] = useState(100);
  const [topic, setTopic] = useState("");
  const [students, setStudents] = useState<User[]>([]);
  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    if (role === "teacher") {
      api
        .getStudents()
        .then((res) => {
          setStudents(res.students);
          if (res.students.length > 0) {
            setStudentId(res.students[0].id);
          }
        })
        .catch((e) => console.error("Failed to load students ", e));
    }
  }, []);

  const handleAddEvent = () => {
    const start = new Date(date);
    const end = new Date(date);
    const startTimeParts = startTime.split(":");
    const endTimeParts = endTime.split(":");
    start.setHours(parseInt(startTimeParts[0]), parseInt(startTimeParts[1]));
    end.setHours(parseInt(endTimeParts[0]), parseInt(endTimeParts[1]));

    const newLesson = {
      id: crypto.randomUUID(),
      title: topic,
      studentId: role === "student" ? "1" : studentId,
      teacherId: role === "teacher" ? "2" : "1",
      startTime: start,
      endTime: end,
      price: parseInt(String(price), 10),
      status: "pending",
    } as Lesson;
    api.addLesson(newLesson).then(() => {
      onClose();
    });
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <h2>
          Добавить занятие на{" "}
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
          value={isRegular}
          onChange={() => setIsRegular(!isRegular)}
        />
        <Button onClick={handleAddEvent}>Сохранить</Button>
      </ModalContent>
    </Modal>
  );
};

export default AddEventModal;
