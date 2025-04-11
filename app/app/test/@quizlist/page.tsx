// app/quizlist/page.tsx
'use client'

import { Suspense, useEffect, useState } from 'react'
import { getQuizzes, Quiz } from '@/lib/api'
import { Skeleton } from '@/components/ui/skeleton'
import { SparklesText } from '@/components/quiz/SparklesText'
import QuizCard from '@/components/quiz/QuizCard'
import { BackgroundBeams } from '@/components/ui/background-beams'
import { SparklesCore } from '@/components/ui/sparkles'

export default function QuizListPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])

  useEffect(() => {
    const fetchQuizzes = async () => {
      const data = await getQuizzes()
      setQuizzes(data)
    }
    fetchQuizzes()
  }, [])

  return (
    <div className="space-y-8">
     
      <SparklesText text="Available Quizzes" className="text-3xl font-bold" />
      
      <Suspense fallback={
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
      }>
        <div className="grid gap-6">
          {quizzes.map((quiz, index) => (
            <QuizCard key={quiz.id} quiz={quiz} index={index} />
          ))}
        </div>
      </Suspense>
      <BackgroundBeams />
    </div>
  )
}