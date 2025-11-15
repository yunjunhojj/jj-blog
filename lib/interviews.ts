import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import type { Interview, InterviewData } from "@/types/interview";

const interviewsDirectory = join(process.cwd(), "content/interviews");

export function getAllInterviews(): Interview[] {
  const allInterviews: Interview[] = [];

  const files = readdirSync(interviewsDirectory);
  const jsonFiles = files.filter((file) => file.endsWith(".json"));

  // 각 JSON 파일을 읽어서 합치기
  jsonFiles.forEach((file) => {
    try {
      const filePath = join(interviewsDirectory, file);
      const fileContents = readFileSync(filePath, "utf8");
      const data: InterviewData = JSON.parse(fileContents);

      if (data.interviews && Array.isArray(data.interviews)) {
        allInterviews.push(...data.interviews);
      }
    } catch (error) {
      console.error(`Error reading ${file}:`, error);
    }
  });

  return allInterviews;
}

export function getInterviewsByFile(fileName: string): Interview[] {
  try {
    const filePath = join(interviewsDirectory, fileName);
    const fileContents = readFileSync(filePath, "utf8");
    const data: InterviewData = JSON.parse(fileContents);

    if (data.interviews && Array.isArray(data.interviews)) {
      return data.interviews;
    }

    return [];
  } catch (error) {
    console.error(`Error reading ${fileName}:`, error);
    return [];
  }
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
