export interface User {
  id: string;
  name: string;
  role: "student" | "teacher" | "moderator";
  photo: string | null;
  description: string | null;
}

export interface Lesson {
  id: string;
  title: string;
  start: Date;
  end: Date;
  teacherId: string;
  studentId: string;
}

export interface GetCalendarResponse {
  lessons: Lesson[];
}
export interface GetTeachersResponse {
  teachers: User[];
}
export interface GetTeacherResponse {
  teacher: User;
}
export interface GetStudentsResponse {
  students: User[];
}
export interface GetStudentResponse {
  student: User;
}
export interface GetTestResponse {
  tests: Test[];
}
export interface GetTestByIdResponse {
  test: Test;
}
export interface Test {
  id: string;
  title: string;
  topics: string[];
  questions: QuestionWithAllAnswers[]; // New questions array without correctAnswer
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
  modifierId: string;
}
// New interface for a question with all answers
export interface QuestionWithAllAnswers {
  id: string;
  text: string;
  answers: string[];
}

// New interface for a leaderboard entry
export interface LeaderboardEntry {
  userId: string;
  name: string;
  averagescore: number;
  totalteststaken:number
}

