export interface Interview {
  question: string;
  answer: string;
  category:
    | "frontend"
    | "backend"
    | "javascript"
    | "react"
    | "typescript"
    | "cs"
    | "algorithm";
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
}

export interface InterviewData {
  interviews: Interview[];
}
