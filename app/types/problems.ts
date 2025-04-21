export interface ProblemList {
  id: number
  title: string
  slug: string
  difficulty: string
  created_at: Date
  updated_at: Date
}
/*
{
"id": 1,
"title": "ikki son yig'indisi",
"slug": "ikki-son-yigindisi",
"difficulty": "Oson",
"points": 500,
"acceptance": "0%",
"is_solved": false,
"category": "strings",
"created_at": "2025-04-10T16:33:01.953Z",
"updated_at": "2025-04-10T16:33:01.954Z",
"description": "<p><strong>sonlarni qushing va hisoblang</strong></p>\r\n\r\n<p><strong><em>natijani qaytaring</em></strong></p>",
"constraints": "<ul>\r\n            <li><code>2 ≤ nums.length ≤ 10<sup>4</sup></code></li>\r\n        </ul>",
"examples": [
  {
    "id": 1,
    "input_text": "21 20",
    "output_text": "41",
    "explanation": "ikki sonni qushasiz 21+20=41",
    "image_url": null
  }
],
"language": [
  {
    "id": 1,
    "name": "python",
    "slug": "python"
  },
  {
    "id": 2,
    "name": "go",
    "slug": "go"
  },
  {
    "id": 3,
    "name": "javascript",
    "slug": "javascript"
  }
],
"functions": [
  {
    "id": 1,
    "language": "python",
    "code": "def Add(a: int, b: int): # kodni yozing"
  }
],
"test_cases": [
  {
    "id": 1,
    "input_text": "5 8",
    "output_text": "13"
  },
  {
    "id": 2,
    "input_text": "20 90",
    "output_text": "110"
  },
  {
    "id": 3,
    "input_text": "58 112",
    "output_text": "170"
  }
]
}
*/

export type Example = {
  id: number;
  inputText: string;
  outputText: string;
  explanation?: string;
  img?: string;
};
export type Languages = {
  id: number;
  name: string;
  slug: string;
}
export type FunctionsChoosiseStrat = {
  id: number;
  language: string;
  code: string;
}
export type TestCase = {
  id: number;
  input_text: string;
  output_text: string;
}
// local problem data
export type Problem = {
  id: string;
  title: string;
  difficulty: string;
  points: number;
  acceptance: string;
  is_solved: string;
  category: string;
  created_at: Date;
  updated_at: Date;
  description: string;
  examples: Example[];
  constraints: string;
  starterFunctionName: FunctionsChoosiseStrat[];
  language: Languages[];
  test_cases: TestCase[];
};
