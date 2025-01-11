import React from "react";
import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import Stats from "../components/Stats/Stats";
import styled from "styled-components";

const PaddingContainer = styled.div`
  max-width: 1920px;
  width: 100%;
  padding: 0 13px; /* Базовый padding для маленьких экранов */

  @media (min-width: 769px) {
    padding: 0 30px;
  }

  @media (min-width: 1025px) {
    padding: 0 100px;
  }

  @media (min-width: 1441px) {
    padding: 0 200px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

import CardContainer from "../components/CardContainer/CardContainer";
import Colors from "../AppStyles";
import FullSection from "../components/FullSection/FullSection";
import HalfSection from "../components/HalfSection/HalfSecion";
import TeachersSection from "../components/TeacherSection/TeacherSection";
import CommentsSection from "../components/CommentsSection/CommentsSection";
import Footer from "../components/Footer/Footer";

const cards = [
  {
    title: "Подготовиться к ОГЭ",
    items: [
      "Мини-группы",
      "Индивидуальные занятия",
      "Разбор задач ОГЭ",
      "Практические задания",
      "Интенсивы на каникулах",
    ],
    buttonText: "Выбрать преподавателя",
    backgroundColor: `${Colors.white}`,
  },
  {
    title: "Подготовиться к ЕГЭ",
    items: [
      "Профильная математика",
      "Индивидуальные занятия",
      "Сложные задачи",
      "Практика по темам",
      "Курсы подготовки",
    ],
    buttonText: "Выбрать преподавателя",
    backgroundColor: `${Colors.white}`,
  },
  {
    title: "Подтянуть оценки",
    items: [
      "Профильная математика",
      "Индивидуальные занятия",
      "Сложные задачи",
      "Практика по темам",
      "Курсы подготовки",
    ],
    buttonText: "Выбрать преподавателя",
    backgroundColor: `${Colors.orange}`,
  },
];

const teachersData = [
  {
    name: "Александра",
    title: "Преподаватель математики",
    image: "./public/images/photo.png",
    experience:
      "Более 10 лет работы в области математики, включая преподавание в университетах и проведение научных исследований.",
  },
  {
    name: "Олег",
    title: "Преподаватель математики",
    image: "./public/images/photo.png",
    experience:
      "Опыт преподавания математики в школах и колледжах более 7 лет, в том числе подготовка к олимпиадам и конкурсам.",
  },
];

const comments = [
  {
    title: "Мария, 17 лет",
    text: "Занятия в школе математики помогли мне понять сложные темы и повысить свои оценки. Очень благодарна преподавателям!",
    backgroundColor: `${Colors.white}`,
  },
  {
    title: "Дмитрий, 19 лет",
    text: "Отличная подготовка к олимпиадам! Школа предоставляет все необходимые материалы и поддержку.",
    backgroundColor: `${Colors.yellow}`,
  },
  {
    title: "Екатерина, 16 лет",
    text: "Мне очень нравятся уроки в этой школе. Преподаватели всегда готовы помочь и ответить на любые вопросы.",
    backgroundColor: `${Colors.white}`,
  },
];

const AlternativeMainPage: React.FC = () => {
  return (
    <>
      <PaddingContainer>
        <Header />
        <HeroSection />
        <Stats />
        {/* <CardContainer cards={cards} />  */}
      </PaddingContainer>
      {/* <FullSection /> */}
      {/* <Section>
        <HalfSection
          title="Продвинутый курс по математике"
          description="Курс для тех, кто хочет углубить свои знания в математике, освоить сложные темы и применять их в реальной жизни и учебе."
          buttonText="Подробнее о курсе"
          buttonVariant="mint"
          backgroundColor={Colors.yellow} // Используем цвет, который соответствует теме
          tags={[{ label: "Алгебра", color: Colors.white }]}
          side="right"
        />

        <HalfSection
          title="Подготовка к ЕГЭ, ОГЭ и ГИА по математике"
          description="Полноценный курс для подготовки школьников к экзаменам по математике на высший балл."
          buttonText="Подробнее о курсе"
          buttonVariant="mint"
          backgroundColor={Colors.white} // Цвет, соответствующий теме школьного курса
          tags={[{ label: "ЕГЭ", color: Colors.orange }]}
          side="left"
        />
      </Section> */}

      <TeachersSection teachers={teachersData} />

      {/* <CommentsSection comments={comments}></CommentsSection> */}
      <Footer />
    </>
  );
};

export default AlternativeMainPage;
