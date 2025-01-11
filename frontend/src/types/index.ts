export interface User {
  id: string;
  name: string;
  photo?: string;
  status?: string;
  age?: number;
  experience?: number;
  description?: string;
  role: "student" | "teacher" | "moderator";
}

export interface Teacher extends User {
  experience: number;
  description: string;
}

export interface Student extends User {
  class: string;
}

export interface Lesson {
  id: string;
  title: string;
  teacherId: string;
  studentId: string;
  startTime: Date;
  endTime: Date;
  price: number;
  status: "pending" | "paid";
  conferenceLink?: string;
  note?: string;
  homework?: string;
}

export interface CalendarDay {
  date: Date;
  events: Lesson[];
}
export interface Test {
  id: string;
  title: string;
  topics: string[];
  questions: Question[];
  status?: "pending" | "approved" | "rejected";
}

export interface Question {
  id: string;
  text: string;
  correctAnswer: string;
  incorrectAnswers: string[];
}

export interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

// Типы для запросов/ответов API
export interface GetTeachersResponse {
  teachers: Teacher[];
}

export interface GetTeacherResponse {
  teacher: Teacher;
}
export interface GetStudentsResponse {
  students: Student[];
}

export interface GetStudentResponse {
  student: Student;
}

export interface GetCalendarResponse {
  calendarDays: CalendarDay[];
}

export interface GetTestResponse {
  tests: Test[];
}

export interface GetTestByIdResponse {
  test: Test;
}
