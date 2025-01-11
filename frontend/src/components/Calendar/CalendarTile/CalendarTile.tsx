import React, { useState } from "react";
import "./CalendarTileStyles.tsx";
import DayModal from "../DayModal/DayModal";
import styled from "styled-components";
import { Lesson } from "../../../types";
import Colors from "../../../AppStyles.tsx";
interface CalendarTileProps {
  date: Date;
  events: Lesson[];
  role: "teacher" | "student";
}
const Tile = styled.div`
  padding: 5px;
  text-align: center;
  cursor: pointer;
  background-color: ${(props) => (props.isWeekend ? Colors.yellow : Colors.white)};
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
  border-radius: 8px;
  border: 2px solid ${Colors.black};
`;

const CalendarTile: React.FC<CalendarTileProps> = ({ date, events, role }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dayName = date.toLocaleString("default", { weekday: "short" });
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;

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
      {events.map((event) => (
        <LessonContainer key={event.id}>
          {event.title} {role === "student" ? "Преподаватель" : "Ученик"}
        </LessonContainer>
      ))}
      <DayModal
        isOpen={isModalOpen}
        onClose={closeModal}
        date={date}
        events={events}
        role={role}
      />
    </Tile>
  );
};

export default CalendarTile;
