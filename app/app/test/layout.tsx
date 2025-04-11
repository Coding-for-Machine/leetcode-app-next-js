import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import { SparklesCore } from '@/components/ui/sparkles'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'], 
  variable: '--font-space-grotesk' 
})

export const metadata: Metadata = {
  title: 'QuizMaster Pro',
  description: 'Elevate your knowledge with interactive quizzes',
}

export default function RootLayout({
  children,
  quizlist,
  userstats,
}: {
  children: React.ReactNode
  quizlist: React.ReactNode
  userstats: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        inter.variable,
        spaceGrotesk.variable,
        "min-h-screen bg-background font-sans antialiased relative"
      )}>
        {/* Background Sparkles */}
        <div className="fixed inset-0 -z-10">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-4rem)]">
              {/* Scrollable Quiz List (2/3 width) */}
              <div className="lg:w-2/3 h-full">
                <div 
                  className="h-full overflow-y-auto invisible-scrollbar"
                >
                  {quizlist}
                </div>
              </div>
              
              {/* Sticky User Stats (1/3 width) */}
              <div className="lg:w-1/3 h-full">
                <div 
                  className="h-full overflow-y-auto invisible-scrollbar"
                >
                  {userstats}
                </div>
              </div>
            </div>
            <Toaster richColors position="top-right" />
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}