import React from 'react';
import styled from 'styled-components';

// Стили для контейнера
const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  gap: 10px;

  @media (min-width: 425px) {
    padding: 0 10px;
  }

  @media (min-width: 769px) {
    margin-top: 100px;
    padding: 0 25px;
    gap: 15px;
  }

  @media (min-width: 1025px) {
    margin-top: 150px;
    padding: 0 32px;
    gap: 20px;
  }

  @media (min-width: 1441px) {
    margin-top: 300px;
    padding: 0 40px;
    gap: 20px;
  }
`;

// Стили для каждого блока статистики
const StatBlock = styled.div`
  text-align: center;
`;

// Стили для числового значения
const StatValue = styled.div`
  font-family: "MontSemiBold", sans-serif;
  font-size: 22px;
  @media (min-width: 769px) {
    font-size: 25px;
  }

  @media (min-width: 1025px) {
    font-size: 32px;
  }

  @media (min-width: 1441px) {
    font-size: 50px;
  }
`;

// Стили для описания
const StatDescription = styled.div`
  font-family: "Raleway", sans-serif;
  margin-top: 15px;
  font-size: 12px;
  @media (min-width: 769px) {
    margin-top: 35px;
    font-size: 16px;
  }

  @media (min-width: 1025px) {
    margin-top: 40px;
    font-size: 20px;
  }

  @media (min-width: 1441px) {
    margin-top: 60px;
    font-size: 25px;
  }
`;

// Компонент для отображения статистики
const Stats = () => {
  return (
    <StatsContainer>
      <StatBlock>
        <StatValue>&gt; 250</StatValue>
        <StatDescription>
          успешных студентов <br /> на всех уровнях обучения
        </StatDescription>
      </StatBlock>
      <StatBlock>
        <StatValue>98 %</StatValue>
        <StatDescription>
          студентов успешно <br /> оканчивают курсы
        </StatDescription>
      </StatBlock>
      <StatBlock>
        <StatValue>9 из 10</StatValue>
        <StatDescription>
          студентов активно используют <br /> полученные знания
        </StatDescription>
      </StatBlock>
    </StatsContainer>
  );
};

export default Stats;