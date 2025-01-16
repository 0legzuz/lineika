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
