'use client'

import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { BackgroundGradient } from '@/components/ui/background-gradient'
import { Tilt } from '@/components/ui/tilt'
import { Calendar } from '@/components/ui/calendar'
import { CalendarDay } from '@/types/quiz'

interface CalendarHeatmapProps {
  data: CalendarDay[]
}

export function CalendarHeatmap({ data }: CalendarHeatmapProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <BackgroundGradient className="rounded-[22px] p-1">
        <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5}>
          <Card className="bg-background/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="text-primary">Activity Calendar</CardTitle>
            </CardHeader>
            <div className="p-6">
              <Calendar
                mode="multiple"
                selected={data.map(item => item.date)}
                className="rounded-md border"
                modifiers={{
                  highlighted: data.filter(item => item.count > 2).map(item => item.date),
                }}
                modifiersStyles={{
                  highlighted: {
                    backgroundColor: '#3b82f6',
                    color: 'white',
                  },
                  selected: {
                    backgroundColor: '#1d4ed8',
                    color: 'white',
                  }
                }}
              />
              <div className="mt-4 flex justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm bg-blue-700" />
                  <span>Quiz Attempt</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm bg-blue-300" />
                  <span>Multiple Attempts</span>
                </div>
              </div>
            </div>
          </Card>
        </Tilt>
      </BackgroundGradient>
    </motion.div>
  )
}