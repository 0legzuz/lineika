import React, { useState, useRef } from "react";
import "./ProfileSectionStyles.tsx";
import styled from "styled-components";
import { User } from "../../types";
import TimeRangeSelector from "../TimeRangeSelector/TimeRangeSelector.tsx";
import Colors from "../../AppStyles.tsx";
import ActionButton from "../ui/ActionButton/ActionButton.tsx";

interface ProfileSectionProps {
  user: User;
  onSave: (data: Partial<User>) => void;
  onProfileFilled: (isFilled: boolean) => void;
  isFilled: boolean;
  userRole: "student" | "teacher";
}

const Section = styled.div<{ isCollapsed: boolean }>`
  padding: 20px;
  margin-bottom: 20px;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  width: 60%;
  border-radius: 10px;
  border: 2px solid ${Colors.black};
  -webkit-box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  -moz-box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  font-family: "Raleway", sans-serif;
  width: 100%;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const Textarea = styled.textarea`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const Text = styled.p`
  margin-bottom: 20px;
`;

const CollapsedContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  text-wrap:nowrap; 
  width: 100%;
`;

const ProfileSection: React.FC<ProfileSectionProps> = ({
  user,
  onSave,
  onProfileFilled,
  isFilled,
  userRole,
}) => {
  const [name, setName] = useState(user.name);
  const [photo, setPhoto] = useState(user.photo || "");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [timezone, setTimezone] = useState("");
  const [description, setDescription] = useState(user.description || "");
  const [availableTimes, setAvailableTimes] = useState<string[][]>([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = () => {
    const updatedData = {
      name,
      photo,
      birthdate,
      phone,
      gender,
      email,
      timezone,
      description,
      availableTimes,
    };
    onSave(updatedData);
    onProfileFilled(true);
    setIsCollapsed(true);
  };

  const handleEdit = () => {
    setIsCollapsed(false);
  };
  const handleSetAvailableTimes = (dayIndex: number, times: string[]) => {
    const updatedTimes = [...availableTimes];
    updatedTimes[dayIndex] = times;
    setAvailableTimes(updatedTimes);
  };
  return (
    <Section isCollapsed={isCollapsed}>
      {!isCollapsed && (
        <>
          <Text>
            Заполните обязательные поля для дальнейшей работы с платформой
          </Text>
          <label htmlFor="name">ФИО</label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="birthdate">Дата рождения</label>
          <Input
            type="date"
            id="birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />

          <label htmlFor="phone">Телефон</label>
          <Input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label htmlFor="gender">Пол</label>
          <Select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Выберите пол</option>
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
          </Select>
          <label htmlFor="email">Почта</label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="timezone">Часовой пояс</label>
          <Input
            type="text"
            id="timezone"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          />
          {userRole === "teacher" && (
            <>
              <label htmlFor="description">Описание профиля</label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <label>Свободное время на неделе</label>
              <TimeRangeSelector
                availableTimes={availableTimes}
                setAvailableTimes={handleSetAvailableTimes}
              />
            </>
          )}
          <label htmlFor="photo">Фото</label>
          <Input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handlePhotoChange}
          />
          <ActionButton
            onClick={handleSubmit}
            textButton="Сохранить"
            variant="mint"
          />
        </>
      )}
      {isCollapsed && (
        <CollapsedContent>
          <h2>Личные данные</h2>
          <ActionButton
            onClick={handleEdit}
            textButton="Изменить"
            variant="orange"
          />
        </CollapsedContent>
      )}
    </Section>
  );
};

export default ProfileSection;
