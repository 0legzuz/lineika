//AppStyles.tsx

import styled, { createGlobalStyle } from "styled-components";

const Colors = {
  orange: "#fa7930",
  // orange: "#BFD7B5",
  darkOrange: "#E05D13",
  lightOrange: "#FFB38B",

  // yellow: "#F2DDA4",
  yellow: "#ffcA42",
  darkYellow: "#FFB700",
  lightYellow: "#FEDF91",

  mint: "#8bbeb2",
  // mint: "#A3C4BC",
  darkMint: "#72AA9B",
  lightMint: "#BCDFD6",

  beige: "#FFF8EB",
  // beige: "#E7EFC5",

  darkBeige: "#FFEBBA",
  lightBeige: "#FFF4ED",

  black: "#000000",
  white: "#ffffff",
  darkGray: "#e5e4e3",
  lightGray: "#e5e5e5",
};

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    // border: 1px solid ${Colors.black};
  }

  *:before,
  *:after {
    box-sizing: border-box;
  }

  a,
  a:visited {
    text-decoration: none;
    cursor: pointer;
  }

  button,
  ._btn {
    cursor: pointer;
    outline: none;
  }

  ul li {
    list-style: none;
  }
  
html,input,
  body {
  width: 100%;
  height: 100%;
  background-color: ${Colors.beige};
}



  #root {
  display: flex;
  flex-direction: column;
align-items: center;
  }

  @font-face { 
    font-family: "MontLight";
    src: url("../fonts/MontLight.eot");
    src: url("../fonts/MontLight.eot?#iefix")format("embedded-opentype"),
    url("../fonts/MontLight.woff") format("woff"),
    url("../fonts/MontLight.ttf") format("truetype");
    font-style: normal;
    font-weight: 300;
}

@font-face { 
    font-family: "MontSemiBold";
    src: url("../fonts/MontSemiBold.eot");
    src: url("../fonts/MontSemiBold.eot?#iefix")format("embedded-opentype"),
    url("../fonts/MontSemiBold.woff") format("woff"),
    url("../fonts/MontSemiBold.ttf") format("truetype");
    font-style: normal;
    font-weight: 600;
}


`;

export const Container = styled.div`
  padding-top: 70px;
  position: relative;
  max-width: 100%;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background-color: ${Colors.beige};
`;

export default Colors;
