'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export const CardHoverEffect = ({ items }: { items: any[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item, idx) => (
        <Card key={idx} item={item} />
      ))}
    </div>
  )
}

const Card = ({ item }: { item: any }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-blue-500 transition-all h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white">{item.title}</h3>
        <span className={cn(
          "px-2 py-1 text-xs rounded-full",
          item.difficulty === 'Oson' ? 'bg-green-900/50 text-green-400' :
          item.difficulty === 'Oʻrtacha' ? 'bg-yellow-900/50 text-yellow-400' :
          'bg-red-900/50 text-red-400'
        )}>
          {item.difficulty}
        </span>
      </div>
      <p className="text-slate-400 mb-6">{item.description}</p>
      <div className="flex justify-between items-center">
        <span className={cn(
          "text-sm",
          item.solved ? 'text-green-500' : 'text-slate-500'
        )}>
          {item.solved ? 'Yechilgan' : 'Yechilmagan'}
        </span>
        <button className="text-blue-500 hover:text-blue-400 text-sm font-medium">
          Ko'rish →
        </button>
      </div>
    </motion.div>
  )
}