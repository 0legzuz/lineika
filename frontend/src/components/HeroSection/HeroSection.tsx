import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Colors from "../../AppStyles";
import ActionButton from "../ui/ActionButton/ActionButton";
import FullIcon from "../../../public/images/FullIcon";
import { useNavigate } from "react-router-dom";

const HeroSection: React.FC = () => {
  const [iconSize, setIconSize] = useState(580);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 1280 && window.innerWidth > 768) {
        setIconSize(450);
      } else if (window.innerWidth <= 768 && window.innerWidth >= 680) {
        setIconSize(400);
      } else if (window.innerWidth < 680 && window.innerWidth >= 520) {
        setIconSize(300);
      } else if (window.innerWidth < 520) {
        setIconSize(230);
      } else {
        setIconSize(580);
      }
    };

    window.addEventListener("resize", updateSize);
    updateSize(); // Инициализируем значение при загрузке компонента

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const navigate = useNavigate();
  const handleTestClick = () => {
    navigate("/tests");
  };

  return (
    <HeroContainer>
      <TextContainer>
        <Info>Онлайн школа</Info>
        <Slogan>Учеба, которая дается легко</Slogan>
        <CallToAction>
          Пройди бесплатный экспресс-тест, проверь знания и мы подберем
          подходящего преподавателя
        </CallToAction>
        <ButtonContainer>
          <ActionButton
            textButton="Экспресс-тест"
            variant="yellow"
            onClick={handleTestClick}
          />
        </ButtonContainer>
      </TextContainer>
      <TypographyContainer>
        <FullIcon
          colorArch={Colors.yellow}
          colorRect={Colors.orange}
          colorTringle={Colors.mint}
          size={iconSize}
        />
      </TypographyContainer>
    </HeroContainer>
  );
};

export default HeroSection;

const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 0;
  margin-top: 30px;
  position: relative;

  @media (min-width: 769px) {
    margin-top: 60px;
  }

  @media (min-width: 1025px) {
    margin-top: 80px;
  }

  @media (min-width: 1441px) {
    margin-top: 100px;
    max-height: 800px;
  }
`;

const TextContainer = styled.div`
  text-align: left;
  margin-bottom: 20px;
  flex: 1;
  z-index: 1;

  @media (min-width: 426px) {
    padding-left: 20px;
  }

  @media (min-width: 1025px) {
    max-width: 660px;
  }

  @media (min-width: 1441px) {
    max-width: 900px;
  }
`;

const Slogan = styled.h1`
  font-family: "Raleway", sans-serif;
  font-weight: 500;
  max-width: 210px;
  font-size: 35px;
  margin-top: 20px;

  @media (min-width: 425px) {
    max-width: 350px;
  }

  @media (min-width: 769px) {
    font-size: 45px;
  }

  @media (min-width: 1025px) {
    margin-top: 30px;
    font-size: 65px;
    max-width: unset;
  }

  @media (min-width: 1441px) {
    font-size: 85px;
  }
`;

const Info = styled.p`
  font-weight: 300;
  font-family: "Raleway", sans-serif;

  @media (min-width: 769px) {
    font-size: 16px;
  }

  @media (min-width: 1025px) {
    font-size: 18px;
  }

  @media (min-width: 1441px) {
    font-size: 20px;
  }
`;

const CallToAction = styled.p`
  font-family: "Raleway", sans-serif;
  font-weight: 300;
  max-width: 200px;
  font-size: 15px;
  margin-bottom: 30px;
  margin-top: 45px;

  @media (min-width: 769px) {
    font-size: 20px;
    max-width: 300px;
    margin-bottom: 40px;
    line-height: 25px;
  }

  @media (min-width: 1025px) {
    font-size: 22px;
    line-height: 30px;
    max-width: 350px;
    margin-top: 30px;
    margin-bottom: 60px;
  }

  @media (min-width: 1441px) {
    line-height: 35px;
    font-size: 25px;
    max-width: unset;
  }
`;

/* Новый компонент для обертки кнопки */
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;

  @media (max-width: 520px) {
    justify-content: center;
  }
`;

const TypographyContainer = styled.div`
  text-align: center;
  height: 100%;
  position: absolute;
  right: 0;
  bottom: 50px;
  top: 50px;

  @media (min-width: 520px) {
    top: -35px;
  }

  @media (min-width: 1441px) {
    position: unset;
  }
`;
