'use client'
import {
  ArrowPathIcon,
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline"
import { useState, useEffect } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { vscodeDark } from "@uiw/codemirror-theme-vscode"
import { javascript } from "@codemirror/lang-javascript"
import { python } from "@codemirror/lang-python"
import { go } from "@codemirror/lang-go"
import Split from "react-split"
import { Problem } from "@/types/problems"
import toast from "react-hot-toast"
import { ISettings } from "./Workspace"
// export interface ISettings {
//   fontSize: string | undefined;
//   settingsModalIsOpen: boolean;
//   dropdownIsOpen: boolean;
// }

type PlaygroundProps = {
  problem: Problem
  problemData: any // Add this prop for the fetched data
  id: string
  setSolved: (solved: boolean) => void
  settings: ISettings
  setSettings: (settings: ISettings) => void
}

type Language = 'javascript' | 'python' | 'go'

export default function PlayGround({
  problem,
  problemData, // Get data from props instead of SWR
  id,
  setSolved,
  settings,
  setSettings
}: PlaygroundProps) {
  // State
  const [language, setLanguage] = useState<Language>('javascript')
  const [userCode, setUserCode] = useState(problem.starterCode)
  const [activeTestCaseId, setActiveTestCaseId] = useState(0)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [testcaseActive, setTestcaseActive] = useState(true)
  const [isConsoleOpen, setIsConsoleOpen] = useState(true)
  const [executionResult, setExecutionResult] = useState<{
    actual?: any[]
    results?: boolean[]
    success?: boolean
  }>({})

  // Remove SWR calls since we get data from props now
  const examples = problemData?.examples || problem.examples || []

  // Language extensions map
  const languageExtensions = {
    javascript: javascript(),
    python: python(),
    go: go()
  }

  // Load saved code and language
  useEffect(() => {
    const savedLanguage = localStorage.getItem(`language-${id}`) as Language | null
    const savedCode = localStorage.getItem(`code-${id}-${savedLanguage || language}`)
    
    if (savedLanguage) setLanguage(savedLanguage)
    if (savedCode) setUserCode(savedCode)
  }, [id, language])

  // Handle code execution
  const handleSubmit = async () => {
    try {
      // Save code before execution
      localStorage.setItem(`code-${id}-${language}`, userCode)
      
      // Execute code via API
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          problemId: id,
          language,
          code: userCode
        })
      })

      const result = await response.json()
      
      if (result.success) {
        toast.success("Accepted", {
          style: {
            background: "#333",
            color: "#fff",
          },
        })
        setSolved(true)
      } else {
        toast.error("One or more test cases failed", {
          style: {
            background: "#333",
            color: "#fff",
          },
        })
      }

      setExecutionResult(result)
      setTestcaseActive(false)
    } catch (error) {
      toast.error("Execution failed", {
        style: {
          background: "#333",
          color: "#fff",
        },
      })
    }
  }

  // Change programming language
  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem(`language-${id}`, lang)
  }

  // Fullscreen toggle
  const toggleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen()
    } else {
      document.documentElement.requestFullscreen()
    }
    setIsFullScreen(!isFullScreen)
  }

  return (
    <div className="h-full">
      {!isConsoleOpen ? (
        <div className="bg-[#282828] h-[calc(100vh-69px)] rounded-lg flex flex-col">
          {/* Editor header */}
          <div className="flex justify-between px-5 h-9 bg-[#303030] items-center border-b border-[#454545]">
            <div className="flex items-center">
              <select 
                value={language}
                onChange={(e) => changeLanguage(e.target.value as Language)}
                className="bg-transparent text-xs text-[#eff1f6bf]"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="go">Go</option>
              </select>
            </div>
            <div className="flex space-x-5">
              <button onClick={toggleFullScreen}>
                {isFullScreen ? (
                  <ArrowsPointingInIcon className="h-4 text-[#8A8A8A] hover:text-[#eff1f6bf]" />
                ) : (
                  <ArrowsPointingOutIcon className="h-4 text-[#8A8A8A] hover:text-[#eff1f6bf]" />
                )}
              </button>
            </div>
          </div>

          {/* Code editor */}
          <div className="flex-1 overflow-auto">
            <CodeMirror
              value={userCode}
              theme={vscodeDark}
              onChange={setUserCode}
              extensions={[languageExtensions[language]]}
              style={{ fontSize: settings.fontSize }}
            />
          </div>

          {/* Console toggle */}
          <div className="flex justify-between px-5 h-11 bg-[#303030] items-center border-t border-[#454545]">
            <button 
              onClick={() => setIsConsoleOpen(true)}
              className="flex items-center text-xs text-[#eff1f6bf] hover:text-white"
            >
              Console <ChevronUpIcon className="h-3 ml-2" />
            </button>
            <div className="flex space-x-5">
              <button 
                onClick={handleSubmit}
                className="text-xs bg-[#2cbb5d] hover:bg-[#4CC575] px-5 py-1 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Split
          className="h-[calc(100vh-69px)]"
          direction="vertical"
          sizes={[60, 40]}
          minSize={60}
        >
          {/* Editor pane */}
          <div className="bg-[#282828] rounded-lg flex flex-col">
            {/* Editor header */}
            <div className="flex justify-between px-5 h-9 bg-[#303030] items-center border-b border-[#454545]">
              <div className="flex items-center">
                <select 
                  value={language}
                  onChange={(e) => changeLanguage(e.target.value as Language)}
                  className="bg-transparent text-xs text-[#eff1f6bf]"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="go">Go</option>
                </select>
              </div>
              <div className="flex space-x-5">
                <button onClick={toggleFullScreen}>
                  {isFullScreen ? (
                    <ArrowsPointingInIcon className="h-4 text-[#8A8A8A] hover:text-[#eff1f6bf]" />
                  ) : (
                    <ArrowsPointingOutIcon className="h-4 text-[#8A8A8A] hover:text-[#eff1f6bf]" />
                  )}
                </button>
              </div>
            </div>

            {/* Code editor */}
            <div className="flex-1 overflow-auto">
              <CodeMirror
                value={userCode}
                theme={vscodeDark}
                onChange={setUserCode}
                extensions={[languageExtensions[language]]}
                style={{ fontSize: settings.fontSize }}
              />
            </div>
          </div>

          {/* Console pane */}
          <div className="bg-[#282828] rounded-lg flex flex-col">
            {/* Console tabs */}
            <div className="flex px-5 h-9 bg-[#303030] items-center border-b border-[#454545]">
              <button
                onClick={() => setTestcaseActive(true)}
                className={`text-xs mr-4 ${testcaseActive ? 'text-white' : 'text-[#eff1f6bf]'}`}
              >
                Test Cases
              </button>
              <button
                onClick={() => setTestcaseActive(false)}
                className={`text-xs ${!testcaseActive ? 'text-white' : 'text-[#eff1f6bf]'}`}
              >
                Results
              </button>
            </div>

            {/* Console content */}
            <div className="flex-1 overflow-auto p-5">
              {testcaseActive ? (
                <div className="space-y-4">
                  {examples.map((example: any, index: number) => (
                    <div key={index}>
                      <p className="text-xs font-medium">Case {index + 1}</p>
                      <div className="bg-[#3E3E3E] p-3 rounded mt-2">
                        <p className="text-xs">Input: {example.inputText}</p>
                        <p className="text-xs mt-2">Output: {example.outputText}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {executionResult.success !== undefined && (
                    <p className={`text-lg ${executionResult.success ? 'text-green-500' : 'text-red-500'}`}>
                      {executionResult.success ? 'Accepted' : 'Wrong Answer'}
                    </p>
                  )}
                  {executionResult.actual && (
                    <div className="mt-4">
                      <p className="text-xs font-medium">Actual Output</p>
                      <div className="bg-[#3E3E3E] p-3 rounded mt-2">
                        <pre className="text-xs">
                          {JSON.stringify(executionResult.actual[activeTestCaseId], null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Console footer */}
            <div className="flex justify-between px-5 h-11 bg-[#303030] items-center border-t border-[#454545]">
              <button 
                onClick={() => setIsConsoleOpen(false)}
                className="flex items-center text-xs text-[#eff1f6bf] hover:text-white"
              >
                Console <ChevronDownIcon className="h-3 ml-2" />
              </button>
              <div className="flex space-x-5">
                <button 
                  onClick={handleSubmit}
                  className="text-xs bg-[#2cbb5d] hover:bg-[#4CC575] px-5 py-1 rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Split>
      )}
    </div>
  )
}