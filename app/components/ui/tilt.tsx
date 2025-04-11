'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import React, { useEffect, useRef } from 'react'

interface TiltProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  tiltMaxAngleX?: number
  tiltMaxAngleY?: number
  transitionSpeed?: number
}

export const Tilt = ({
  children,
  tiltMaxAngleX = 10,
  tiltMaxAngleY = 10,
  transitionSpeed = 300,
  className,
  ...props
}: TiltProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 })
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 })
  
  const rotateX = useTransform(ySpring, [-100, 100], [-tiltMaxAngleX, tiltMaxAngleX])
  const rotateY = useTransform(xSpring, [-100, 100], [tiltMaxAngleY, -tiltMaxAngleY])

  useEffect(() => {
    const currentRef = ref.current
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!currentRef) return
      
      const rect = currentRef.getBoundingClientRect()
      const xVal = ((e.clientX - rect.left) / rect.width - 0.5) * 200
      const yVal = ((e.clientY - rect.top) / rect.height - 0.5) * 200
      
      x.set(xVal)
      y.set(yVal)
    }

    currentRef?.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      currentRef?.removeEventListener('mousemove', handleMouseMove)
    }
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transition: `transform ${transitionSpeed}ms ease-out`
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}