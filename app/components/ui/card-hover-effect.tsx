'use client'

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const CardHoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    icon?: string;
    [key: string]: any;
  }[];
  className?: string;
}) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          whileHover={{ y: -10 }}
          transition={{ duration: 0.2 }}
          className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition-colors"
        >
          {item.icon && <div className="text-2xl mb-4">{item.icon}</div>}
          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
          <p className="text-gray-400">{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
};