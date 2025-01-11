import React, { useState, ChangeEventHandler } from "react";
import styled from "styled-components";
import Colors from "../../../AppStyles";

interface InputProps {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  type?: string;
  placeholder?: string;
}

const StyledInput = styled.input`
  display: flex;
  gap: 6px;
  align-items: center;
  background-color: ${Colors.beige};
  ${Colors.black};
  border: 2px solid ${Colors.black};
  font-size: 20px;
  font-weight: 300;
  font-family: "Raleway", sans-serif;
  height: 70px;
  width: 100%;
  max-width: 345px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease;
  -webkit-box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  -moz-box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  padding: 10px;
  &::placeholder {
    color: ${Colors.black};
  }

  &:focus {
    outline: none;
    -webkit-box-shadow: 3px 3px 0px 0 ${Colors.orange};
    -moz-box-shadow: 3px 3px 0px 0 ${Colors.orange};
    box-shadow: 3px 3px 0px 0 ${Colors.orange};
  }
`;

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  type = "text",
  placeholder,
}) => {
  return (
    <StyledInput
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
