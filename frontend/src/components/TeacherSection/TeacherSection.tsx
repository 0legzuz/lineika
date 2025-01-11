import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Colors from "../../AppStyles";
import ArrowIcon from "../../../public/images/ArrowIcon";
import { api } from "../../services/api";
import { Teacher } from "../../types";

interface TeachersSectionProps {
  // teachers: Teacher[]; //теперь не нужно
}

const TeachersSection: React.FC<TeachersSectionProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(2);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const teachersContainerRef = useRef<HTMLDivElement>(null);

  // Функция для определения количества видимых карточек
  const updateVisibleCards = () => {
    const width = window.innerWidth;
    if (width < 1024) {
      setVisibleCards(1);
    } else {
      setVisibleCards(2); // Можно изменить на другое значение, если нужно
    }
  };

  useEffect(() => {
    setLoading(true);
    api
      .getTeachers()
      .then((res) => {
        setTeachers(res.teachers);
        setLoading(false);
      })
      .catch((e) => {
        console.error("Failed to load teachers", e);
        setLoading(false);
      });
  }, []);

  // Устанавливаем количество видимых карточек при монтировании и изменении размера окна
  useEffect(() => {
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => {
      window.removeEventListener("resize", updateVisibleCards);
    };
  }, []);

  // Обновляем currentIndex, если количество visibleCards изменилось
  useEffect(() => {
    if (currentIndex + visibleCards > teachers.length) {
      setCurrentIndex(Math.max(teachers.length - visibleCards, 0));
    }
  }, [visibleCards, teachers.length, currentIndex]);

  // Функции для прокрутки
  const handleScrollLeft = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - visibleCards, 0));
  };

  const handleScrollRight = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + visibleCards, teachers.length - visibleCards)
    );
  };

  // Проверяем, можно ли прокрутить влево или вправо
  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex + visibleCards < teachers.length;

  // Получаем текущие отображаемые карточки
  const currentTeachers = teachers.slice(
    currentIndex,
    currentIndex + visibleCards
  );

  return (
    <SectionContainer>
      <ContentContainer>
        <Title>С вами будут работать лучшие преподаватели</Title>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Carousel>
            <ArrowButton
              onClick={handleScrollLeft}
              disabled={!canScrollLeft}
              aria-label="Прокрутить влево"
              isDisabled={!canScrollLeft}
            >
              <ArrowIcon color={Colors.mint} rotate={180}></ArrowIcon>
            </ArrowButton>
            <TeachersContainer>
              {currentTeachers.map((teacher, index) => (
                <TeacherCard key={currentIndex + index}>
                  <ImageWrapper isFirst={currentIndex + index === 0}>
                    <TeacherImage
                      src={teacher.photo || "/no-photo.png"}
                      alt={teacher.name}
                    />
                  </ImageWrapper>
                  <TeacherName>{teacher.name}</TeacherName>
                  <TeacherExperience>{teacher.description}</TeacherExperience>
                </TeacherCard>
              ))}
            </TeachersContainer>
            <ArrowButton
              onClick={handleScrollRight}
              disabled={!canScrollRight}
              aria-label="Прокрутить вправо"
              isDisabled={!canScrollRight}
            >
              <ArrowIcon color={Colors.yellow}></ArrowIcon>
            </ArrowButton>
          </Carousel>
        )}
      </ContentContainer>
    </SectionContainer>
  );
};

export default TeachersSection;

// Styled-components

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Colors.orange};
  border-bottom: 4px solid ${Colors.black};
  width: 100%;
`;

const ContentContainer = styled.div`
  max-width: 1920px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  @media (min-width: 768px) {
    padding: 0 50px;
  }

  @media (min-width: 1024px) {
    padding: 0 100px;
  }

  @media (min-width: 1440px) {
    padding: 0 150px;
  }

  @media (min-width: 1920px) {
    padding: 0 200px;
  }
`;

const Title = styled.h2`
  text-align: left;
  font-weight: 500;
  font-family: "Raleway";
  max-width: 600px;
  padding-left: 20px;

  font-size: 35px;
  margin-top: 40px;
  @media (min-width: 769px) {
    font-size: 45px;
    margin-top: 100px;
  }

  @media (min-width: 1025px) {
    font-size: 50px;
    margin-top: 150px;
  }
`;

const Carousel = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
  margin: 30px 0;
  position: relative;
  @media (min-width: 768px) {
    margin: 40px 0;
  }

  @media (min-width: 1024px) {
    margin: 50px 0;
  }

  @media (min-width: 1440px) {
    margin: 70px 0;
  }

  @media (min-width: 1920px) {
    margin: 90px 0;
  }
`;

const ArrowButton = styled.button`
  -webkit-box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  -moz-box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  border: 2px solid ${Colors.black};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 50%;
  background-color: ${Colors.white};
  width: 50px;
  height: 50px;
  @media (min-width: 1441px) {
    width: 70px;
    height: 70px;
  }
`;

const TeachersContainer = styled.div`
  display: flex;
  gap: 30px;
  overflow: hidden;
  width: 100%;
  justify-content: center; // Центрируем карточки

  @media (min-width: 1441px) {
    padding: 0 80px;
  }
`;

const TeacherCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  flex-shrink: 0; // Предотвращаем сжатие
  @media (min-width: 425px) {
    width: 220px;
  }

  @media (min-width: 769px) {
    width: 280px;
  }

  @media (min-width: 1025px) {
    width: 350px;
  }
`;

const ImageWrapper = styled.div<{ isFirst: boolean }>`
  overflow: hidden;
  -webkit-box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  -moz-box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  border: 2px solid ${Colors.black};
  border-radius: 40% 0 40% 0;
  width: 100%;
  min-height: 300px;
  @media (min-width: 425px) {
  }

  @media (min-width: 769px) {
  }

  @media (min-width: 1025px) {
  }

  ${(props) =>
    props.isFirst &&
    `
    border-radius: 50%;
  `}
`;

const TeacherImage = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
`;

const TeacherName = styled.h3`
  margin-top: 55px;
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

const TeacherExperience = styled.p`
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
