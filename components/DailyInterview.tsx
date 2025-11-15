"use client";

import { useState, useEffect } from "react";
import InterviewModal from "./InterviewModal";
import type { Interview } from "@/types/interview";

interface DailyInterviewProps {
  interviews: Interview[];
}

export default function DailyInterview({ interviews }: DailyInterviewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentInterview, setCurrentInterview] = useState<Interview | null>(
    null
  );

  useEffect(() => {
    if (interviews.length > 0) {
      const randomIndex = Math.floor(Math.random() * interviews.length);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setCurrentInterview(interviews[randomIndex]);
    }
  }, [interviews]);

  if (!currentInterview) {
    return null;
  }

  const interview = currentInterview;

  const difficultyColors: Record<Interview["difficulty"], string> = {
    easy: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    medium:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    hard: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  };

  const difficultyLabels: Record<Interview["difficulty"], string> = {
    easy: "쉬움",
    medium: "보통",
    hard: "어려움",
  };

  const categoryLabels: Record<Interview["category"], string> = {
    frontend: "프론트엔드",
    backend: "백엔드",
    javascript: "JavaScript",
    react: "React",
    typescript: "TypeScript",
    cs: "CS",
    algorithm: "알고리즘",
  };

  return (
    <>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 rounded-lg shadow-sm p-6 border border-blue-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            🎲 랜덤 면접 질문
          </h3>
          <span
            className={`px-2 py-1 text-xs font-medium rounded ${
              difficultyColors[interview.difficulty]
            }`}
          >
            {difficultyLabels[interview.difficulty]}
          </span>
        </div>

        <div className="mb-3">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded">
            {categoryLabels[interview.category]}
          </span>
        </div>

        <p className="text-sm text-gray-800 dark:text-gray-200 font-medium leading-relaxed mb-4">
          {interview.question}
        </p>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors shadow-sm hover:shadow-md"
        >
          답변 확인하기 →
        </button>

        <div className="mt-3 pt-3 border-t border-blue-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            페이지를 새로고침하면 다른 질문이 표시됩니다
          </p>
        </div>
      </div>

      <InterviewModal
        interview={interview}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
