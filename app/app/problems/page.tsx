"use client"

import Link from 'next/link'
import useSWR from 'swr'

const fetcher = (url: string) =>
  fetch(url)
    .then(res => res.json())
    .then(data => 
      data.map((item: any) => ({
        ...item,
        created_at: new Date(item.created_at),
        updated_at: new Date(item.updated_at)
      }))
    )

interface ProblemList {
  id: number
  title: string
  slug: string
  difficulty: string
  created_at: Date
  updated_at: Date
}

const Page = () => {
  const { data, error, isLoading } = useSWR<ProblemList[]>(
    `http://127.0.0.1:8000/api/problems/`,
    fetcher
  )

  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Problems</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Slug</th>
            <th className="border px-4 py-2">Difficulty</th>
            <th className="border px-4 py-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">
                <Link href={`/problems/${item.slug}`}>
                {item.title}
                </Link>
              </td>
              <td className="border px-4 py-2">{item.slug}</td>
              <td className="border px-4 py-2">{item.difficulty}</td>
              <td className="border px-4 py-2">
                {item.created_at.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Page
