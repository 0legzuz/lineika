import React from "react";
import styled from "styled-components";
import Colors from "../../AppStyles";

interface CommentsProps {
  title: string;
  text: string;
  backgroundColor?: string;
}

interface CommentsSectionProps {
  comments: CommentsProps[];
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ comments }) => {
  return (
    <Container>
      <ContentContainer>
        <Title>О нас говорят и пишут</Title>
        <CardsContainer>
          {comments.map((comment, index) => (
            <CommentCard
              key={index}
              backgroundColor={comment.backgroundColor || Colors.white}
            >
              <ContentWrapper index={index}>
                <CommentTitle>{comment.title}</CommentTitle>
                <CommentText>{comment.text}</CommentText>
              </ContentWrapper>
            </CommentCard>
          ))}
        </CardsContainer>
      </ContentContainer>
    </Container>
  );
};

export default CommentsSection;

// Стили
const Container = styled.div`
  background-color: ${Colors.mint};
  width: 100%;
  padding: 50px 0;

  @media (min-width: 768px) {
    padding: 70px 0;
  }

  @media (min-width: 1024px) {
    padding: 90px 0;
  }

  @media (min-width: 1440px) {
    padding: 120px 0;
  }

  @media (min-width: 1920px) {
    padding: 150px 0;
  }
`;

const ContentContainer = styled.div`
  max-width: 1920px;
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
  padding-left: 20px;

  box-sizing: border-box;

  @media (min-width: 768px) {
    padding-left: 50px;
  }

  @media (min-width: 1024px) {
    padding-left: 100px;
  }

  @media (min-width: 1440px) {
    padding: 0 150px;
  }

  @media (min-width: 1920px) {
    padding: 0 200px;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  gap: 30px;
  overflow-x: auto;

  /* Скрываем вертикальный скроллбар, если есть */
  overflow-y: hidden;

  /* Скрываем скроллбар для Webkit-браузеров (Chrome, Safari, Opera) */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Скрываем скроллбар для Firefox */
  scrollbar-width: none;

  /* Добавляем плавную прокрутку */
  scroll-behavior: smooth;

  /* Центрируем содержимое */
  justify-content: flex-start;
`;

const Title = styled.h2`
  margin-bottom: -10px;

  text-align: left;
  font-weight: 500;
  font-family: "Raleway";
  max-width: 600px;
  padding-left: 20px;
  padding-bottom: 15px;
  max-width: 370px;
  font-size: 35px;
  @media (min-width: 769px) {
    font-size: 45px;
     margin-bottom: -60px;
  }

  @media (min-width: 1025px) {
    font-size: 50px;
    m
`;

const CommentCard = styled.div<{ backgroundColor?: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor || "#ffffff"};
  border: 2px solid ${Colors.black};
  border-radius: 16px;
  cursor: pointer;
  -webkit-box-shadow: 7px 7px 0px 0 rgba(0, 0, 0, 1);
  -moz-box-shadow: 7px 7px 0px 0 rgba(0, 0, 0, 1);
  box-shadow: 7px 7px 0px 0 rgba(0, 0, 0, 1);
  width: 460px;
  height: 360px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 10px;
  margin-right: 10px;
  min-width: 280px;

  &:nth-child(1) {
    margin-top: 150px; /* Первый элемент с отступом 150px */
  }

  &:nth-child(2) {
    margin-top: 75px; /* Второй элемент с отступом 75px */
    transform: rotate(10deg);
  }

  &:nth-child(3) {
    margin-top: 0px; /* Третий элемент без отступа */
  }

  padding: 30px 30px 50px 30px;
  @media (min-width: 425px) {
    height: 400px;
    padding: 35px 35px 55px 35px;
  }

  @media (min-width: 769px) {
    height: 440px;
    padding: 40px 40px 65px 40px;
  }

  @media (min-width: 1025px) {
    height: 460px;
    padding: 50px 50px 70px 50px;
  }
`;

const ContentWrapper = styled.div<{ index: number }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${({ index }) =>
    index === 1 &&
    `
    transform: rotate(-10deg);
  `}
`;

const CommentTitle = styled.h3`
  font-weight: 500;
  font-family: "Raleway", sans-serif;
  text-align: center;
  width: 100%;

  font-size: 25px;
  @media (min-width: 425px) {
  }

  @media (min-width: 769px) {
  }

  @media (min-width: 1025px) {
    font-size: 32px;
  }
`;

const CommentText = styled.p`
  width: 100%;
  margin-top: 30px;
  text-align: left;
  line-height: 32px;
  font-weight: 300;
  font-family: "Raleway";

  font-size: 18px;
  @media (min-width: 425px) {
  }

  @media (min-width: 769px) {
    font-size: 20px;
  }

  @media (min-width: 1025px) {
    font-size: 25px;
  }
`;
