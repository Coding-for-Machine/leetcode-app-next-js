'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BackgroundBeams } from '@/components/home/background-beams'
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"
import { SparklesCore } from "@/components/ui/sparkles"
import { WavyBackground } from "@/components/ui/wavy-background"
import { CardHoverEffect } from '@/components/ui/card-hover-effect'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useDarkMode } from '@/hooks/useDarkMode'
import { Navbar } from '@/components/navbar'


// Massivlarni komponentdan tashqarida e'lon qilish

const features = [
  {
    title: "2000+ Masalalar",
    description: "Har qiyinlik darajasidagi algoritmik masalalar",
    icon: "💻",
    link: "/problems"
  },
  {
    title: "Intervyu Tayyorlov",
    description: "FAANG kompaniyalariga intervyu tayyorlovchi masalalar",
    icon: "🎯",
    link: "/interview-prep"
  },
  {
    title: "Real Loyihalar",
    description: "Amaliy loyihalarda ishlatiladigan kod nümunələri",
    icon: "🚀",
    link: "/projects"
  },
  {
    title: "Jamoaviy Musobaqalar",
    description: "Haftalik kodlash musobaqalari va reyting tizimi",
    icon: "🏆",
    link: "/contests"
  }
]

const testimonials = [
  {
    quote: "Bu platforma mening algoritmik tafakkurimni sezilarli darajada oshirdi.",
    name: "Ali Valiyev",
    title: "Senior Dasturchi",
    avatar: "/avatars/1.jpg"
  },
  {
    quote: "Intervyularga tayyorlanish uchun ajoyib resurs. Har kuni yangi masalalar!",
    name: "Dilfuza Rahimova",
    title: "Frontend Developer",
    avatar: "/avatars/2.jpg"
  },
  {
    quote: "Qiyin masalalarni tushuntirish usuli juda yaxshi ishlab chiqilgan.",
    name: "Sarvar Xo'jayev",
    title: "Fullstack Engineer",
    avatar: "/avatars/3.jpg"
  }
]

const stats = [
  { value: "10,000+", label: "Foydalanuvchilar" },
  { value: "50,000+", label: "Yechilgan Masalalar" },
  { value: "100+", label: "Hamkor Kompaniyalar" }
]

const difficultyLevels = [
  { level: "Boshlang'ich", value: 30, color: "bg-green-500 dark:bg-green-400" },
  { level: "O'rta", value: 60, color: "bg-yellow-500 dark:bg-yellow-400" },
  { level: "Qiyin", value: 90, color: "bg-red-500 dark:bg-red-400" }
]

const recentProblems = [
  { id: 1, title: "Ikki sonning yig'indisi", difficulty: "easy", solved: 85 },
  { id: 2, title: "Massivdagi eng katta element", difficulty: "easy", solved: 72 },
  { id: 3, title: "Palindrome tekshirish", difficulty: "medium", solved: 58 },
  { id: 4, title: "Grafda eng qisqa yo'l", difficulty: "hard", solved: 32 },
  { id: 5, title: "Dinamik dasturlash: Summa", difficulty: "hard", solved: 25 }
]

const programmingLanguages = [
  "Python", "JavaScript", "Java", "C++", "C#", "Go", "Ruby", "Swift", "Kotlin", "Rust"
]

const words = [
  { text: "Kodlash" },
  { text: "Mahoratingizni" },
  { text: "Oshiring", className: "text-[#4285F4] dark:text-[#8AB4F8]" }
]

// ... (testimonials, features, stats, difficultyLevels, recentProblems, programmingLanguages massivlari)

export default function Home() {
  const { darkMode, toggleDarkMode, mounted } = useDarkMode()
  const [activeTab, setActiveTab] = useState("problems")
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return null

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-[#121212] text-[#E0E0E0]' : 'bg-[#FFFFFF] text-[#202124]'} relative overflow-hidden transition-colors duration-300`}>
      {/* Navigation */}
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>

      {/* Hero Section */}
      <div className={`relative h-screen w-full flex items-center justify-center pt-16 ${darkMode ? '' : 'bg-gradient-to-b from-[#F8F9FA] to-white'}`}>
        {darkMode && <BackgroundBeams className="absolute top-0 left-0 w-full h-full" />}
        {darkMode && (
          <SparklesCore
            id="hero-particles"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full absolute"
            particleColor="#8AB4F8"
          />
        )}
        
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TypewriterEffect words={words} className="mb-6" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TextGenerateEffect 
              words="Algoritmlar, Dasturlash Musobaqalari va Intervyu Tayyorlov Platformasi"
              className={`text-lg md:text-xl ${darkMode ? 'text-[#B0B0B0]' : 'text-[#131415]'} mb-8 max-w-3xl mx-auto`}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button className={`h-12 px-8 py-3 text-lg font-medium ${darkMode ? 'bg-[#4285F4] hover:bg-[#3367D6]' : 'bg-[#4285F4] hover:bg-[#3367D6]'} text-white`}>
              Boshlash
            </Button>
            
            <Button variant="outline" className={`h-12 px-8 py-3 text-lg font-medium ${darkMode ? 'border-[#8AB4F8] text-[#8AB4F8] hover:bg-[#4285F4]/10' : 'border-[#4285F4] text-[#4285F4] hover:bg-[#4285F4]/10'}`}>
              Demo Ko'rish
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16"
          >
            <div className={`w-full h-[1px] bg-gradient-to-r from-transparent ${darkMode ? 'via-[#8AB4F8]' : 'via-[#4285F4]'} to-transparent mb-4`}></div>
            <div className={`${darkMode ? 'text-[#70757A]' : 'text-[#9AA0A6]'} text-sm`}>Ishonchli hamkorlarimiz</div>
            <div className="flex flex-wrap justify-center gap-6 mt-4">
              {["Google", "Microsoft", "Amazon", "Uzum", "Payme", "Yandex", "EPAM"].map((company, i) => (
                <div key={i} className={`${darkMode ? 'text-[#B0B0B0] hover:text-white' : 'text-[#5F6368] hover:text-[#202124]'} transition-colors`}>
                  {company}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {darkMode && (
            <SparklesCore
              id="features-particles"
              background="transparent"
              minSize={0.4}
              maxSize={1.2}
              particleDensity={40}
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              particleColor="#8AB4F8"
              speed={0.3}
            />
          )}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className={`text-3xl md:text-5xl font-bold text-center mb-4 ${darkMode ? 'text-white' : 'text-[#202124]'}`}
        >
          Platformamizning Afzalliklari
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className={`text-lg ${darkMode ? 'text-[#B0B0B0]' : 'text-[#5F6368]'} text-center max-w-3xl mx-auto mb-16`}
        >
          Kodlash mahoratingizni keyingi bosqichga olib chiqadigan barcha vositalar
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`p-6 rounded-xl ${darkMode ? 'bg-[#1E1E1E] hover:border-[#4285F4]' : 'bg-white hover:border-[#4285F4]'} border ${darkMode ? 'border-[#333]' : 'border-[#E0E0E0]'} transition-all hover:shadow-lg`}
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-[#202124]'}`}>{feature.title}</h3>
              <p className={`${darkMode ? 'text-[#B0B0B0]' : 'text-[#5F6368]'} mb-4`}>{feature.description}</p>
              <Button 
                variant="link" 
                className={`p-0 h-auto ${darkMode ? 'text-[#8AB4F8]' : 'text-[#4285F4]'} hover:no-underline`}
              >
                Batafsil →
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Problems & Learning Section */}
      <div className={`relative ${darkMode ? 'bg-[#1E1E1E]' : 'bg-[#F8F9FA]'} py-20`}>
        {darkMode && (
          <SparklesCore
            id="problems-particles"
            background="transparent"
            minSize={0.3}
            maxSize={0.8}
            particleDensity={25}
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            particleColor="#8AB4F8"
            speed={0.2}
          />
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="problems" className="w-full">
            <TabsList className={`grid w-full grid-cols-2 ${darkMode ? 'bg-[#2D2D2D] border-[#333]' : 'bg-white border-[#E0E0E0]'} rounded-lg border mb-8`}>
              <TabsTrigger 
                value="problems" 
                className={`${darkMode ? 'data-[state=active]:bg-[#333] data-[state=active]:text-white' : 'data-[state=active]:bg-[#E8F0FE] data-[state=active]:text-[#4285F4]'}`}
              >
                Masalalar
              </TabsTrigger>
              <TabsTrigger 
                value="learning" 
                className={`${darkMode ? 'data-[state=active]:bg-[#333] data-[state=active]:text-white' : 'data-[state=active]:bg-[#E8F0FE] data-[state=active]:text-[#4285F4]'}`}
              >
                O'rganish
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="problems">
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#202124]'}`}>So'ngi Masalalar</h3>
                  <div className="space-y-4">
                    {recentProblems.map((problem) => (
                      <div 
                        key={problem.id} 
                        className={`p-4 rounded-lg border ${darkMode ? 'border-[#333] hover:border-[#4285F4]' : 'border-[#E0E0E0] hover:border-[#4285F4]'} transition-colors`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-[#202124]'}`}>{problem.title}</h4>
                            <Badge 
                              variant="outline" 
                              className={`mt-2 ${
                                problem.difficulty === "easy" ? 
                                  darkMode ? 'text-green-400 border-green-400' : 'text-green-600 border-green-600' :
                                problem.difficulty === "medium" ? 
                                  darkMode ? 'text-yellow-400 border-yellow-400' : 'text-yellow-600 border-yellow-600' :
                                  darkMode ? 'text-red-400 border-red-400' : 'text-red-600 border-red-600'
                              }`}
                            >
                              {problem.difficulty}
                            </Badge>
                          </div>
                          <div className={`text-sm ${darkMode ? 'text-[#B0B0B0]' : 'text-[#5F6368]'}`}>
                            {problem.solved}% yechgan
                          </div>
                        </div>
                        <Progress 
                          value={problem.solved} 
                          className="mt-3 h-2" 
                          indicatorClassName={
                            problem.difficulty === "easy" ? 
                              darkMode ? 'bg-green-400' : 'bg-green-600' :
                            problem.difficulty === "medium" ? 
                              darkMode ? 'bg-yellow-400' : 'bg-yellow-600' :
                              darkMode ? 'bg-red-400' : 'bg-red-600'
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#202124]'}`}>Qidirish</h3>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="search">Masala nomi bo'yicha qidirish</Label>
                      <Input 
                        id="search" 
                        placeholder="Masala nomini yozing..." 
                        className={`mt-2 ${darkMode ? 'bg-[#2D2D2D] border-[#333]' : 'bg-white border-[#E0E0E0]'}`} 
                      />
                    </div>
                    
                    <div>
                      <Label>Dasturlash tillari</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {programmingLanguages.map((lang) => (
                          <Badge 
                            key={lang} 
                            variant="outline" 
                            className={`cursor-pointer ${darkMode ? 'hover:bg-[#333]' : 'hover:bg-[#F1F3F4]'}`}
                          >
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label>Qiyinlik darajasi</Label>
                      <div className="space-y-2 mt-2">
                        {difficultyLevels.map((level) => (
                          <div key={level.level} className="flex items-center gap-3">
                            <div className={`w-24 ${darkMode ? 'text-[#E0E0E0]' : 'text-[#202124]'}`}>{level.level}</div>
                            <Progress 
                              value={level.value} 
                              className="h-2 flex-1" 
                              indicatorClassName={level.color}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="learning">
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: "📚", title: "Algoritmlar asoslari", description: "Algoritmlar va ma'lumotlar tuzilmalarini o'rganish uchun boshlang'ich qo'llanma" },
                  { icon: "🎓", title: "Intervyu tayyorlov", description: "Yirik texnologik kompaniyalarga intervyuga tayyorlovchi maxsus kurs" },
                  { icon: "🏁", title: "Musobaqalar", description: "Haftalik kodlash musobaqalari va ularga tayyorlovchi mashqlar" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`border ${darkMode ? 'border-[#333] hover:border-[#4285F4]' : 'border-[#E0E0E0] hover:border-[#4285F4]'} rounded-lg p-6 transition-colors`}
                  >
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h4 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-white' : 'text-[#202124]'}`}>{item.title}</h4>
                    <p className={`${darkMode ? 'text-[#B0B0B0]' : 'text-[#5F6368]'} mb-4`}>{item.description}</p>
                    <Button 
                      variant="outline" 
                      className={`${darkMode ? 'border-[#8AB4F8] text-[#8AB4F8] hover:bg-[#4285F4]/10' : 'border-[#4285F4] text-[#4285F4] hover:bg-[#4285F4]/10'}`}
                    >
                      Boshlash
                    </Button>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative py-20">
      {darkMode && (
          <SparklesCore
            id="problems-particles"
            background="transparent"
            minSize={0.3}
            maxSize={0.8}
            particleDensity={25}
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            particleColor="#8AB4F8"
            speed={0.2}
          />
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`text-center p-8 border ${darkMode ? 'border-[#333] hover:border-[#4285F4]' : 'border-[#E0E0E0] hover:border-[#4285F4]'} rounded-lg transition-colors`}
              >
                <div className="text-4xl md:text-5xl font-bold text-[#4285F4] dark:text-[#8AB4F8] mb-2">{stat.value}</div>
                <div className={`${darkMode ? 'text-[#B0B0B0]' : 'text-[#5F6368]'}`}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <WavyBackground className="py-20" colors={darkMode ? ["#1E1E1E", "#2D2D2D"] : ["#E8F0FE", "#F1F3F4"]}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {darkMode && (
          <SparklesCore
            id="problems-particles"
            background="transparent"
            minSize={0.3}
            maxSize={0.8}
            particleDensity={25}
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            particleColor="#8AB4F8"
            speed={0.2}
          />
        )}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={`text-3xl md:text-5xl font-bold text-center mb-4 ${darkMode ? 'text-white' : 'text-[#202124]'}`}
          >
            Biz Haqimizda Fikrlar
          </motion.h2>
          
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
            pauseOnHover={true}
            className={`${darkMode ? 'bg-[#2D2D2D]' : 'bg-white'}`}
          />
        </div>
      </WavyBackground>

      {/* Community Section */}
      <div className={`relative py-20 ${darkMode ? 'bg-[#1E1E1E]' : 'bg-[#F8F9FA]'}`}>
      {darkMode && (
          <SparklesCore
            id="problems-particles"
            background="transparent"
            minSize={0.3}
            maxSize={0.8}
            particleDensity={25}
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            particleColor="#8AB4F8"
            speed={0.2}
          />
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`text-3xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#202124]'}`}
            >
              Jamiyatdagi Faol Foydalanuvchilar
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className={`text-lg ${darkMode ? 'text-[#B0B0B0]' : 'text-[#5F6368]'} max-w-3xl mx-auto`}
            >
              Platformamizning eng faol va yutuqlarga erishgan a'zolari
            </motion.p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((user) => (
              <motion.div
                key={user}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: user * 0.05 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <Avatar className="w-20 h-20 mb-3 border-2 border-[#4285F4] dark:border-[#8AB4F8]">
                  <AvatarImage src={`/avatars/${user % 3 + 1}.jpg`} />
                  <AvatarFallback>U{user}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-[#202124]'}`}>Foydalanuvchi {user}</h4>
                  <Badge variant="secondary" className="mt-1">
                    {user * 125} ball
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-32 overflow-hidden">
        <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-br from-[#0F0F0F] via-[#121212] to-[#1E1E1E]' : 'bg-gradient-to-br from-[#E8F0FE] via-[#F8F9FA] to-[#FFFFFF]'}`}></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {darkMode && (
          <SparklesCore
            id="problems-particles"
            background="transparent"
            minSize={0.3}
            maxSize={0.8}
            particleDensity={25}
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            particleColor="#8AB4F8"
            speed={0.2}
          />
        )}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={`text-3xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-[#202124]'}`}
          >
            Kodlash Mahoratingizni Oshirishga Tayyormisiz?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className={`text-lg ${darkMode ? 'text-[#B0B0B0]' : 'text-[#5F6368]'} mb-8 max-w-2xl mx-auto`}
          >
            Hoziroq ro'yxatdan o'ting va dasturlash bo'yicha bilimingizni keyingi bosqichga olib chiqing.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button className={`h-12 px-8 py-3 text-lg font-medium ${darkMode ? 'bg-[#4285F4] hover:bg-[#3367D6]' : 'bg-[#4285F4] hover:bg-[#3367D6]'} text-white`}>
              Ro'yxatdan O'tish
            </Button>
            
            <Button variant="outline" className={`h-12 px-8 py-3 text-lg font-medium ${darkMode ? 'border-[#8AB4F8] text-[#8AB4F8] hover:bg-[#4285F4]/10' : 'border-[#4285F4] text-[#4285F4] hover:bg-[#4285F4]/10'}`}>
              Masalalarni Ko'rish
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`relative border-t ${darkMode ? 'border-[#333]' : 'border-[#E0E0E0]'} py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#202124]'}`}>CodeUz</h3>
              <p className={`${darkMode ? 'text-[#B0B0B0]' : 'text-[#5F6368]'}`}>
                O'zbekistonning eng yirik dasturlash hamjamiyati va o'rganish platformasi
              </p>
            </div>
            
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#202124]'}`}>Sahifalar</h3>
              <ul className="space-y-2">
                {["Bosh sahifa", "Masalalar", "Musobaqalar", "Reyting"].map((item) => (
                  <li key={item}>
                    <a href="#" className={`${darkMode ? 'text-[#B0B0B0] hover:text-white' : 'text-[#5F6368] hover:text-[#202124]'} transition-colors`}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#202124]'}`}>Resurslar</h3>
              <ul className="space-y-2">
                {["Darsliklar", "Blog", "Forum", "Hamkorlik"].map((item) => (
                  <li key={item}>
                    <a href="#" className={`${darkMode ? 'text-[#B0B0B0] hover:text-white' : 'text-[#5F6368] hover:text-[#202124]'} transition-colors`}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#202124]'}`}>Aloqa</h3>
              <ul className="space-y-2">
                {["Telegram", "Instagram", "Email", "Biz bilan bog'lanish"].map((item) => (
                  <li key={item}>
                    <a href="#" className={`${darkMode ? 'text-[#B0B0B0] hover:text-white' : 'text-[#5F6368] hover:text-[#202124]'} transition-colors`}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <Separator className={`my-8 ${darkMode ? 'bg-[#333]' : 'bg-[#E0E0E0]'}`} />
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className={`${darkMode ? 'text-[#70757A]' : 'text-[#9AA0A6]'} text-sm mb-4 md:mb-0`}>
              © 2023 CodeUz. Barcha huquqlar himoyalangan.
            </div>
            <div className="flex space-x-6">
              <a href="#" className={`${darkMode ? 'text-[#70757A] hover:text-white' : 'text-[#9AA0A6] hover:text-[#202124]'} transition-colors`}>
                Foydalanish shartlari
              </a>
              <a href="#" className={`${darkMode ? 'text-[#70757A] hover:text-white' : 'text-[#9AA0A6] hover:text-[#202124]'} transition-colors`}>
                Maxfiylik siyosati
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}