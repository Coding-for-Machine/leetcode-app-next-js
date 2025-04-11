import { NextResponse } from 'next/server'

const baseUrl = process.env.DJANGO_SERVER_BASE_API || 'http://localhost:8000/api'

export async function GET() {
  try {
    const apiUrl = `${baseUrl}/problems/`
    console.log('Fetching from:', apiUrl)
    
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store'
    })

    console.log('Response status:', response.status)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      throw new Error(
        `API error: ${response.status} ${response.statusText}. ` +
        `Response: ${JSON.stringify(errorData)}`
      )
    }

    const responseData = await response.json()
    console.log('Raw API response:', JSON.stringify(responseData, null, 2))

    // items massivini olish
    const problemsArray = responseData.items || []
    
    // Transformatsiya qilish
    const transformedProblems = problemsArray.map((problem: any) => ({
      id: problem.id || 0,
      title: problem.title || 'No title',
      slug: problem.slug || problem.id.toString(),
      difficulty: problem.difficulty === 'Oson' ? 'Easy' : 
                problem.difficulty === "O'rtacha" ? 'Medium' : 'Hard',
      acceptance: problem.acceptance || "0%",
      solved: problem.is_solved || false,
      category: problem.category ? [problem.category] : ['General']
    }))

    return NextResponse.json(transformedProblems)
    
  } catch (error) {
    console.error('Full error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to process problems',
        details: error.message,
        ...(process.env.NODE_ENV === 'development' && {
          stack: error.stack,
          receivedData: error.responseData
        })
      },
      { status: 500 }
    )
  }
}