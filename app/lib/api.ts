// lib/api.ts
import { Quiz, UserStats, Attempt, CalendarDay } from '@/types/quiz'

// Mock data for quizzes
// lib/api.ts

// Avval mockUserStats ni ta'riflang
const mockUserStats: UserStats = {
  total_quizzes: 2,
  attempts: [
    {
      quiz_id: 1,
      quiz_title: 'JavaScript Basics',
      score: 85,
      date: new Date('2023-05-15'),
      passed: true
    },
    {
      quiz_id: 2,
      quiz_title: 'React Fundamentals',
      score: 68,
      date: new Date('2023-06-20'),
      passed: false
    }
  ],
  calendar: [], // Boshlang'ich qiymat
  average_score: 76.5,
  highest_score: 85
}

// Keyin generateCalendarData funksiyasi
function generateCalendarData(): CalendarDay[] {
  const data: CalendarDay[] = []
  const today = new Date()
  const threeMonthsAgo = new Date(today)
  threeMonthsAgo.setMonth(today.getMonth() - 3)

  for (let d = new Date(threeMonthsAgo); d <= today; d.setDate(d.getDate() + 1)) {
    if (Math.random() > 0.7) {
      data.push({
        date: new Date(d),
        count: Math.floor(Math.random() * 4) + 1
      })
    }
  }

  // Endi mockUserStats ishlatish mumkin
  mockUserStats.attempts.forEach(attempt => {
    const existing = data.find(item => 
      item.date.toDateString() === attempt.date.toDateString()
    )
    if (existing) {
      existing.count += 1
    } else {
      data.push({
        date: new Date(attempt.date),
        count: 1
      })
    }
  })

  return data
}

// calendar ma'lumotini yaratish
mockUserStats.calendar = generateCalendarData()

// Qolgan kodlar...
const mockQuizzes: Quiz[] = [
  {
    id: 1,
    title: 'JavaScript Basics',
    slug: 'javascript-basics',
    description: 'Test your fundamental JavaScript knowledge',
    time_limit: 30,
    passing_score: 70,
    show_correct_answers: true,
    attempts_allowed: 3,
    created_at: new Date('2023-01-15'),
    updated_at: new Date('2023-01-20')
  },
  {
    id: 2,
    title: 'React Fundamentals',
    slug: 'react-fundamentals',
    description: 'Assess your React.js knowledge',
    time_limit: 45,
    passing_score: 75,
    show_correct_answers: true,
    attempts_allowed: 2,
    created_at: new Date('2023-02-10'),
    updated_at: new Date('2023-02-15')
  }
]

// // Mock data for user stats
// const mockUserStats: UserStats = {
//   total_quizzes: mockQuizzes.length,
//   attempts: [
//     {
//       quiz_id: 1,
//       quiz_title: 'JavaScript Basics',
//       score: 85,
//       date: new Date('2023-05-15'),
//       passed: true
//     },
//     {
//       quiz_id: 2,
//       quiz_title: 'React Fundamentals',
//       score: 68,
//       date: new Date('2023-06-20'),
//       passed: false
//     }
//   ],
//   calendar: generateCalendarData(),
//   average_score: 76.5,
//   highest_score: 85
// }

// Generate random calendar data for the last 3 months
// function generateCalendarData(): CalendarDay[] {
//   const data: CalendarDay[] = []
//   const today = new Date()
//   const threeMonthsAgo = new Date(today)
//   threeMonthsAgo.setMonth(today.getMonth() - 3)

//   for (let d = new Date(threeMonthsAgo); d <= today; d.setDate(d.getDate() + 1)) {
//     // Randomly include some activity days (about 30% of days)
//     if (Math.random() > 0.7) {
//       data.push({
//         date: new Date(d),
//         count: Math.floor(Math.random() * 4) + 1 // 1-4 attempts
//       })
//     }
//   }

//   // Add known dates from attempts
//   mockUserStats.attempts.forEach(attempt => {
//     const existing = data.find(item => 
//       item.date.toDateString() === attempt.date.toDateString()
//     )
//     if (existing) {
//       existing.count += 1
//     } else {
//       data.push({
//         date: new Date(attempt.date),
//         count: 1
//       })
//     }
//   })

//   return data
// }

// Simulate network delay
const simulateNetwork = async <T>(data: T): Promise<T> => {
  await new Promise(resolve => 
    setTimeout(resolve, Math.random() * 300 + 200) // 200-500ms delay
  )
  return data
}

// Mock API functions
export async function getQuizzes(): Promise<Quiz[]> {
  return simulateNetwork(mockQuizzes)
}

export async function getQuizBySlug(slug: string): Promise<Quiz | undefined> {
  const quiz = mockQuizzes.find(q => q.slug === slug)
  return simulateNetwork(quiz)
}

export async function getUserStats(): Promise<UserStats> {
  return simulateNetwork({
    ...mockUserStats,
    // Update calendar data each time to show fresh mock data
    calendar: generateCalendarData()
  })
}

export async function submitQuizAttempt(
  quizId: number,
  answers: Record<string, string>,
  timeSpent: number
): Promise<Attempt> {
  const quiz = mockQuizzes.find(q => q.id === quizId)
  if (!quiz) {
    throw new Error('Quiz not found')
  }

  // Simple scoring logic - 50% base score + random 0-50%
  const score = Math.floor(50 + Math.random() * 50)
  const passed = score >= quiz.passing_score

  const newAttempt: Attempt = {
    quiz_id: quizId,
    quiz_title: quiz.title,
    score,
    date: new Date(),
    passed
  }

  // Update mock stats
  mockUserStats.attempts.push(newAttempt)
  mockUserStats.average_score = calculateAverageScore()
  mockUserStats.highest_score = Math.max(...mockUserStats.attempts.map(a => a.score))

  return simulateNetwork(newAttempt)
}

function calculateAverageScore(): number {
  const sum = mockUserStats.attempts.reduce((total, attempt) => total + attempt.score, 0)
  return parseFloat((sum / mockUserStats.attempts.length).toFixed(1))
}

// Type exports
export type { Quiz, UserStats, Attempt, CalendarDay }