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
import axios from "axios";
const API_URL = "http://localhost:3001/api";
// API заглушки (замените на реальные запросы к backend)

export const api = {
  async login(login: string, password: string): Promise<User | null> {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        login,
        password,
      });
      return response.data as User;
    } catch (e) {
      return null;
    }
  },
  async register(
    login: string,
    password: string,
    role: "student" | "teacher" | "moderator"
  ): Promise<User | null> {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        login,
        password,
        role,
      });
      return response.data as User;
    } catch (e: any) {
      console.error("Registration error: ", e);
      return null;
    }
  },
  async getTeachers(): Promise<GetTeachersResponse> {
    const response = await axios.get(`${API_URL}/users`);
    const teachers = response.data.filter(
      (user: User) => user.role === "teacher"
    );
    return { teachers: teachers as any };
  },
  async getTeacher(teacherId: string): Promise<GetTeacherResponse> {
    const response = await axios.get(`${API_URL}/users/${teacherId}`);
    return { teacher: response.data as any };
  },
  async getStudents(): Promise<GetStudentsResponse> {
    const response = await axios.get(`${API_URL}/users`);
    const students = response.data.filter(
      (user: User) => user.role === "student"
    );
    return { students: students as any };
  },
  async getStudent(studentId: string): Promise<GetStudentResponse> {
    const response = await axios.get(`${API_URL}/users/${studentId}`);
    return { student: response.data as any };
  },
  async getUser(
    userId: string
  ): Promise<GetStudentResponse | GetTeacherResponse> {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return { user: response.data };
  },
  async updateUser(userId: string, data: Partial<User>): Promise<User> {
    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        if (value === null) {
          continue;
        }
        if (key === "photo") {
          if (typeof value === "string") {
            const response = await fetch(value);
            const blob = await response.blob();
            formData.append(key, blob, "photo.jpg");
          }
        } else if (typeof value === "object") {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value as string);
        }
      }
    }
    const response = await axios.patch(`${API_URL}/users/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  async getCalendar(
    userId: string,
    role: "teacher" | "student"
  ): Promise<GetCalendarResponse> {
    const response = await axios.get(`${API_URL}/lessons/${userId}/${role}`);
    return response.data;
  },
  async addLesson(lesson: Lesson): Promise<Lesson> {
    const response = await axios.post(`${API_URL}/lessons`, lesson);
    return response.data;
  },
  async getTests(): Promise<GetTestResponse> {
    const response = await axios.get(`${API_URL}/tests`);
    return response.data;
  },
  async getTestById(testId: string): Promise<GetTestByIdResponse> {
    const response = await axios.get(`${API_URL}/tests/${testId}`);
    return response.data;
  },
  async addTest(test: Test): Promise<Test> {
    const response = await axios.post(`${API_URL}/tests`, test);
    return response.data;
  },
  async updateTestStatus(
    testId: string,
    status: "pending" | "approved" | "rejected"
  ): Promise<Test | undefined> {
    const response = await axios.patch(`${API_URL}/tests/${testId}`, {
      status,
    });
    return response.data;
  },
};
