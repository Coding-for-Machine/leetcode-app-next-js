'use client'

import { motion } from 'framer-motion'
import { Quiz } from '@/types/quiz'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Info } from 'lucide-react'
import { BackgroundGradient } from '@/components/ui/background-gradient'
import Link from 'next/link'

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function QuizCard({ quiz, index }: { quiz: Quiz, index: number }) {
  const completionRate = 75 // From user stats
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }}
    >
      <BackgroundGradient className="rounded-[22px] p-1">
        <Card className="hover:shadow-lg transition-shadow border-border bg-background/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  {quiz.title}
                </CardTitle>
                <CardDescription className="mt-2">
                  {quiz.description}
                </CardDescription>
              </div>
              <Badge variant="secondary" className="px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-800">
                {quiz.time_limit} mins
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Passing Score: {quiz.passing_score}%
                  </span>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Minimum score required: {quiz.passing_score}%
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Progress value={completionRate} className="h-2 bg-gradient-to-r from-blue-900 to-blue-700" />
              </div>
              <div className="text-sm text-muted-foreground">
                {quiz.attempts_allowed || '∞'} attempts
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="default" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-purple-500/30">
              <Link href={`/quiz/${quiz.slug}`}>
                Start Quiz
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </BackgroundGradient>
    </motion.div>
  )
}