import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Select from "../ui/Select/Select"; // ваш кастомный Select
import Colors from "../../AppStyles";
import ActionButton from "../ui/ActionButton/ActionButton";

interface TimeRangeSelectorProps {
  availableTimes: string[][];
  setAvailableTimes: (dayIndex: number, times: string[]) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TimesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const DayGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const DayTitle = styled.h4`
  margin: 0;
  font-size: 18px;
  font-family: "MontLight", sans-serif;
`;

const TimeDisplay = styled.div`
  padding: 4px 8px;
  background-color: ${Colors.white};
  border-radius: 4px;
  font-size: 20px;
  font-family: "MontLight", sans-serif;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  max-width: 345px;
`;

const ErrorMessage = styled.div`
  color: ${Colors.red};
  font-family: "MontLight", sans-serif;
  margin-top: 10px;
`;

const daysOfWeek = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  availableTimes,
  setAvailableTimes,
}) => {
  const [selectedDay, setSelectedDay] = useState(daysOfWeek[0]);
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const [localTimes, setLocalTimes] = useState<string[][]>(availableTimes);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    setLocalTimes(availableTimes);
  }, [availableTimes]);

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hours = i.toString().padStart(2, "0");
    return `${hours}:00`;
  });

  const handleAddTime = () => {
    setErrorMsg(null); // Сброс предыдущих ошибок
    const dayIndex = daysOfWeek.indexOf(selectedDay);
    if (dayIndex === -1) return;

    const newStartHour = parseInt(startTime.substring(0, 2), 10);
    const newEndHour = parseInt(endTime.substring(0, 2), 10);

    // Проверка корректности интервала времени
    if (newStartHour >= newEndHour) {
      setErrorMsg("Время начала должно быть меньше времени конца");
      return;
    }

    const times = [...localTimes[dayIndex]];

    // Проверка на пересечение интервалов
    for (const interval of times) {
      const [existingStart, existingEnd] = interval.split(" - ");
      const existStartHour = parseInt(existingStart.substring(0, 2), 10);
      const existEndHour = parseInt(existingEnd.substring(0, 2), 10);
      if (newStartHour < existEndHour && newEndHour > existStartHour) {
        setErrorMsg("Нельзя добавить пересекающиеся промежутки!");
        return;
      }
    }

    times.push(`${startTime} - ${endTime}`);
    const updatedLocalTimes = [...localTimes];
    updatedLocalTimes[dayIndex] = times;
    setLocalTimes(updatedLocalTimes);
    setAvailableTimes(dayIndex, times);
    setStartTime("00:00");
    setEndTime("00:00");
  };

  return (
    <Container>
      <TimesList>
        {daysOfWeek.map((day, dayIndex) => {
          const times = localTimes[dayIndex];
          if (!times || times.length === 0) return null;
          return (
            <DayGroup key={dayIndex}>
              <DayTitle>{day}</DayTitle>
              {times.map((time, timeIndex) => (
                <TimeDisplay key={timeIndex}>{time}</TimeDisplay>
              ))}
            </DayGroup>
          );
        })}
      </TimesList>
      <Select value={selectedDay} onChange={setSelectedDay}>
        {daysOfWeek.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </Select>
      <Row>
        <Select value={startTime} onChange={setStartTime}>
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </Select>
        <Select value={endTime} onChange={setEndTime}>
          {timeOptions.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </Select>
      </Row>
      <ActionButton textButton="Добавить время" onClick={handleAddTime} />
      {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
    </Container>
  );
};

export default TimeRangeSelector;
