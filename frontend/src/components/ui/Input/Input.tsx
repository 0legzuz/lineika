import React, { ChangeEventHandler } from "react";
import InputMask from "react-input-mask";
import styled from "styled-components";
import Colors from "../../../AppStyles";

interface InputProps {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  type?: string;
  placeholder?: string;
  mask?: string;
}

// Общие стили для обоих вариантов ввода
const commonStyles = `
  display: flex;
  gap: 6px;
  align-items: center;
  background-color: ${Colors.beige};
  border: 2px solid ${Colors.black};
  font-size: 20px;
  font-weight: 300;
  font-family: "MontLight";
  height: 70px;
  width: 100%;
  max-width: 345px;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease;
  box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  padding: 10px;

  &::placeholder {
    color: ${Colors.black};
  }

  &:focus {
    outline: none;
    box-shadow: 8px 8px 0 0;
  }
`;

// Стили для обычного ввода
const StyledInput = styled.input`
  ${commonStyles}
`;

// Стили для ввода с маской
const StyledMaskedInput = styled(InputMask)`
  ${commonStyles}
`;

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  type = "text",
  placeholder,
  mask,
  ...restProps
}) => {
  // Если задана маска, используем StyledMaskedInput, иначе стандартный input
  if (mask) {
    return (
      <StyledMaskedInput
        mask={mask}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...restProps}
      />
    );
  }
  return (
    <StyledInput
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...restProps}
    />
  );
};

export default Input;
