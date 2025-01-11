import React from "react";
import styled from "styled-components";
import ActionButton from "../ui/ActionButton/ActionButton";
import Colors from "../../AppStyles";

// Интерфейс для описания пропсов
interface HalfSectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonVariant: string;
  backgroundColor: string;
  tags: { label: string; color: string }[];
  side: "left" | "right"; // Добавили проп side
}

const HalfSection: React.FC<HalfSectionProps> = ({
  title,
  description,
  buttonText,
  buttonVariant,
  backgroundColor,
  tags,
  side,
}) => {
  return (
    <SectionContainer backgroundColor={backgroundColor} side={side}>
      <ContentContainer>
        <TextContainer>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <ActionButton textButton={buttonText} variant={buttonVariant} />
        </TextContainer>
        <TagsContainer>
          {tags.map((tag, index) => (
            <Tag key={index} color={tag.color}>
              {tag.label}
            </Tag>
          ))}
        </TagsContainer>
      </ContentContainer>
    </SectionContainer>
  );
};

export default HalfSection;

// Стили
const SectionContainer = styled.div<{
  backgroundColor: string;
  side: "left" | "right";
}>`
  display: flex;
  justify-content: ${(props) =>
    props.side === "left" ? "flex-start" : "flex-end"};
  background-color: ${(props) => props.backgroundColor};
  border-bottom: 4px solid ${Colors.black};
  width: 100%;
  @media (min-width: 769px) {
    width: 50%;
    min-width: 384px;
  }
`;

const ContentContainer = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  @media (min-width: 1441px) {
    align-items: center;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; // Занимает доступное пространство
  padding: 30px;
  max-width: 500px;
  justify-content: space-between;
  @media (min-width: 1441px) {
    justify-content: unset;
    padding: 100px;
  }
`;

const Title = styled.h2`
  font-weight: 500;
  font-family: "Raleway", sans-serif;
  padding-bottom: 50px;

  font-size: 35px;

  @media (min-width: 769px) {
    font-size: 45px;
  }

  @media (min-width: 1025px) {
    font-size: 50px;
  }

  @media (min-width: 1441px) {
  }
`;

const Description = styled.p`
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
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 20px;
  display: none;
  @media (min-width: 1441px) {
    display: unset;
  }
`;

const Tag = styled.div<{ color: string }>`
  text-align: center;
  font-size: 150px;
  width: 150px;
  line-height: 150px;
  font-weight: 900;
  color: ${(props) => props.color};
  font-family: "Raleway", sans-serif;
  text-shadow: 7px 7px 0px rgba(0, 0, 0, 1);
  -webkit-text-stroke: 2px black;
  writing-mode: vertical-rl;
`;
