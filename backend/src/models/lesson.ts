export interface Lesson {
  id: string;
  title: string;
  teacherId: string;
  studentId: string;
  startTime: string;
  endTime: string;
  price: number;
  status: "pending" | "paid";
  conferenceLink?: string;
  note?: string;
  homework?: string;
}
