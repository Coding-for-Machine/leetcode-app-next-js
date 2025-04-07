"use client";

import useSWR from 'swr';

const fetcher = (url: string) =>
  fetch(url)
    .then(res => res.json())
    .then(data =>
      data.map((item: any) => ({
        ...item,
        created_at: new Date(item.created_at),
      }))
    );

const API_URL_CONTEST = "/api/contest";

interface Contest {
  id: number;
  title: string;
  contest_type: string;
  contest_number: number;
  start_time: Date;
  duration: number;
  problem_count: number;
  is_active: boolean;
  description: string;
  created_at: Date;
  registered_participants: number;
  progress_percentage: number;
}

const Page = () => {
  const { data, error, isLoading } = useSWR<Contest[]>(API_URL_CONTEST, fetcher);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upcoming Contests</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Start</th>
            <th className="border px-4 py-2">Duration</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id} className="text-center">
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.title}</td>
              <td className="border px-4 py-2">{item.contest_type}</td>
              <td className="border px-4 py-2">{new Date(item.start_time).toLocaleString()}</td>
              <td className="border px-4 py-2">{item.duration} min</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
