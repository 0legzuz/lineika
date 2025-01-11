import {
  GetCalendarResponse,
  GetStudentResponse,
  GetStudentsResponse,
  GetTeacherResponse,
  GetTeachersResponse,
  GetTestByIdResponse,
  GetTestResponse,
  Lesson,
  Test,
  User,
} from "../types";

// API заглушки (замените на реальные запросы к backend)

// Mock users data
const mockUsers: User[] = [
  { id: "1", name: "ученик", role: "student", status: "обучается" }, // Логин: John Doe, пароль: любой
  {
    id: "2",
    name: "препод",
    role: "teacher",
    status: "преподает",
    age: 35,
    experience: 10,
    description: "опытный преподаватель",
  },
];
const mockLessons: Lesson[] = [
  {
    id: "1",
    title: "Урок 1",
    teacherId: "2",
    studentId: "1",
    startTime: new Date("2025-01-12T10:00:00"),
    endTime: new Date("2025-01-12T11:00:00"),
    price: 100,
    status: "paid",
  },
  {
    id: "2",
    title: "Урок 2",
    teacherId: "2",
    studentId: "1",
    startTime: new Date("2025-01-13T14:00:00"),
    endTime: new Date("2025-01-13T15:00:00"),
    price: 150,
    status: "pending",
  },
  {
    id: "3",
    title: "Урок 2",
    teacherId: "2",
    studentId: "1",
    startTime: new Date("2025-01-13T15:00:00"),
    endTime: new Date("2025-01-13T16:00:00"),
    price: 150,
    status: "pending",
  },
];
const mockTests: Test[] = [
  {
    id: "1",
    title: "Математика для начинающих",
    topics: ["математика", "начинающие"],
    questions: [
      {
        id: "1",
        text: "2 + 2 = ?",
        correctAnswer: "4",
        incorrectAnswers: ["3", "5", "6"],
      },
      {
        id: "2",
        text: "3 * 3 = ?",
        correctAnswer: "9",
        incorrectAnswers: ["6", "8", "10"],
      },
    ],
  },
  {
    id: "2",
    title: "Биология 8 класс",
    topics: ["биология", "8 класс"],
    questions: [
      {
        id: "1",
        text: "Что такое клетка?",
        correctAnswer: "Основная структурная единица живого организма",
        incorrectAnswers: ["Единица измерения", "Форма материи", "Звезда"],
      },
      {
        id: "2",
        text: "Что такое фотосинтез?",
        correctAnswer:
          "Процесс образования органических веществ из неорганических",
        incorrectAnswers: [
          "Процесс разложения органических веществ",
          "Процесс дыхания",
          "Процесс деления клетки",
        ],
      },
    ],
  },
];
export const api = {
  async login(login: string, password: string): Promise<User | null> {
    const user = mockUsers.find((user) => user.name === login);
    if (user) return Promise.resolve(user);
    return Promise.resolve(null);
  },
  async getTeachers(): Promise<GetTeachersResponse> {
    const teachers = mockUsers.filter(
      (user) => user.role === "teacher"
    ) as User[];
    return Promise.resolve({ teachers: teachers as any });
  },
  async getTeacher(teacherId: string): Promise<GetTeacherResponse> {
    const teacher = mockUsers.find((user) => user.id === teacherId) as any;
    return Promise.resolve({ teacher });
  },
  async getStudents(): Promise<GetStudentsResponse> {
    const students = mockUsers.filter(
      (user) => user.role === "student"
    ) as User[];
    return Promise.resolve({ students: students as any });
  },
  async getStudent(studentId: string): Promise<GetStudentResponse> {
    const student = mockUsers.find((user) => user.id === studentId) as any;
    return Promise.resolve({ student });
  },
  async getCalendar(
    userId: string,
    role: "teacher" | "student"
  ): Promise<GetCalendarResponse> {
    const user = mockUsers.find((user) => user.id === userId);
    if (user) {
      const userLessons = mockLessons.filter((lesson) =>
        role === "student"
          ? lesson.studentId === userId
          : lesson.teacherId === userId
      );

      const calendarDays = userLessons.reduce((acc, lesson) => {
        const date = new Date(
          lesson.startTime.getFullYear(),
          lesson.startTime.getMonth(),
          lesson.startTime.getDate()
        );
        const existingDay = acc.find(
          (day) => day.date.getTime() === date.getTime()
        );
        if (existingDay) {
          existingDay.events.push(lesson);
        } else {
          acc.push({ date: date, events: [lesson] });
        }
        return acc;
      }, [] as any) as any;

      return Promise.resolve({ calendarDays });
    }
    return Promise.reject(new Error("User not found"));
  },
  async addLesson(lesson: Lesson): Promise<Lesson> {
    return Promise.resolve(lesson);
  },
  async getTests(): Promise<GetTestResponse> {
    return Promise.resolve({ tests: mockTests });
  },
  async getTestById(testId: string): Promise<GetTestByIdResponse> {
    const test = mockTests.find((test) => test.id === testId);
    if (test) return Promise.resolve({ test });
    return Promise.reject(new Error("test not found"));
  },
  async addTest(test: Test): Promise<Test> {
    return Promise.resolve(test);
  },
};
