import React, { useState, useRef, useEffect } from "react";
import "./ProfileSectionStyles.tsx";
import styled from "styled-components";
import { User } from "../../types";
import TimeRangeSelector from "../TimeRangeSelector/TimeRangeSelector";
import Colors from "../../AppStyles";
import ActionButton from "../ui/ActionButton/ActionButton";
import { api } from "../../services/api";
import Select from "../ui/Select/Select";
import Input from "../ui/Input/Input";

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
  width: 70vw;
  border-radius: 10px;
  border: 2px solid ${Colors.black};
  box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  font-family: "Raleway", sans-serif;
`;

const Textarea = styled.textarea`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  border-radius: 8px;
  border: 2px solid ${Colors.black};
  box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  resize: none;
  transition: 0.3s ease;
  width: 100%;
  height: 200px;
  font-family: "MontLight";
  font-size: 20px;
  font-weight: 300;

  &::placeholder {
    color: ${Colors.black};
  }

  &:focus {
    outline: none;
    box-shadow: 8px 8px 0 0;
  }
`;

const Text = styled.p`
  margin-bottom: 20px;
`;

const CollapsedContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  text-wrap: nowrap;
  width: 100%;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 10px;
`;

const StyledLabel = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
  font-size: 20px;
  font-family: "Raleway", sans-serif;
  margin-left: 8px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(300px, 1fr));
  gap: 20px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const HiddenInput = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  display: flex;
  gap: 6px;
  align-items: center;
  background-color: ${Colors.beige};
  border: 2px solid ${Colors.black};
  font-size: 20px;
  font-weight: 300;
  font-family: "MontLight", sans-serif;
  height: 70px;
  width: 100%;
  max-width: 345px;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease;
  box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  padding: 10px;

  &:focus {
    outline: none;
    box-shadow: 8px 8px 0 0;
  }
`;

const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  background-color: ${Colors.mint};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 8px;
  border: 2px solid ${Colors.black};
  box-shadow: 3px 3px 0px 0 rgba(0, 0, 0, 1);
  text-align: center;
  margin-top: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const ProfileSection: React.FC<ProfileSectionProps> = ({
  user,
  onSave,
  onProfileFilled,
  isFilled,
  userRole,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState<string>("");
  const [middlename, setMiddlename] = useState<string>("");
  const [photo, setPhoto] = useState<string | null>(user.photo || null);
  const [birthdate, setBirthdate] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [timezone, setTimezone] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [availableTimes, setAvailableTimes] = useState<string[][]>([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);
  const [fetchError, setFetchError] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [userClass, setUserClass] = useState<string>("");
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const response = await api.getUser(user.id);
          const userData = response.user;
          if (userData) {
            const [surnameValue, nameValue, middlenameValue] = (
              userData.name || ""
            ).split(" ");
            setName(nameValue || "");
            setSurname(surnameValue || "");
            setMiddlename(middlenameValue || "");
            setPhoto(userData.photo || null);
            setImageError(false);
            if (userData.birthdate) {
              const formattedBirthdate = formatDate(userData.birthdate);
              setBirthdate(formattedBirthdate);
            } else {
              setBirthdate("");
            }
            setPhone(userData.phone || "");
            setGender(userData.gender || "");
            setEmail(userData.email || "");
            setTimezone(userData.timezone || "");
            setDescription(userData.description || "");
            setUserClass((userData as any).class || "");
            setFetchError(false);

            const fieldsFilled =
              surnameValue &&
              nameValue &&
              middlenameValue &&
              userData.birthdate &&
              userData.phone &&
              userData.gender &&
              userData.email &&
              userData.timezone;
            setIsCollapsed(Boolean(fieldsFilled));
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          setFetchError(true);
        }
      };
      fetchUserData();
    }
  }, [user]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
        setImageError(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone: string) =>
    /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/.test(phone);
  const isValidBirthdate = (date: string) =>
    /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/.test(date);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name) newErrors.name = "ФИО обязательно";
    if (!surname) newErrors.surname = "Фамилия обязательна";
    if (!middlename) newErrors.middlename = "Отчество обязательна";
    if (!birthdate) newErrors.birthdate = "Дата рождения обязательна";
    else if (!isValidBirthdate(birthdate))
      newErrors.birthdate = "Неверный формат даты, используйте дд.мм.гггг";
    if (!phone) newErrors.phone = "Телефон обязателен";
    else if (!isValidPhone(phone))
      newErrors.phone =
        "Неверный формат номера телефона, используйте +7 (999) 999-99-99";
    if (!gender) newErrors.gender = "Пол обязателен";
    if (!email) newErrors.email = "Почта обязательна";
    else if (!isValidEmail(email)) newErrors.email = "Неверный формат почты";
    if (!timezone) newErrors.timezone = "Часовой пояс обязателен";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const transformedAvailableTimes = availableTimes.map(
      (times) => `{${times.join(",")}}`
    );
    const updatedData = {
      name: `${surname} ${name} ${middlename}`,
      photo: photo || null,
      birthdate: birthdate ? birthdate.split(".").reverse().join("-") : null,
      phone: phone || null,
      gender: gender || null,
      email: email || null,
      timezone: timezone || null,
      description: description || null,
      availableTimes: transformedAvailableTimes || null,
      ...(userRole === "student" && { class: userClass }),
    };

    await api.updateUser(user.id, updatedData);
    onProfileFilled(true);
    setIsCollapsed(true);
    localStorage.setItem("isProfileFilled", "true");
  };

  const handleEdit = () => {
    setIsCollapsed(false);
    localStorage.setItem("isProfileFilled", "false");
  };

  const handleSetAvailableTimes = (dayIndex: number, times: string[]) => {
    const updatedTimes = [...availableTimes];
    updatedTimes[dayIndex] = times;
    setAvailableTimes(updatedTimes);
  };

  const timeZoneOptions = [];
  for (let relativeOffset = -12; relativeOffset <= 12; relativeOffset++) {
    const absoluteOffset = 3 + relativeOffset;
    const label =
      relativeOffset === 0
        ? "МСК+0"
        : `МСК${relativeOffset > 0 ? `+${relativeOffset}` : relativeOffset}`;
    const sign = absoluteOffset >= 0 ? "+" : "";
    timeZoneOptions.push({ value: `UTC${sign}${absoluteOffset}`, label });
  }

  const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthdate(e.target.value);
  };

  return (
    <Section isCollapsed={isCollapsed}>
      {isCollapsed ? (
        fetchError ? (
          <ErrorMessage>Ошибка загрузки данных</ErrorMessage>
        ) : (
          <CollapsedContent>
            <ImageContainer>
              {photo && !imageError ? (
                <Image
                  src={photo}
                  alt="Фото пользователя"
                  onError={() => setImageError(true)}
                />
              ) : (
                <StyledLabel>Фото не добавлено</StyledLabel>
              )}
            </ImageContainer>
            <h2>
              {surname && name && middlename
                ? `${surname} ${name} ${middlename}`
                : "Данные не заполнены"}
            </h2>
            <ActionButton
              onClick={handleEdit}
              textButton="Изменить"
              variant="orange"
            />
          </CollapsedContent>
        )
      ) : (
        <>
          {fetchError && (
            <ErrorMessage>
              Ошибка загрузки данных. Поля могут быть пустыми.
            </ErrorMessage>
          )}
          <Text>
            Заполните обязательные поля для дальнейшей работы с платформой
          </Text>
          <FormGrid>
            {/* Поля формы остаются без изменений */}
            <FieldGroup>
              <StyledLabel htmlFor="surname">Фамилия</StyledLabel>
              <Input
                type="text"
                id="surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                placeholder="Иванов"
                fullWidth={true}
              />
              {errors.surname && <ErrorMessage>{errors.surname}</ErrorMessage>}
            </FieldGroup>
            <FieldGroup>
              <StyledLabel htmlFor="name">Имя</StyledLabel>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Иван"
                fullWidth={true}
              />
              {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
            </FieldGroup>
            <FieldGroup>
              <StyledLabel htmlFor="middlename">Отчество</StyledLabel>
              <Input
                type="text"
                id="middlename"
                value={middlename}
                onChange={(e) => setMiddlename(e.target.value)}
                placeholder="Иванович"
                fullWidth={true}
              />
              {errors.middlename && (
                <ErrorMessage>{errors.middlename}</ErrorMessage>
              )}
            </FieldGroup>
            <FieldGroup>
              <StyledLabel htmlFor="birthdate">Дата рождения</StyledLabel>
              <Input
                type="text"
                id="birthdate"
                value={birthdate}
                onChange={handleBirthdateChange}
                placeholder="дд.мм.гггг"
                mask="99.99.9999"
                fullWidth={true}
              />
              {errors.birthdate && (
                <ErrorMessage>{errors.birthdate}</ErrorMessage>
              )}
            </FieldGroup>
            <FieldGroup>
              <StyledLabel htmlFor="phone">Телефон</StyledLabel>
              <Input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (999) 999-99-99"
                mask="+7 (999) 999-99-99"
                fullWidth={true}
              />
              {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
            </FieldGroup>
            <FieldGroup>
              <StyledLabel htmlFor="gender">Пол</StyledLabel>
              <Select value={gender} onChange={(value) => setGender(value)}>
                <option value="">Выберите пол</option>
                <option value="male">Мужской</option>
                <option value="female">Женский</option>
              </Select>
              {errors.gender && <ErrorMessage>{errors.gender}</ErrorMessage>}
            </FieldGroup>
            <FieldGroup>
              <StyledLabel htmlFor="email">Почта</StyledLabel>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                fullWidth={true}
              />
              {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            </FieldGroup>
            <FieldGroup>
              <StyledLabel htmlFor="timezone">Часовой пояс</StyledLabel>
              <Select value={timezone} onChange={(value) => setTimezone(value)}>
                <option value="">Выберите часовой пояс</option>
                {timeZoneOptions.map((timeZone) => (
                  <option key={timeZone.value} value={timeZone.value}>
                    {timeZone.label}
                  </option>
                ))}
              </Select>
              {errors.timezone && (
                <ErrorMessage>{errors.timezone}</ErrorMessage>
              )}
            </FieldGroup>
            <FieldGroup>
              <StyledLabel htmlFor="photo">Фото</StyledLabel>
              <FileLabel htmlFor="photo">
                {photo ? "Изменить фото" : "Выберите файл"}
              </FileLabel>
              <HiddenInput
                type="file"
                id="photo"
                accept="image/*"
                ref={fileInputRef}
                onChange={handlePhotoChange}
              />
              {selectedFileName && <div>Прикреплён: {selectedFileName}</div>}
              <ImageContainer>
                {photo && !imageError ? (
                  <Image
                    src={photo}
                    alt="Фото пользователя"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <StyledLabel>Фото не добавлено</StyledLabel>
                )}
              </ImageContainer>
            </FieldGroup>
            {userRole === "student" && (
              <FieldGroup>
                <StyledLabel htmlFor="class">Класс обучения</StyledLabel>
                <Input
                  type="number"
                  id="class"
                  value={userClass}
                  onChange={(e) => setUserClass(e.target.value)}
                  placeholder="10"
                />
              </FieldGroup>
            )}
            {userRole === "teacher" && (
              <>
                <FieldGroup>
                  <StyledLabel htmlFor="description">
                    Описание профиля
                  </StyledLabel>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FieldGroup>
                <FieldGroup>
                  <StyledLabel>Свободное время на неделе</StyledLabel>
                  <TimeRangeSelector
                    availableTimes={availableTimes}
                    setAvailableTimes={handleSetAvailableTimes}
                  />
                </FieldGroup>
              </>
            )}
          </FormGrid>
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <ActionButton
              onClick={handleSubmit}
              textButton="Сохранить"
              variant="mint"
              disabled={isFilled}
            />
            <ActionButton
              onClick={() => setIsCollapsed(true)}
              textButton="Свернуть"
              variant="orange"
            />
          </div>
        </>
      )}
    </Section>
  );
};

export default ProfileSection;
