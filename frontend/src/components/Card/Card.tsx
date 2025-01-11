import React from "react";
import styled from "styled-components";
import ActionButton from "../ui/ActionButton/ActionButton"; // Импорт готового компонента кнопки
import Colors from "../../AppStyles";

interface CardProps {
  title: string;
  items: string[];
  buttonText: string;
  backgroundColor?: string;
  buttonVariant?: string; // Опционально для варианта кнопки
}

const Card: React.FC<CardProps> = ({
  title,
  items,
  buttonText,
  backgroundColor,
  buttonVariant = "yellow",
}) => {
  return (
    <StyledCard backgroundColor={backgroundColor}>
      <CardInfo>
        <CardTitle>{title}</CardTitle>
        <CardList>
          {items.map((item, idx) => (
            <CardItem key={idx}>{item}</CardItem>
          ))}
        </CardList>
      </CardInfo>
      <ActionButton textButton={buttonText} variant={buttonVariant} />
    </StyledCard>
  );
};

export default Card;

// Стили
const StyledCard = styled.div<{ backgroundColor?: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor || "#ffffff"};
  border: 2px solid ${Colors.black};
  border-radius: 16px;
  cursor: pointer;
  -webkit-box-shadow: 7px 7px 0px 0 rgba(0, 0, 0, 1);
  -moz-box-shadow: 7px 7px 0px 0 rgba(0, 0, 0, 1);
  box-shadow: 7px 7px 0px 0 rgba(0, 0, 0, 1);

  padding: 50px 50px 70px 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  width: 320px;
  height: 450px;
  padding: 20px 20px 30px 20px;
  @media (min-width: 425px) {
  }

  @media (min-width: 769px) {
    width: 380px;
  }

  @media (min-width: 1025px) {
    padding: 40px 20px 50px 20px;
    width: 420px;
    height: 550px;
  }

  @media (min-width: 1441px) {
    padding: 50px 50px 70px 50px;
    width: 460px;
    height: 610px;
  }
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  font-weight: 500;
  font-family: "Raleway", sans-serif;
  text-align: center;
  font-size: 25px;
  @media (min-width: 425px) {
  }

  @media (min-width: 769px) {
  }

  @media (min-width: 1025px) {
    font-size: 32px;
  }

  @media (min-width: 1441px) {
  }
`;

const CardList = styled.ul`
  padding-left: 10px;
  padding-top: 50px;
  list-style-position: inside; // Убедимся, что точки отображаются внутри области списка
  list-style-type: disc; // Устанавливаем тип списка "точки"
  margin: 0;
`;

const CardItem = styled.li`
  font-weight: 300;
  font-family: "Raleway", sans-serif;
  margin-bottom: 10px;
  list-style-type: inherit; // Наследуем стиль списка от ul

  font-size: 18px;
  padding-bottom: 7px;
  @media (min-width: 425px) {
  }

  @media (min-width: 769px) {
  }

  @media (min-width: 1025px) {
    font-size: 20px;
    padding-bottom: 12px;
  }

  @media (min-width: 1441px) {
  }
`;
