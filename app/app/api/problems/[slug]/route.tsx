import { getToken } from '@/lib/auth';
import { DBProblem, Example, Problem, ProblemList } from '@/types/problems';
import { NextResponse } from 'next/server';

const DJANGO_API = process.env.DJANGO_SERVER_BASE_API;
const DJANGO_PROBLEM_URL = `${DJANGO_API}/problems`;

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = await params; // await qo'shildi
    const accessToken = await getToken();

    const response = await fetch(`${DJANGO_PROBLEM_URL}/${slug}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      cache: 'no-store' // Cache ni o'chirish
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.detail || "Problem not found" },
        { status: response.status }
      );
    }

    const problemData = await response.json();

    // ProblemList interfeysiga moslashtirish
    const problemList: ProblemList = {
      id: problemData.id,
      title: problemData.title,
      slug: problemData.slug,
      difficulty: problemData.difficulty,
      created_at: new Date(problemData.created_at),
      updated_at: new Date(problemData.updated_at)
    };

    // Problem interfeysiga moslashtirish
    const problem: Problem = {
      id: problemData.slug,
      title: problemData.title,
      problemStatement: problemData.description,
      examples: problemData.examples?.map((ex: any): Example => ({
        id: ex.id,
        inputText: ex.input_text,
        outputText: ex.output_text,
        explanation: ex.explanation,
        img: ex.image_url || undefined
      })) || [],
      constraints: problemData.constraints || '',
      handlerFunction: () => {},
      starterCode: problemData.functions?.find((f: any) => f.language === "python")?.code || "",
      order: problemData.order || 0,
      starterFunctionName: problemData.functions?.[0]?.code?.match(/def\s+(\w+)/)?.[1] || "solution"
    };

    // DBProblem interfeysiga moslashtirish
    const dbProblem: DBProblem = {
      id: problemData.slug,
      title: problemData.title,
      category: problemData.category || 'unknown',
      difficulty: problemData.difficulty,
      likes: problemData.likes || 0,
      dislikes: problemData.dislikes || 0,
      order: problemData.order || 0,
      link: `/problems/${problemData.slug}`
    };

    return NextResponse.json({
      problemList,
      problem,
      dbProblem
    }, { status: 200 });

  } catch (error) {
    console.error("Problem Fetch Error:", error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}