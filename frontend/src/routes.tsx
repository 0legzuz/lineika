import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import NotFoundPage from "./pages/NotFoundPage";
import StudentDashboardPage from "./pages/StudentDashboardPage";
import TeacherDashboardPage from "./pages/TeacherDashboardPage";
import TeacherListPage from "./pages/TeacherListPage";
import TeacherProfilePage from "./pages/TeacherProfilePage";
import StudentProfilePage from "./pages/StudentProfilePage";
import PricePage from "./pages/PricePage";
import TestPage from "./pages/TestPage";
import TestListPage from "./pages/TestListPage";
import { AuthProvider } from "./contexts/AuthContext";
import AlternativeMainPage from "./pages/AlternativeMainPage";

const AppRoutes: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<AlternativeMainPage />} />
        <Route path="/student" element={<StudentDashboardPage />} />
        <Route path="/teacher" element={<TeacherDashboardPage />} />
        <Route path="/teachers" element={<TeacherListPage />} />
        <Route path="/teachers/:id" element={<TeacherProfilePage />} />
        <Route path="/students/:id" element={<StudentProfilePage />} />
        <Route path="/prices" element={<PricePage />} />
        <Route path="/tests/:id" element={<TestPage />} />
        <Route path="/tests" element={<TestListPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
