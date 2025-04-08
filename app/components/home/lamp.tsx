'use client'

import { motion } from 'framer-motion'
import { TextGenerateEffect } from './text-generate'

export const LampDemo = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden bg-slate-950 w-full pt-20 pb-20">
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        <motion.div
          initial={{ opacity: 0.5, width: '15rem' }}
          whileInView={{ opacity: 1, width: '30rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut'
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-gradient-to-r from-blue-400 to-blue-600 opacity-75"
        />
        
        <div className="absolute z-50 h-px w-full bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
        
        <div className="absolute inset-auto z-40 h-full w-full bg-slate-950 opacity-90" />
        
        <motion.div
          initial={{ width: '8rem' }}
          whileInView={{ width: '16rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut'
          }}
          className="absolute inset-auto z-40 h-0.5 w-64 -translate-y-[7rem] bg-blue-600"
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            delay: 0.4,
            duration: 0.8,
            ease: 'easeInOut'
          }}
          className="absolute z-50 mt-4 h-12 w-[40rem] -translate-y-[1.5rem] rounded-full bg-blue-600 blur-xl"
        />
        
        <div className="absolute z-30 h-40 w-full -translate-y-[12.5rem] bg-slate-950" />
      </div>

      <div className="relative z-50 flex flex-col items-center px-5">
        {children}
      </div>
    </div>
  )
}