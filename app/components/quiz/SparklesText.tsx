'use client'

import { SparklesCore } from '@/components/ui/sparkles'
import { cn } from '@/lib/utils'

export function SparklesText({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  return (
    <div className={cn("relative w-fit", className)}>
      <h1 className="relative z-10">{text}</h1>
      <div className="absolute inset-0">
        <SparklesCore
          id="tsparticles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
    </div>
  )
}