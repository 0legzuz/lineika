import React, { useState, MouseEventHandler } from "react";
import styled from "styled-components";
import Colors from "../../../AppStyles";

// Styled components for Button
const Button = styled.button<{
  variant: "beige" | "orange" | "mint" | "yellow";
}>`
  display: flex;
  gap: 6px;
  align-items: center;
  background-color: ${({ variant }) =>
    variant === "beige"
      ? Colors.beige
      : variant === "orange"
        ? Colors.orange
        : variant === "mint"
          ? Colors.mint
          : Colors.yellow};
  ${Colors.black};
  font-size: 20px;
  font-weight: 300;
  font-family: "Raleway", sans-serif;
  height: 70px;
  width: 100%;
  max-width: 345px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s ease;
  border-radius: 8px;
  border: 2px solid ${Colors.black};
  -webkit-box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  -moz-box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);

  &:hover {
    background-color: ${({ variant }) =>
      variant === "beige"
        ? Colors.darkBeige
        : variant === "orange"
          ? Colors.darkOrange
          : variant === "mint"
            ? Colors.darkMint
            : Colors.darkYellow};
  }

  &:active {
    background-color: ${({ variant }) =>
      variant === "beige"
        ? Colors.lightBeige
        : variant === "orange"
          ? Colors.lightOrange
          : variant === "mint"
            ? Colors.lightMint
            : Colors.lightYellow};
  }
`;

// ActionButton component
interface ActionButtonProps {
  textButton: string;
  variant?: "beige" | "orange" | "mint" | "yellow";
  onClick?: MouseEventHandler<HTMLButtonElement>; // Добавлен пропс onClick
}
const ActionButton: React.FC<ActionButtonProps> = ({
  textButton,
  variant = "beige",
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      variant={variant}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick} // Используем пропс onClick
    >
      {textButton}
    </Button>
  );
};

export default ActionButton;
