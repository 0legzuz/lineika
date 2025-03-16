export interface Question {
    id: string;
    text: string;
    correctAnswer: string;
    incorrectAnswers: string[];
  }
  
  export interface Test {
    id: string;
    title: string;
    topics: string[];
    questions: Question[];
    status: "pending" | "approved" | "rejected";
    createdAt: Date;
    updatedAt: Date;
    creatorId: string;
    modifierId: string;
  }

  export interface QuestionWithAllAnswers {
    id: string;
    text: string;
    answers: string[];
  }
