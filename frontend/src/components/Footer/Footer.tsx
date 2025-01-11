import React from "react";
import styled from "styled-components";
import Colors from "../../AppStyles";
import logo from "../../../public/images/logo.svg";
import { useNavigate } from "react-router-dom";

// Типизация для компонента Footer
const Footer: React.FC = () => {
  const navigate = useNavigate();
  const handlePriceClick = () => {
    navigate("/prices");
  };
  return (
    <FooterContainer>
      <ContentContainer>
        <FooterContent>
          <Column>
            <Brand>
              <LogoContainer>
                <Logo src={logo} alt="Логотип" />
              </LogoContainer>
              <Phone>8 (812) 000 00 00</Phone>
              <SocialIcons></SocialIcons>
            </Brand>
          </Column>
          <Column>
            <h3>О школе</h3>
            <ul>
              <li>Преподаватели</li>
              {/* <li>Сертификаты</li> */}

              {/* <li>Разговорные клубы</li> */}
            </ul>
          </Column>
          <Column>
            <h3>Программы</h3>
            <ul>
              {/* <li>Для школьников</li> */}
              {/* <li>Для взрослых</li> */}
              {/* <li>Онлайн-курс</li> */}
              <li>Экспресс-тест</li>
            </ul>
          </Column>
          <Column>
            <h3>Инфо</h3>
            <ul>
              <li onClick={handlePriceClick}>Цены</li>
              {/* <li>Контакты</li> */}
              {/* <li>Консультация</li> */}
              {/* <li>Политика конф.</li> */}
              {/* <li>Работа у нас</li> */}
            </ul>
          </Column>
        </FooterContent>
        <FooterBottom>
          <p>© Lineika, 2024</p>
        </FooterBottom>
      </ContentContainer>
    </FooterContainer>
  );
};

export default Footer;

// Стили
const FooterContainer = styled.footer`
  // border-top: 4px solid ${Colors.black};
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ContentContainer = styled.div`
  max-width: 1920px;
  background-color: ${Colors.yellow};
  width: 100%;
  margin: 0 auto;
  padding: 0 20px; // Минимальные отступы для маленьких экранов
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

const FooterContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-bottom: 20px;
  gap: 10px;
  padding-top: 20px;
  @media (min-width: 769px) {
    gap: 15px;
    padding-top: 40px;
  }

  @media (min-width: 1025px) {
    gap: 25px;
    padding-top: 70px;
  }

  @media (min-width: 1441px) {
    gap: 30px;
    padding-top: 90px;
  }
`;

const Column = styled.div`
  
  display: flex;
  flex-direction: column;
  min-width: 120px;
  max-width: 170px;
  flex: 1;
 
  h3 {
    font-weight: 600;
    font-family: "Raleway", sans-serif;
    width: 100%;
    font-size: 15px;
     margin-bottom: 15px;

    @media (min-width: 769px) {
      font-size: 20px;
      line-height: 25px;
       margin-bottom: 20px;
    }

    @media (min-width: 1025px) {
      font-size: 22px;
      line-height: 30px;
       margin-bottom: 30px;
    }

    @media (min-width: 1441px) {
      line-height: 35px;
      font-size: 25px;
       margin-bottom: 40px;
    }
  }
  ul {
    list-style-type: none;
    padding: 0;
    li {
      
      line-height: 32px;
      font-weight: 300;
      font-family: "Raleway";
       font-size: 13px;

    @media (min-width: 769px) {
      font-size: 16px;
      line-height: 25px;
      margin-bottom: 5px;
    }

    @media (min-width: 1025px) {
      font-size: 18px;
      line-height: 30px;
      margin-bottom: 10px;
    }

    @media (min-width: 1441px) {
      line-height: 35px;
      font-size: 20px
      margin-bottom: 14px;
    }
  }
`;

const Brand = styled.div`
  width: 100%;
  h2 {
    font-weight: 600;
    margin-bottom: 10px;
    line-height: 1.2;

    font-size: 25px;
    @media (min-width: 425px) {
    }

    @media (min-width: 769px) {
    }

    @media (min-width: 1025px) {
      font-size: 32px;
    }
  }
`;

const Phone = styled.p`
  margin-top: 30px;
  p

  line-height: 32px;
  font-weight: 300;
  font-family: "MontLight";

  font-size: 17px;
  padding-left: 10px;

  @media (min-width: 1441px) {
    font-size: 20px;
    adding-left: 25px;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
`;

const FooterBottom = styled.div`
  width: 100%;
  text-align: left;
  padding-top: 10px;
  p {
    font-size: 20px;
    line-height: 32px;
    font-weight: 300;
    font-family: "Raleway";
  }
`;

const LogoContainer = styled.div`
  max-width: 185px;
  padding: 0 20px;
  border-top: 1px solid ${Colors.black};
  border-bottom: 1px solid ${Colors.black};
`;

const Logo = styled.img`
  height: auto;
  cursor: pointer;
  width: 100%;
`;
