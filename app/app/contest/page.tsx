"use client";

import useSWR from 'swr';
import { useState } from 'react';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then(res => res.json());

interface Contest {
  id: number;
  title: string;
  contest_type: string;
  contest_number: number;
  start_time: string;
  duration: number;
  problem_count: number;
  is_active: boolean;
  description?: string;
  created_at?: string;
  registered_participants?: number;
  progress_percentage?: number;
}

interface ContestStats {
  total_contests: number;
  best_rank: number | null;
  average_rank: number | null;
  total_points: number;
  last_contest: string | null;
}

const Page = () => {
  // Fetch upcoming contests
  const { data: upcomingData, error: upcomingError, isLoading: upcomingLoading } = 
    useSWR<Contest[]>('/api/contest/upcoming/', fetcher);
  
  // Fetch past contests
  const { data: pastData, error: pastError, isLoading: pastLoading } = 
    useSWR<Contest[]>('/api/contest/past/?limit=10', fetcher);
  
  // Fetch contest stats
  const { data: statsData, error: statsError, isLoading: statsLoading } = 
    useSWR<ContestStats>('/api/contest/stats/', fetcher);

  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  if (upcomingError || pastError || statsError) return <div>Failed to load data</div>;
  if (upcomingLoading || pastLoading || statsLoading) return <div>Loading...</div>;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="w-full lg:w-2/3">
          <div className="card-hover bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
              <h1 className="text-2xl font-bold gradient-text flex items-center mb-4 md:mb-0">
                <i className="fas fa-trophy text-indigo-500 mr-2"></i>
                Kodlash Tanlovlari
              </h1>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setActiveTab('past')}
                  className={`border px-3 py-1 rounded-lg text-sm font-medium ${
                    activeTab === 'past' 
                      ? 'bg-indigo-500 text-white' 
                      : 'border-indigo-500 text-indigo-500 hover:bg-indigo-50'
                  }`}
                >
                  <i className="fas fa-history mr-1"></i> O'tgan tanlovlar
                </button>
                <button className="gradient-btn text-white px-3 py-1 rounded-lg text-sm font-medium shadow-sm">
                  <i className="fas fa-plus mr-1"></i> Yangi tanlov
                </button>
              </div>
            </div>

            {activeTab === 'upcoming' ? (
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <i className="fas fa-calendar-alt text-indigo-500 mr-2"></i>
                  Kelgusi Tanlovlar
                </h2>
                
                <div className="space-y-4">
                {upcomingData && upcomingData.length > 0 ? (
  upcomingData.map((contest) => (
                    <div key={contest.id} className="contest-card card-hover bg-white rounded-lg p-5">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-3 md:mb-0">
                          <h3 className="font-bold text-lg mb-1">
                            {contest.contest_type === 'weekly' ? 'Haftalik Tanlov' : '2-Haftalik Tanlov'} #{contest.contest_number}
                          </h3>
                          <div className="flex items-center text-sm text-slate-600">
                            <i className="fas fa-clock mr-2"></i>
                            <span>{formatDate(contest.start_time)}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {contest.duration} daqiqa
                          </span>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            {contest.problem_count} masala
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between contest-card-content">
                        <div className="flex items-center mb-2 md:mb-0">
                          <div className="relative w-16 h-16 mr-3">
                            <svg className="w-full h-full" viewBox="0 0 36 36">
                              <circle cx="18" cy="18" r="16" fill="none" stroke="#e2e8f0" strokeWidth="2"></circle>
                              <circle 
                                cx="18" 
                                cy="18" 
                                r="16" 
                                fill="none" 
                                stroke="#6366f1" 
                                strokeWidth="2" 
                                strokeDasharray="100" 
                                strokeDashoffset={100 - (contest.progress_percentage || 0)}
                                className="progress-ring__circle"
                              ></circle>
                              <text x="18" y="20.5" textAnchor="middle" fontSize="10" fill="#6366f1" fontWeight="bold">
                                {contest.progress_percentage || 0}%
                              </text>
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Ro'yxatdan o'tganlar</p>
                            <p className="text-sm font-medium">{contest.registered_participants || 0} ishtirokchi</p>
                          </div>
                        </div>
                        <button className="gradient-btn hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium shadow-sm contest-register-btn">
                          Ro'yxatdan o'tish
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    Hozircha kelgusi tanlovlar mavjud emas
                  </div>
                )}
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <i className="fas fa-history text-indigo-500 mr-2"></i>
                  O'tgan Tanlovlar
                </h2>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Tanlov</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Sana</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Masalalar</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">O'rin</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Ball</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                    {pastData && pastData.length > 0 ? (
                      pastData.map((contest) => (
                        <tr key={contest.id} className="hover:bg-slate-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium">
                              {contest.contest_type === 'weekly' ? 'Haftalik Tanlov' : '2-Haftalik Tanlov'} #{contest.contest_number}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            {formatDate(contest.start_time)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              {contest.problem_count}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            #{statsData?.best_rank || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                            {statsData?.total_points || 0}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link href="#" className="text-indigo-600 hover:text-indigo-800">
                              Natijalar
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-slate-500">
                        Hozircha o'tgan tanlovlar mavjud emas
                      </td>
                    </tr>
                    )}
   
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-4 flex justify-center">
                  <button className="border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50">
                    Barchasini ko'rish
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="w-full lg:w-1/3">
          {/* Contest Stats */}
          <div className="card-hover bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <i className="fas fa-chart-line text-indigo-500 mr-2"></i>
              Tanlov Statistikasi
            </h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Ishtirok etgan tanlovlar</span>
                  <span className="font-medium">{statsData?.total_contests || 0}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-500 h-2 rounded-full" 
                    style={{ width: `${Math.min((statsData?.total_contests || 0) * 10, 100)}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Eng yaxshi o'rin</span>
                  <span className="font-medium">
                    {statsData?.best_rank ? `#${statsData.best_rank}` : 'N/A'}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${statsData?.best_rank ? Math.min(100 / (statsData.best_rank / 10), 100) : 15}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">O'rtacha o'rin</span>
                  <span className="font-medium">
                    {statsData?.average_rank ? `#${Math.round(statsData.average_rank)}` : 'N/A'}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full" 
                    style={{ width: `${statsData?.average_rank ? Math.min(100 / (statsData.average_rank / 100), 100) : 45}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">Yig'ilgan ball</span>
                  <span className="font-medium">{statsData?.total_points || 0}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${Math.min((statsData?.total_points || 0) / 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contest Rules */}
          <div className="card-hover bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <i className="fas fa-info-circle text-indigo-500 mr-2"></i>
              Tanlov Qoidalari
            </h2>
            
            <div className="space-y-3 text-sm text-slate-700">
              <div className="flex items-start">
                <div className="bg-indigo-100 p-1 rounded-full mr-3 mt-1">
                  <i className="fas fa-clock text-indigo-500 text-xs"></i>
                </div>
                <p>Har bir tanlov 90 daqiqa davom etadi</p>
              </div>
              <div className="flex items-start">
                <div className="bg-indigo-100 p-1 rounded-full mr-3 mt-1">
                  <i className="fas fa-list-ol text-indigo-500 text-xs"></i>
                </div>
                <p>Har bir tanlovda 4 ta algoritmik masala bo'ladi</p>
              </div>
              <div className="flex items-start">
                <div className="bg-indigo-100 p-1 rounded-full mr-3 mt-1">
                  <i className="fas fa-star text-indigo-500 text-xs"></i>
                </div>
                <p>Masalalar qiyinlik darajasi: 1-oson, 4-eng qiyin</p>
              </div>
              <div className="flex items-start">
                <div className="bg-indigo-100 p-1 rounded-full mr-3 mt-1">
                  <i className="fas fa-trophy text-indigo-500 text-xs"></i>
                </div>
                <p>Eng ko'p ball to'plagan ishtirokchilar g'olib hisoblanadi</p>
              </div>
              <div className="flex items-start">
                <div className="bg-indigo-100 p-1 rounded-full mr-3 mt-1">
                  <i className="fas fa-medal text-indigo-500 text-xs"></i>
                </div>
                <p>Yaxshi natijalar reytingingizni oshiradi</p>
              </div>
            </div>
            
            <button className="mt-4 w-full text-sm text-indigo-600 hover:underline">
              Batafsil qoidalar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;