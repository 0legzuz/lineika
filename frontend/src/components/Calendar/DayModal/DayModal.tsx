import React, { useState } from "react";
import Modal from "../../ui/Modal/Modal";
import "./DayModalStyles.tsx";
import styled from "styled-components";
import { Lesson, User } from "../../../types";
import AddEventModal from "../AddEventModal/AddEventModal";
import EventModal from "../EventModal/EventModal";
import ActionButton from "../../ui/ActionButton/ActionButton";
import Colors from "../../../AppStyles";

interface DayModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  events: LessonWithFormattedTime[];
  role: "teacher" | "student";
  onLessonAdded: () => void;
  teacherId?: string;
  users: { [id: string]: User };
  userId?: string; // Для передачи идентификатора ученика
}

const EventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EventItem = styled.div`
  border: 2px solid ${Colors.black};
  padding: 10px;
  background-color: ${Colors.beige};
  border-radius: 8px;
  -webkit-box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  -moz-box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  cursor: pointer;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalHeaderTitle = styled.h2`
  font-family: "Raleway", sans-serif;
  font-weight: 700;
`;

interface LessonWithFormattedTime extends Lesson {
  formattedStartTime: string;
  formattedEndTime: string;
}

const DayModal: React.FC<DayModalProps> = ({
  isOpen,
  onClose,
  date,
  events,
  role,
  onLessonAdded,
  teacherId,
  users,
  userId,
}) => {
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Lesson | null>(null);
  console.log(userId);
  

  const openAddEventModal = () => {
    setIsAddEventModalOpen(true);
  };

  const closeAddEventModal = () => {
    setIsAddEventModalOpen(false);
  };
  const openEventModal = (event: Lesson) => {
    setSelectedEvent(event);
  };
  const closeEventModal = () => {
    setSelectedEvent(null);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Header>
        <ModalHeaderTitle>
          {date.toLocaleString("default", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </ModalHeaderTitle>
      </Header>
      <EventList>
        {events.map((event) => {
          const userIdForEvent =
            role === "student" ? event.teacherid : event.studentid;
          const user = users[userIdForEvent];
          return (
            <EventItem key={event.id} onClick={() => openEventModal(event)}>
              {event.title}
              <br />
              {user ? user.name : "Загрузка..."}
              <br />
              {user
                ? `${event.formattedStartTime}-${event.formattedEndTime}`
                : "Загрузка..."}
            </EventItem>
          );
        })}
      </EventList>
      <ActionButton
        textButton={
          role === "student" ? "Попросить занятие" : "Добавить занятие"
        }
        onClick={openAddEventModal}
      />
      <AddEventModal
        isOpen={isAddEventModalOpen}
        onClose={closeAddEventModal}
        date={date}
        role={role}
        onLessonAdded={onLessonAdded}
        teacherId={teacherId}
        userId={userId}
      />
      {selectedEvent && (
        <EventModal
          isOpen={!!selectedEvent}
          onClose={closeEventModal}
          event={selectedEvent}
          role={role}
        />
      )}
    </Modal>
  );
};

export default DayModal;
