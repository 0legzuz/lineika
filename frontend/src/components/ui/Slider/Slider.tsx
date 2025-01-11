import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import Colors from "../../../AppStyles";

interface SliderProps {
  isOn: boolean;
  onToggle: () => void;
  labelOn: string;
  labelOff: string;
  variant?: "beige" | "orange" | "mint" | "yellow";
}

const SliderContainer = styled.div<{
  variant: "beige" | "orange" | "mint" | "yellow";
  isOn: boolean;
}>`
  display: inline-flex;
  position: relative;
  height: 70px;
  align-items: center;
  background-color: ${({ variant, isOn }) =>
    isOn
      ? variant === "beige"
        ? Colors.darkBeige
        : variant === "orange"
          ? Colors.darkOrange
          : variant === "mint"
            ? Colors.darkMint
            : Colors.darkYellow
      : variant === "beige"
        ? Colors.beige
        : variant === "orange"
          ? Colors.orange
          : variant === "mint"
            ? Colors.mint
            : Colors.yellow};
  border: 2px solid ${Colors.black};
  border-radius: 8px;
  transition: background-color 0.3s ease;
  box-sizing: border-box;
  cursor: pointer;
  -webkit-box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  -moz-box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  padding: 0 2px;
  user-select: none;
`;

const SliderToggle = styled.div<{ isOn: boolean; width: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100% - 4px);
  position: absolute;
  top: 2px;
  left: ${({ isOn, width }) =>
    isOn ? `calc(100% - ${width}px - 2px)` : "2px"};
  width: ${({ width }) => width}px;
  background-color: white;
  border-radius: 8px;
  transition:
    left 0.3s ease,
    width 0.3s ease;
  white-space: nowrap;
`;

const SliderLabel = styled.span`
  font-size: 20px;
  font-weight: 300;
  font-family: "Raleway", sans-serif;
  color: ${Colors.black};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
  pointer-events: none;
  &.left {
    left: 5px;
  }
  &.right {
    right: 5px;
  }
`;

const Slider: React.FC<SliderProps> = ({
  isOn,
  onToggle,
  labelOn,
  labelOff,
  variant = "beige",
}) => {
  const [toggleWidth, setToggleWidth] = useState(0);
  const labelOnRef = useRef<HTMLSpanElement>(null);
  const labelOffRef = useRef<HTMLSpanElement>(null);
  const [activeLabel, setActiveLabel] = useState(isOn ? labelOn : labelOff); // добавляем activeLabel

  useEffect(() => {
    if (labelOnRef.current && labelOffRef.current) {
      const onWidth = labelOnRef.current.offsetWidth;
      const offWidth = labelOffRef.current.offsetWidth;
      setToggleWidth(Math.max(onWidth, offWidth) + 10);
    }
  }, [labelOn, labelOff]);
  const handleClick = () => {
    onToggle();
    setActiveLabel(isOn ? labelOff : labelOn);
  };

  return (
    <SliderContainer onClick={handleClick} variant={variant} isOn={isOn}>
      <SliderToggle isOn={isOn} width={toggleWidth}></SliderToggle>
      <SliderLabel
        ref={labelOffRef}
        className={`left ${!isOn ? "active" : ""}`}
      >
        {labelOff}
      </SliderLabel>
      <SliderLabel ref={labelOnRef} className={`right ${isOn ? "active" : ""}`}>
        {labelOn}
      </SliderLabel>
    </SliderContainer>
  );
};

export default Slider;
