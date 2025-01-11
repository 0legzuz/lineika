import React, { useState } from "react";
import styled from "styled-components";

const TimeSelect = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;
const DaysContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const TimeSelects = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
`;
interface TimeRangeSelectorProps {
  availableTimes: string[][];
  setAvailableTimes: (dayIndex: number, times: string[]) => void;
}

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
  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hours = i.toString().padStart(2, "0");
    return `${hours}:00`;
  });

  const handleAddTime = (
    dayIndex: number,
    startTime: string,
    endTime: string
  ) => {
    const times = [...availableTimes[dayIndex]];
    times.push(`${startTime} - ${endTime}`);
    setAvailableTimes(dayIndex, times);
  };
  const handleDeleteTime = (dayIndex: number, timeToDelete: string) => {
    const updatedTimes = availableTimes[dayIndex].filter(
      (time) => time !== timeToDelete
    );
    setAvailableTimes(dayIndex, updatedTimes);
  };

  return (
    <DaysContainer>
      {daysOfWeek.map((day, dayIndex) => (
        <div key={dayIndex}>
          <label>{day}:</label>
          <TimeSelects>
            {availableTimes[dayIndex].map((time, index) => (
              <div key={index}>
                {" "}
                {time}{" "}
                <button onClick={() => handleDeleteTime(dayIndex, time)}>
                  x
                </button>
              </div>
            ))}
            <TimeSelector
              dayIndex={dayIndex}
              onAddTime={handleAddTime}
              timeOptions={timeOptions}
            />
          </TimeSelects>
        </div>
      ))}
    </DaysContainer>
  );
};

interface TimeSelectorProps {
  dayIndex: number;
  onAddTime: (dayIndex: number, startTime: string, endTime: string) => void;
  timeOptions: string[];
}
const TimeSelector: React.FC<TimeSelectorProps> = ({
  dayIndex,
  onAddTime,
  timeOptions,
}) => {
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");

  const handleTimeSubmit = () => {
    onAddTime(dayIndex, startTime, endTime);
    setStartTime("00:00");
    setEndTime("00:00");
  };

  return (
    <div>
      <TimeSelect
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      >
        {timeOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </TimeSelect>
      <TimeSelect value={endTime} onChange={(e) => setEndTime(e.target.value)}>
        {timeOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </TimeSelect>
      <button onClick={handleTimeSubmit}>Добавить время</button>
    </div>
  );
};

export default TimeRangeSelector;
