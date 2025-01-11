import React from "react";
import "./SelectStyles.tsx";
import styled from "styled-components";

interface SelectProps {
  children: React.ReactNode;
  value?: string | string[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  multiple?: boolean;
}
const StyledSelect = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const Select: React.FC<SelectProps> = ({
  children,
  onChange,
  value,
  multiple,
}) => {
  return (
    <StyledSelect onChange={onChange} value={value} multiple={multiple}>
      {children}
    </StyledSelect>
  );
};

export default Select;
