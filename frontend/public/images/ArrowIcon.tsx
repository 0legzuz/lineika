import React from "react";

interface ArrowIconProps {
  color: string;
  rotate?: number; // Добавляем пропс для поворота
  size?: number; // Добавляем пропс для размера иконки
}

const ArrowIcon: React.FC<ArrowIconProps> = ({
  color,
  rotate = 0,
  size = 48,
}) => {
  return (
    <svg
      viewBox="0 0 300 300"
      width={size}
      height={size}
      style={{ transform: `rotate(${rotate}deg)` }} // Применяем поворот в стиле SVG
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M26.8279,250.29485L15,222.1574v0l187.81615-81.82474L15.21961,60.43043L27.69926,30.74161L234.9416,119.01149v42.64235L26.8279,250.29485Z"
        transform="translate(33.564827 9.48177)"
        fill={color}
        stroke="#000"
        strokeWidth="5"
        strokeMiterlimit="8"
      />
    </svg>
  );
};

export default ArrowIcon;
