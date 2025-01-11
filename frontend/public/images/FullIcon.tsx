import React from "react";

interface FullIconProps {
  colorArch: string;
  colorRect: string;
  colorTringle: string;
  size?: number;
}

const FullIcon: React.FC<FullIconProps> = ({
  colorArch,
  colorRect,
  colorTringle,
  size = 48,
}) => {
  return (
    <svg viewBox="0 0 500 500" width={size} height={size}>
      <g transform="matrix(.787885 0.615822-.615822 0.787885 164.564882-99.414063)">
        <rect
          width="270"
          height="70"
          rx="0"
          ry="0"
          transform="translate(115 145)"
          strokeWidth="0"
        />
        <rect
          width="270"
          height="70"
          rx="0"
          ry="0"
          transform="translate(107 137)"
          fill={colorRect}
          stroke="#000"
          strokeWidth="3"
        />
      </g>
      <g transform="translate(-36.099999-30.205691)">
        <g transform="matrix(.697153 0.716922-.716922 0.697153 290.153345-32.354023)">
          <path
            d="M203,238c74.55844,0,135,60.44156,135,135h-270c0-74.55844,60.44156-135,135-135ZM68,403.00994v-30h270v30h-270Z"
            strokeWidth="0"
          />
          <path
            d="M195,230c74.55844,0,135,60.44156,135,135v0v30.00994h-270L60,365c0-74.55844,60.44156-135,135-135Z"
            fill={colorArch}
            stroke="#000"
            strokeWidth="3"
          />
        </g>
      </g>
      <g transform="matrix(.998727-.050447 0.050447 0.998727 76.834679 117.515747)">
        <path
          d="M270,0v270h-270L270,0Z"
          transform="translate(108 108)"
          stroke="rgba(0,0,0,0)"
        />
        <path
          d="M270,0v270h-270L270,0Z"
          transform="translate(100 100)"
          fill={colorTringle}
          stroke="#000"
          strokeWidth="3"
        />
      </g>
    </svg>
  );
};

export default FullIcon;
