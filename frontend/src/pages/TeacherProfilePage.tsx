import React from "react";
import { useParams } from "react-router-dom";

const TeacherProfilePage: React.FC = () => {
  const { id } = useParams();
  // Здесь должен быть запрос к API для получения данных о преподавателе по ID
  return (
    <div>
      <h1>Страница преподавателя</h1>
      <p>ID преподавателя: {id}</p>
      {/* Здесь будет отображение данных преподавателя */}
    </div>
  );
};

export default TeacherProfilePage;
