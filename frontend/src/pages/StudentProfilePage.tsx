import React from "react";
import { useParams } from "react-router-dom";

const StudentProfilePage: React.FC = () => {
  const { id } = useParams();
  // Здесь должен быть запрос к API для получения данных о студенте по ID
  return (
    <div>
      <h1>Страница студента</h1>
      <p>ID студента: {id}</p>
      {/* Здесь будет отображение данных студента */}
    </div>
  );
};

export default StudentProfilePage;
