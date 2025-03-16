import React, { useState, useEffect } from "react";
import { CalendarDay, Lesson, User } from "../../types";
import { api } from "../../services/api";
import CalendarTile from "./CalendarTile/CalendarTile";
import "./CalendarStyles.tsx";
import styled from "styled-components";
import Colors from "../../AppStyles.tsx";

interface CalendarProps {
  userId: string;
  role: "teacher" | "student";
}

const CalendarBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
`;

const CalendarHeader = styled.div`
  display: flex;
  width: 100%;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  border: 2px solid ${Colors.black};
  -webkit-box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  -moz-box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  padding: 10px;
  background-color: ${Colors.mint};
  margin-top: 50px;
`;

const CalendarYear = styled.div`
  font-size: 20px;
  font-weight: 500;
  font-family: "MontSemiBold", sans-serif;
`;

const YearButton = styled.div`
  font-size: 20px;
  font-weight: 500;
  padding: 0 10px;
  font-family: "MontSemiBold", sans-serif;
  cursor: pointer;
`;

interface UserCache {
  [id: string]: User;
}

const Calendar: React.FC<CalendarProps> = ({ userId, role }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [teacherId, setTeacherId] = useState<string | undefined>(undefined);
  const [users, setUsers] = useState<UserCache>({});

  const getDaysInMonth = (date: Date) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const daysInMonth = [];
    // Получаем день недели первого числа месяца (0 - воскресенье, 1 - понедельник и т.д.)
    const firstDayOfWeek = firstDayOfMonth.getDay();
    // Добавляем пустые плитки перед первым днем месяца, если он не понедельник
    for (let i = 1; i < firstDayOfWeek; i++) {
      daysInMonth.push(null);
    }
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      daysInMonth.push(new Date(date.getFullYear(), date.getMonth(), i));
    }
    return daysInMonth;
  };

  const refreshCalendar = () => {
    setLoading(true);
    fetchCalendarData();
  };

  const fetchCalendarData = async () => {
    console.log(userId);

    try {
      const calendarResponse = await api.getCalendar(userId, role);
      setCalendarDays(calendarResponse.calendarDays);

      const userIds = new Set<string>();
      calendarResponse.calendarDays.forEach((day) => {
        day.events.forEach((event) => {
          if (role === "student") {
            if (event.teacherid) userIds.add(event.teacherid);
          } else {
            if (event.studentid) userIds.add(event.studentid);
          }
        });
      });

      const usersData: UserCache = {};
      for (const id of userIds) {
        const response = await api.getUser(id);
        if (response.user) {
          usersData[id] = response.user;
        }
      }
      setUsers(usersData);

      if (role === "teacher") {
        const userResponse = await api.getUser(userId);
        setTeacherId(userResponse?.user?.id);
      }
      setLoading(false);
    } catch (e) {
      console.error("Failed to load calendar data or user data", e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalendarData();
  }, [userId, currentDate, role]);

  const getDayEvents = (date: Date): Lesson[] => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    return (
      calendarDays.find((day) => {
        const dayDate = new Date(day.date);
        dayDate.setHours(0, 0, 0, 0);
        return dayDate.getTime() === startOfDay.getTime();
      })?.events || []
    );
  };
  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };
  const renderCalendarTiles = () => {
    console.log(userId);

    const days = getDaysInMonth(currentDate);
    return days.map((date, index) =>
      date ? (
        <CalendarTile
          key={date.toISOString()}
          date={date}
          events={getDayEvents(date)}
          role={role}
          onLessonAdded={refreshCalendar}
          teacherId={teacherId}
          users={users}
          userId={userId}
        />
      ) : (
        <div key={index}></div>
      )
    );
  };
  return (
    <CalendarBox>
      <CalendarHeader>
        <YearButton onClick={handlePrevMonth}>← </YearButton>
        <CalendarYear>
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </CalendarYear>
        <YearButton onClick={handleNextMonth}>→</YearButton>
      </CalendarHeader>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <CalendarContainer>{renderCalendarTiles()}</CalendarContainer>
      )}
    </CalendarBox>
  );
};

export default Calendar;
