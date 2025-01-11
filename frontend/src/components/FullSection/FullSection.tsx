import React from "react";
import styled from "styled-components";
import ActionButton from "../ui/ActionButton/ActionButton"; // Предполагается, что ActionButton уже создан
import Colors from "../../AppStyles";

const FullSection: React.FC = () => {
  return (
    <SectionContainer>
      <ContentContainer>
        <TextContainer>
          <Title>Сложно определиться с программой?</Title>
          <Description>
            Запишись на бесплатную консультацию. Подберем программу и расскажем
            о школе подробнее.
          </Description>
          <ActionButton textButton="Хочу консультацию" variant="yellow" />
        </TextContainer>
        <TagsContainer>
          <img src="public/images/programs.svg" alt="" />
        </TagsContainer>
      </ContentContainer>
    </SectionContainer>
  );
};

export default FullSection;

// Стили
const SectionContainer = styled.div`
  background-color: ${Colors.mint};
  border-top: 4px solid ${Colors.black};
  border-bottom: 4px solid ${Colors.black};
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 100px;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1920px;
  position: relative;
  flex-wrap: wrap-reverse;
  flex: 1;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;

  padding: 0 20px 20px 20px;
`;

const Title = styled.h2`
  font-weight: 500;
  font-family: "Raleway", sans-serif;
  font-size: 35px;
  padding-bottom: 10px;

  @media (min-width: 425px) {
    margin-top: 30px;
  }

  @media (min-width: 769px) {
    font-size: 45px;
    margin-top: 80px;
  }

  @media (min-width: 1025px) {
    font-size: 50px;
    margin-top: 100px;
  }

  @media (min-width: 1441px) {
    padding-bottom: 50px;
    margin-top: 180px;
  }
`;

const Description = styled.p`
  line-height: 32px;
  font-weight: 300;
  font-family: "Raleway", sans-serif;
  padding-bottom: 60px;
  font-size: 18px;
  line-height: 22px;
  @media (min-width: 425px) {
    font-size: 20px;
    line-height: 25px;
  }

  @media (min-width: 769px) {
    font-size: 22px;
    line-height: 28px;
  }

  @media (min-width: 1025px) {
    font-size: 25px;
    line-height: 32px;
  }
`;

const TagsContainer = styled.div`
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  max-width: 700px;
  min-width: 300px;
  padding: 25px 25px 0 25px;
  @media (min-width: 425px) {
    height: 450px;
    padding: 50px;
  }

  @media (min-width: 769px) {
    padding: 100px 0 0 0;
    height: 450px;
    min-width: 640px;
  }

  @media (min-width: 1025px) {
    padding: 100px 0 0 0;
  }

  @media (min-width: 1441px) {
    padding: 100px 0 0 0;
  }
`;
