import React from "react";
import Modal from "../../ui/Modal/Modal";
import "./DayModalStyles.tsx";
import styled from "styled-components";
import { Lesson } from "../../../types";
import AddEventModal from "../AddEventModal/AddEventModal";
import EventModal from "../EventModal/EventModal";

interface DayModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  events: Lesson[];
  role: "teacher" | "student";
}
const ModalContent = styled.div`
  padding: 20px;
  background: white;
  border-radius: 8px;
`;
const EventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const EventItem = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  cursor: pointer;
`;
const EventItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const DayModal: React.FC<DayModalProps> = ({
  isOpen,
  onClose,
  date,
  events,
  role,
}) => {
  const [isAddEventModalOpen, setIsAddEventModalOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState<Lesson | null>(null);

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
      <ModalContent>
        <Header>
          <h2>
            {date.toLocaleString("default", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </h2>
          <Button onClick={onClose}>Закрыть</Button>
        </Header>
        <EventList>
          {events.map((event) => (
            <EventItem key={event.id} onClick={() => openEventModal(event)}>
              {event.title} {role === "student" ? "Преподаватель" : "Ученик"}
            </EventItem>
          ))}
        </EventList>
        <Button onClick={openAddEventModal}>Добавить занятие</Button>
        <AddEventModal
          isOpen={isAddEventModalOpen}
          onClose={closeAddEventModal}
          date={date}
          role={role}
        />
        {selectedEvent && (
          <EventModal
            isOpen={!!selectedEvent}
            onClose={closeEventModal}
            event={selectedEvent}
            role={role}
          />
        )}
      </ModalContent>
    </Modal>
  );
};

export default DayModal;
