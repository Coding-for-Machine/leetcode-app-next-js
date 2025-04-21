import { getToken } from '@/lib/auth';
import { Problem, Example, Languages, FunctionsChoosiseStrat } from '@/types/problems';
import { NextResponse } from 'next/server';

const DJANGO_API = process.env.DJANGO_SERVER_BASE_API;
const DJANGO_PROBLEM_URL = `${DJANGO_API}/problems`;

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const accessToken = await getToken();

    const response = await fetch(`${DJANGO_PROBLEM_URL}/${slug}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.detail || "Problem not found" },
        { status: response.status }
      );
    }

    const problemData = await response.json();

    const problem: Problem = {
      id: problemData.slug,
      title: problemData.title,
      difficulty: problemData.difficulty,
      points: problemData.points,
      acceptance: problemData.acceptance,
      is_solved: String(problemData.is_solved),
      category: problemData.category,
      created_at: new Date(problemData.created_at),
      updated_at: new Date(problemData.updated_at),
      description: problemData.description,
      constraints: problemData.constraints || '',
      examples: (problemData.examples || []).map((ex: any): Example => ({
        id: ex.id,
        inputText: ex.input_text,
        outputText: ex.output_text,
        explanation: ex.explanation,
        img: ex.image_url || undefined
      })),
      language: (problemData.language || []).map((lang: any): Languages => ({
        id: lang.id,
        name: lang.name,
        slug: lang.slug
      })),
      starterFunctionName: (problemData.functions || []).map((func: any): FunctionsChoosiseStrat => ({
        id: func.id,
        language: func.language,
        code: func.code,
      })),
      test_cases: (problemData.test_cases || []).map((test: any): Example => ({
        id: test.id,
        inputText: test.input_text,
        outputText: test.output_text,
      })),
    };

    return NextResponse.json({ problem }, { status: 200 });

  } catch (error) {
    console.error("Problem Fetch Error:", error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}
