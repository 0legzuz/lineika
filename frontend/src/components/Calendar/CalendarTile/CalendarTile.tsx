// CalendarTile.tsx
import React, { useState, useEffect, useMemo } from "react";
import "./CalendarTileStyles.tsx";
import DayModal from "../DayModal/DayModal";
import styled from "styled-components";
import { Lesson, User } from "../../../types";
import Colors from "../../../AppStyles.tsx";

interface CalendarTileProps {
  date: Date;
  events: Lesson[];
  role: "teacher" | "student";
  onLessonAdded: () => void;
  teacherId?: string;
  users: { [id: string]: User };
}

const Tile = styled.div`
  padding: 6px;
  text-align: center;
  cursor: pointer;
  background-color: ${(props) =>
    props.isWeekend ? Colors.yellow : Colors.white};
  border-radius: 8px;
  border: 2px solid ${Colors.black};
  -webkit-box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  -moz-box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  margin: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  font-weight: 500;
  font-family: "MontSemiBold", sans-serif;
`;

const LessonContainer = styled.div`
  padding: 5px;
  border-radius: 5px;
  border: 2px solid ${Colors.black};
  background-color: ${Colors.beige};
`;

// Helper function to format time
const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

interface LessonWithFormattedTime extends Lesson {
  formattedStartTime: string;
  formattedEndTime: string;
}

const CalendarTile: React.FC<CalendarTileProps> = ({
  date,
  events,
  role,
  onLessonAdded,
  teacherId,
  users,
  userId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dayName = date.toLocaleString("default", { weekday: "short" });
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;

  const eventsWithFormattedTime: LessonWithFormattedTime[] = useMemo(() => {
    return events.map((event) => {
      return {
        ...event,
        formattedStartTime: formatTime(event.starttime),
        formattedEndTime: formatTime(event.endtime),
      };
    });
  }, [events]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Tile onClick={openModal} isWeekend={isWeekend}>
      <div>{date.getDate()}</div>
      <div>{dayName}</div>
      {eventsWithFormattedTime.map((event) => {
        const userId = role === "student" ? event.teacherid : event.studentid;
        const user = users[userId];
        return (
          <LessonContainer key={event.id}>
            Тема:
            <br /> {user ? `${event.title}` : "Загрузка..."}
            <br />
            Имя: <br />
            {user ? `${user.name}` : "Загрузка..."}
            <br />
            Время: <br />
            {user
              ? `${event.formattedStartTime}-${event.formattedEndTime}`
              : "Загрузка..."}
          </LessonContainer>
        );
      })}
      <DayModal
        isOpen={isModalOpen}
        onClose={closeModal}
        date={date}
        events={eventsWithFormattedTime}
        role={role}
        onLessonAdded={onLessonAdded}
        teacherId={teacherId}
        users={users}
        userId={userId}
      />
    </Tile>
  );
};

export default CalendarTile;
