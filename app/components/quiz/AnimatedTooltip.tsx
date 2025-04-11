'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number
    name: string
    designation: string
    image: string
  }[]
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-row items-center">
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="relative group"
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {hoveredIndex === item.id && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: 'spring',
                  stiffness: 260,
                  damping: 10,
                },
              }}
              className="absolute -top-16 -left-1/2 z-50 flex w-min flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-sm shadow-xl"
            >
              <div className="text-xs text-white font-bold">
                {item.name}
              </div>
              <div className="text-xs text-white">
                {item.designation}
              </div>
            </motion.div>
          )}
          <Avatar className="h-8 w-8 border-2 border-white">
            <AvatarImage src={item.image} />
            <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      ))}
    </div>
  )
}