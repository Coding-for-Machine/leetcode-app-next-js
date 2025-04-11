// app/user-stats/page.tsx
import { Suspense } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { SparklesText } from '@/components/quiz/SparklesText'
import { AnimatedTooltip } from '@/components/quiz/AnimatedTooltip'
import { UserStatsChart } from '@/components/quiz/UserStatsChart'
import { CalendarHeatmap } from '@/components/quiz/CalendarHeatmap'
import { getUserStats } from '@/lib/api'
import { BackgroundBeams } from '@/components/ui/background-beams'
import { SparklesCore } from '@/components/ui/sparkles'

export default async function UserStatsPage() {
  const stats = await getUserStats()
  
  // Transform data for the components
  const serializedStats = {
    ...stats,
    calendar: stats.calendar.map(item => ({
      date: new Date(item.date),
      count: item.count
    })),
    attempts: stats.attempts
      .map(attempt => ({
        ...attempt,
        date: new Date(attempt.date)
      }))
      // Sort attempts by date
      .sort((a, b) => a.date.getTime() - b.date.getTime())
  }

  return (
    <div className="space-y-8">
      <SparklesText text="Your Progress" className="text-3xl font-bold" />
      
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AnimatedTooltip items={[
              {
                id: 1,
                name: 'You',
                designation: 'Quiz Master',
                image: '/path-to-user-avatar.jpg',
              }
            ]} />
            <span>Performance Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<Skeleton className="h-64 w-full rounded-lg" />}>
            <UserStatsChart data={serializedStats.attempts} />
          </Suspense>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader>
          <CardTitle>Activity Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <CalendarHeatmap data={serializedStats.calendar} />
        </CardContent>
      </Card>
      <BackgroundBeams />
    </div>
  )
}