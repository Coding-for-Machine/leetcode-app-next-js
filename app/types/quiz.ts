// types/index.ts
export interface Quiz {
    id: number
    title: string
    slug: string
    description: string
    time_limit: number
    passing_score: number
    show_correct_answers: boolean
    attempts_allowed: number
    created_at: Date
    updated_at: Date
  }
  
  export interface UserStats {
    total_quizzes: number
    attempts: Attempt[]
    calendar: CalendarDay[]
    average_score: number
    highest_score: number
  }
  
  export interface Attempt {
    quiz_id: number
    quiz_title: string
    score: number
    date: Date
    passed: boolean
  }
  
  export interface CalendarDay {
    date: Date
    count: number
  }
  
  export interface QuizQuestion {
    id: number
    quiz_id: number
    question_text: string
    options: string[]
    correct_answer: string
    explanation: string
  }