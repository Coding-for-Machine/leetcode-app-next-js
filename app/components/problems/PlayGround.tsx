'use client'
import { useState, useEffect } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { vscodeDark } from "@uiw/codemirror-theme-vscode"
import { javascript } from "@codemirror/lang-javascript"
import { python } from "@codemirror/lang-python"
import { go } from "@codemirror/lang-go"
import toast from "react-hot-toast"
import { Problem, Languages, FunctionsChoosiseStrat } from "@/types/problems"

export default function PlayGround({ problem, setSolved }: { 
  problem: Problem
  setSolved: (solved: boolean) => void
}) {
  const [userCode, setUserCode] = useState<string>("")
  const [selectedLanguage, setSelectedLanguage] = useState<Languages>(problem.language[0])
  const [activeTestCaseId, setActiveTestCaseId] = useState(0)

  // Load initial code based on selected language
  useEffect(() => {
    const loadInitialCode = () => {
      // 1. Check for saved code in localStorage
      const savedCode = localStorage.getItem(`code-${problem.id}-${selectedLanguage.name}`)
      
      if (savedCode) {
        setUserCode(savedCode)
        return
      }
      
      // 2. Find starter code for the selected language
      const starterCode = problem.starterFunctionName.find(
        func => func.language === selectedLanguage.name
      )
      
      if (starterCode) {
        setUserCode(starterCode.code)
      } else {
        // 3. Default code if none found
        const defaultCodes = {
          python: `# ${problem.title} uchun kod yozing\ndef solution(a: int, b: int):\n    # kodni yozing\n    pass`,
          javascript: `// ${problem.title} uchun kod yozing\nfunction solution(a, b) {\n    // kodni yozing\n    \n}`,
          go: `// ${problem.title} uchun kod yozing\npackage main\n\nfunc solution(a int, b int) int {\n    // kodni yozing\n    \n}`
        }
        setUserCode(defaultCodes[selectedLanguage.name as keyof typeof defaultCodes] || "")
      }
    }

    loadInitialCode()
  }, [selectedLanguage, problem.id, problem.starterFunctionName, problem.title])

  // Change language handler
  const handleLanguageChange = (langId: number) => {
    // Save current code before switching
    localStorage.setItem(`code-${problem.id}-${selectedLanguage.name}`, userCode)
    
    // Find and set new language
    const newLang = problem.language.find(l => l.id === langId)
    if (newLang) {
      setSelectedLanguage(newLang)
    }
  }

  // Submit code handler
  const handleSubmit = async () => {
    try {
      // Save code
      localStorage.setItem(`code-${problem.id}-${selectedLanguage.name}`, userCode)
      
      const response = await fetch('http://127.0.0.1:8000/api/solution/run_code/', {
        method: 'POST',
        headers: { 
          'accept': 'application/json',
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          problem_id: problem.id,
          language_id: selectedLanguage.id,
          code: userCode,
          // custom_input: problem.test_cases[activeTestCaseId]?.input_text || ""
        })
      })
      console.log(problem.id, selectedLanguage.id, userCode, problem.test_cases[activeTestCaseId]?.input_text || "" )

      const result = await response.json()
      
      if (result.success) {
        toast.success("Accepted")
        setSolved(true)
      } else {
        toast.error(result.message || "Test cases failed")
      }
    } catch (error) {
      toast.error("Execution failed")
      console.error("Error submitting code:", error)
    }
  }

  // Get CodeMirror extension for current language
  const getLanguageExtension = () => {
    switch(selectedLanguage.name) {
      case 'python': return python()
      case 'javascript': return javascript()
      case 'go': return go()
      default: return python()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Language selector */}
      <div className="p-2 bg-gray-800">
        <select 
          value={selectedLanguage.id}
          onChange={(e) => handleLanguageChange(Number(e.target.value))}
          className="bg-gray-700 text-white p-1 rounded"
        >
          {problem.language.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Code editor */}
      <div className="flex-1">
        <CodeMirror
          value={userCode}
          theme={vscodeDark}
          onChange={setUserCode}
          extensions={[getLanguageExtension()]}
          style={{ height: '100%' }}
        />
      </div>

      {/* Test cases */}
      <div className="bg-gray-800 p-4">
        <h3 className="text-white mb-2">Test Cases</h3>
        <div className="flex space-x-2">
          {problem.test_cases.map((testCase, index) => (
            <button
              key={testCase.id}
              onClick={() => setActiveTestCaseId(index)}
              className={`px-3 py-1 rounded ${
                activeTestCaseId === index 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300'
              }`}
            >
              Case {index + 1}
            </button>
          ))}
        </div>
        
        {/* Active test case */}
        {problem.test_cases[activeTestCaseId] && (
          <div className="mt-4 text-white">
            <p>Input: {problem.test_cases[activeTestCaseId].input_text}</p>
            <p>Output: {problem.test_cases[activeTestCaseId].output_text}</p>
          </div>
        )}
      </div>

      {/* Submit button */}
      <button 
        onClick={handleSubmit}
        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4"
      >
        Submit
      </button>
    </div>
  )
}