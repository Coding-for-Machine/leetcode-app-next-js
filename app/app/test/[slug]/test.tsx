// app/test/[slug]/TestSlugClient.tsx (Client Component)
"use client";

import React from "react";
import useSWR from 'swr';

interface QuizDetail {
  id: number;
  title: string;
  slug: string;
  description: string;
  time_limit: number;
  passing_score: number;
  show_correct_answers: boolean;
  attempts_allowed: number;
  created_at: Date;
  updated_at: Date;
  questions: Question[];
  questions_count: number;
}

interface Question {
  id: number;
  description: string;
  answers: Answer[];
}

interface Answer {
  id: number;
  description: string;
  is_correct: boolean;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function TestSlugClient({ slug }: { slug: string }) {
  const DJANGO_QUIZ_API = `http://127.0.0.1:8000/api/quizzes/${slug}`;
  const { data, error, isLoading } = useSWR<QuizDetail>(DJANGO_QUIZ_API, fetcher);

  if (error) return <div className="p-4 text-red-500">Failed to load</div>;
  if (isLoading) return <div className="p-4">Loading...</div>;
  if (!data) return null;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
      <p className="text-gray-600 mb-4">{data.description}</p>
      
      <div className="mb-4">
        <p><strong>Time Limit:</strong> {data.time_limit} minutes</p>
        <p><strong>Passing Score:</strong> {data.passing_score}%</p>
        <p><strong>Attempts Allowed:</strong> {data.attempts_allowed}</p>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2">Questions</h2>
      {data.questions.map((q, idx) => (
        <div key={q.id} className="mb-4 p-4 border rounded bg-white shadow">
          <p className="font-medium">{idx + 1}. {q.description}</p>
          <ul className="mt-2 space-y-1">
            {q.answers.map((a) => (
              <li key={a.id} className="ml-4">
                - {a.description}
                {data.show_correct_answers && a.is_correct && (
                  <span className="text-green-600 font-semibold ml-2">✔</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}