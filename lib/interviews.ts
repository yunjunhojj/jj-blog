import { readFileSync } from "fs";
import { join } from "path";
import type { Interview, InterviewData } from "@/types/interview";

const interviewsDirectory = join(process.cwd(), "content/interviews");

export function getAllInterviews(): Interview[] {
  const filePath = join(interviewsDirectory, "questions.json");
  const fileContents = readFileSync(filePath, "utf8");
  const data: InterviewData = JSON.parse(fileContents);
  return data.interviews;
}

export function getRandomInterview(): Interview | null {
  const interviews = getAllInterviews();

  if (interviews.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * interviews.length);
  return interviews[randomIndex];
}

export function getInterviewsByCategory(
  category: Interview["category"]
): Interview[] {
  const interviews = getAllInterviews();
  return interviews.filter((interview) => interview.category === category);
}

export function getInterviewsByDifficulty(
  difficulty: Interview["difficulty"]
): Interview[] {
  const interviews = getAllInterviews();
  return interviews.filter((interview) => interview.difficulty === difficulty);
}
