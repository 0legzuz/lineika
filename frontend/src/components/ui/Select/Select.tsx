import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Colors from "../../../AppStyles";

interface SelectProps {
  value?: string;
  onChange?: (value: string) => void;
  children?: React.ReactNode;
}

interface Option {
  value: string;
  label: React.ReactNode;
}

interface DropdownHeaderProps {
  isOpen: boolean;
}

interface DropdownWrapperProps {
  isOpen: boolean;
}

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 345px;
`;

const DropdownHeader = styled.div<DropdownHeaderProps>`
  display: flex;
  gap: 6px;
  align-items: center;
  background-color: ${Colors.yellow};
  border: 2px solid ${Colors.black};
  font-size: 20px;
  font-weight: 300;
  font-family: "MontLight", sans-serif;
  height: 70px;
  justify-content: center;
  border-radius: 8px;
  padding: 10px;
  color: ${Colors.black};
  cursor: pointer;
  transition: 0.3s ease;
  box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  position: relative;

  &:focus {
    outline: none;
    box-shadow: 8px 8px 0px 0;
  }

  &::after {
    content: "";
    border: solid ${Colors.black};
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 5px;
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%)
      rotate(${(props) => (props.isOpen ? -135 : 45)}deg);
    transition: transform 0.3s ease;
  }
`;

const DropdownWrapper = styled.div<DropdownWrapperProps>`
  position: absolute;
  width: 70%;
  top: 100%;
  left: 5%;
  right: 0;
  background-color: ${Colors.beige};
  border: 2px solid ${Colors.black};
  box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  border-radius: 0 0 8px 8px;
  z-index: 1000;
  overflow: hidden;

  max-height: ${({ isOpen }) => (isOpen ? "200px" : "0")};
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  transition:
    max-height 0.3s ease,
    opacity 0.3s ease;
`;

const DropdownList = styled.ul`
  margin: 0;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;

  scrollbar-width: thin;
  scrollbar-color: ${Colors.mint} ${Colors.beige};

  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-track {
    background: ${Colors.beige};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${Colors.mint};
    border-radius: 6px;
    border: 3px solid ${Colors.beige};
  }
`;

const ListItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${Colors.mint};
  }
`;

const Select: React.FC<SelectProps> = ({ value, onChange, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const options: Option[] = (React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === "option") {
      const props = child.props;
      return { value: props.value, label: props.children };
    }
    return null;
  }) || []).filter((opt): opt is Option => opt !== null);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option: Option) => {
    onChange && onChange(option.value);
    setIsOpen(false);
  };

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.removeEventListener("mousedown", handleClickOutside);
    return () => {
      
    }
      
  }, []);

  return (
    <DropdownContainer ref={containerRef}>
      <DropdownHeader onClick={toggleOpen} tabIndex={0} isOpen={isOpen}>
        {selectedOption ? selectedOption.label : "Выберите значение"}
      </DropdownHeader>
      <DropdownWrapper isOpen={isOpen}>
        <DropdownList>
          {options.map((option) => (
            <ListItem
              key={option.value}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </ListItem>
          ))}
        </DropdownList>
      </DropdownWrapper>
    </DropdownContainer>
  );
};

export default Select;