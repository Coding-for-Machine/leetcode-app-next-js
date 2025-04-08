'use client'

import { BackgroundBeams } from '@/components/home/background-beams'
import { CardHoverEffect } from '@/components/home/card-hover'
import { GlobeDemo } from '@/components/home/globe'
import { LampDemo } from '@/components/home/lamp'
import { motion } from 'framer-motion'
import { SparklesCore } from "@/components/ui/sparkles";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Meteors } from "@/components/ui/meteors";
import { WavyBackground } from "@/components/ui/wavy-background";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const words = [
  { text: "Kodlash" },
  { text: "Mahoratingizni" },
  { text: "Oshiring", className: "text-blue-500" }
]

const testimonials = [
  {
    quote: "Bu platforma mening algoritmik tafakkurimni sezilarli darajada oshirdi.",
    name: "Ali Valiyev",
    title: "Senior Dasturchi"
  },
  {
    quote: "Intervyularga tayyorlanish uchun ajoyib resurs. Har kuni yangi masalalar!",
    name: "Dilfuza Rahimova",
    title: "Frontend Developer"
  },
  {
    quote: "Qiyin masalalarni tushuntirish usuli juda yaxshi ishlab chiqilgan.",
    name: "Sarvar Xo'jayev",
    title: "Fullstack Engineer"
  }
]

const problems = [
  {
    title: "Ikki Son Yig'indisi",
    description: "Massivdan ikkita sonni toping",
    difficulty: "Oson",
    solved: true
  },
  {
    title: "Palindrome Number",
    description: "Son palindrome ekanligini tekshiring",
    difficulty: "Oson",
    solved: false
  },
  {
    title: "Reverse Linked List",
    description: "Bog'langan ro'yxatni teskari aylantiring",
    difficulty: "Oʻrtacha",
    solved: true
  },
  {
    title: "Median of Two Arrays",
    description: "Ikkita saralangan massiv medianasi",
    difficulty: "Qiyin",
    solved: false
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* 1. Background Effects */}
      <BackgroundBeams />
      <SparklesCore
        id="tsparticles"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={50}
        className="w-full h-full absolute top-0 left-0"
        particleColor="#3b82f6"
      />
      
      {/* 2. Hero Section with Lamp Effect */}
      <LampDemo>
        <TypewriterEffect words={words} className="mt-10" />
        <TextGenerateEffect 
          words="2000+ masalalar, tanlovlar va intervyu tayyorlash resurslari"
          className="text-lg md:text-xl text-slate-300 mt-4"
        />
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition-all"
          >
            Boshlash
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-blue-500 text-blue-500 hover:bg-blue-900/30 px-8 py-3 rounded-lg font-medium text-lg transition-all"
          >
            Masalalarni Ko'rish
          </motion.button>
        </div>
      </LampDemo>

      {/* 3. Globe Demo */}
      <div className="relative h-[500px] w-full">
        <GlobeDemo />
        <Meteors number={20} className="absolute top-0 left-0 w-full h-full" />
      </div>

      {/* 4. Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
        >
          Bizning Statistika
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '127', label: 'Yechilgan Masalalar', icon: '✅' },
            { value: '85', label: 'Oson Masalalar', icon: '😊' },
            { value: '32', label: 'Oʻrtacha Masalalar', icon: '🤔' },
            { value: '10', label: 'Qiyin Masalalar', icon: '🔥' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm hover:border-blue-500 transition-colors"
            >
              <div className="text-3xl font-bold text-blue-500 mb-2">{stat.value}</div>
              <div className="text-slate-300">{stat.label}</div>
              <div className="mt-2 text-yellow-400 text-2xl">{stat.icon}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 5. Problems Section with Card Hover Effect */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
        >
          Tavsiya Etilgan Masalalar
        </motion.h2>
        
        <CardHoverEffect items={problems} />
      </div>

      {/* 6. Testimonials with Wavy Background */}
      <WavyBackground className="py-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
        >
          Foydalanuvchilar Fikrlari
        </motion.h2>
        
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="slow"
        />
      </WavyBackground>

      {/* 7. Call to Action */}
      <div className="relative h-[40vh] w-full flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <SparklesCore
            id="cta-particles"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center relative z-10 px-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Hozir Boshlang!</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Kodlash mahoratingizni keyingi bosqichga olib chiqing. Birinchi masalani yechish uchun 5 daqiqadan ko'p vaqt ketmaydi.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all shadow-lg hover:shadow-blue-500/30">
            Ro'yxatdan O'tish - Bepul
          </button>
        </motion.div>
      </div>
    </div>
  )
}