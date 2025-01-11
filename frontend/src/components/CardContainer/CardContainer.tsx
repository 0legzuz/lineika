import React from "react";
import styled from "styled-components";
import Card from "../Card/Card";

interface CardProps {
  title: string;
  items: string[];
  buttonText: string;
  backgroundColor?: string;
}

interface CardContainerProps {
  cards: CardProps[];
}

const CardContainer: React.FC<CardContainerProps> = ({ cards }) => {
  return (
    <Container>
      {cards.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          items={card.items}
          buttonText={card.buttonText}
          backgroundColor={card.backgroundColor}
        />
      ))}
    </Container>
  );
};

export default CardContainer;

// Стили
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  justify-content: center;

  padding: 0  7px 0;
  margin-bottom: 200px;
  margin-top: 100px;
  & > *:not(:last-child) {
    @media (min-width: 1921px) {
      margin-top: 55px;
    }
  }
  gap: 20px;
  @media (min-width: 425px) {
  }

  @media (min-width: 769px) {
    margin-top: 150px;
  }

  @media (min-width: 1025px) {
    margin-top: 200px;
    gap: 25px;
  }

  @media (min-width: 1441px) {
    margin-top: 260px;
    gap: 50px;
  }
`;
