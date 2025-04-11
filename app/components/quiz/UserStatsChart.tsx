// components/quiz/UserStatsChart.tsx
'use client'

import { AreaChart, Card, Title } from '@tremor/react'
import { motion } from 'framer-motion'
import { BackgroundGradient } from '@/components/ui/background-gradient'
import { Attempt } from '@/types/quiz'

interface UserStatsChartProps {
  data: Attempt[]
}

export function UserStatsChart({ data }: UserStatsChartProps) {
  // Transform attempt data into chart format
  const chartData = data.map(attempt => ({
    date: formatDate(attempt.date),
    Score: attempt.score,
    Quiz: attempt.quiz_title
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <BackgroundGradient className="rounded-[22px] p-1">
        <Card className="bg-background/50 backdrop-blur-sm border-border">
          <Title className="text-primary">Your Progress Over Time</Title>
          <AreaChart
            className="mt-6 h-60"
            data={chartData}
            index="date"
            categories={['Score']}
            colors={['blue']}
            valueFormatter={(number: number) => `${number}%`}
            showAnimation
            animationDuration={2000}
            curveType="monotone"
            yAxisWidth={40}
          />
        </Card>
      </BackgroundGradient>
    </motion.div>
  )
}

// Helper function to format dates
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: '2-digit'
  }).format(date)
}