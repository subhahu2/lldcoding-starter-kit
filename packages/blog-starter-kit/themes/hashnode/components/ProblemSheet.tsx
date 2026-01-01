'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Video } from 'lucide-react';

export default function LLDProblemSheet() {
  const [activeTab, setActiveTab] = useState('beginner');
  const [solvedProblems, setSolvedProblems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load solved problems from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('lld_solved');
    if (saved) setSolvedProblems(JSON.parse(saved));
  }, []);

  const toggleSolved = (id: number) => {
    const newSolved = solvedProblems.includes(id)
      ? solvedProblems.filter((p) => p !== id)
      : [...solvedProblems, id];

    setSolvedProblems(newSolved);
    localStorage.setItem('lld_solved', JSON.stringify(newSolved));
  };

  // Full populated data (from your list)
  const allProblems = {
    beginner: [
      {
        id: 1,
        title: 'Design (LLD) Tic-Tac-Toe - Machine Coding',
        difficulty: 1,
        tags: ['game', 'basic', 'OOP'],
        company: null,
        url: 'https://www.lldcoding.com/design-lld-tic-tac-toe-machine-coding',
        video: 'https://www.youtube.com/watch?v=z3DtSt3oDJI&t=1s',
      },
      {
        id: 2,
        title: 'Design (LLD) Snake and Ladder Game - Machine Coding',
        difficulty: 1,
        tags: ['game', 'board-game', 'basic'],
        company: null,
        url: 'https://www.lldcoding.com/design-lld-snake-and-ladder-game-machine-coding-1',
        video: 'https://www.youtube.com/watch?v=qTDuhvLmM2g',
      },
      {
        id: 3,
        title: 'Design (LLD) Tetris Game - Machine Coding',
        difficulty: 1,
        tags: ['game', 'tetris', 'basic'],
        company: null,
        url: 'https://www.lldcoding.com/design-lld-tetris-game-machine-coding',
        video: 'https://www.youtube.com/watch?v=x2kWgDv_Kqo',
      },
      {
        id: 4,
        title: 'Design (LLD) Minesweeper - Machine Coding',
        difficulty: 2,
        tags: ['game', 'minesweeper', 'logic'],
        company: null,
        url: 'https://www.lldcoding.com/design-lld-minesweeper-machine-coding',
        video: 'https://www.youtube.com/watch?v=1DsZYh4dtHs',
      },
      {
        id: 5,
        title: 'Design (LLD) Chess Game - Machine Coding',
        difficulty: 2,
        tags: ['game', 'chess', 'complex-movement'],
        company: null,
        url: 'https://www.lldcoding.com/design-lld-chess-game-machine-coding',
        video: null,
      },
      {
        id: 6,
        title: 'Design (LLD) Alarm/Alert Service for AWS - Machine Coding',
        difficulty: 2,
        tags: ['aws', 'alerting', 'event-driven'],
        company: 'AWS',
        url: 'https://www.lldcoding.com/design-lld-alarm-or-alert-service-for-aws-machine-coding',
        video: null,
      },
      {
        id: 7,
        title: 'Design (LLD) Logging Library like log4j - Machine Coding',
        difficulty: 2,
        tags: ['logging', 'concurrency', 'performance'],
        company: null,
        url: 'https://www.lldcoding.com/design-logging-library-like-log4j-machine-coding',
        video: null,
      },
      {
        id: 8,
        title: 'Design (LLD) JSON Parser - Machine Coding',
        difficulty: 1,
        tags: ['parser', 'json', 'basic'],
        company: null,
        url: 'https://www.lldcoding.com/design-lld-json-parser-machine-coding',
        video: 'https://www.youtube.com/watch?v=a28kk-hM3TM',
      },
      {
        id: 9,
        title: 'Design (LLD) File System - Machine Coding',
        difficulty: 2,
        tags: ['file-system', 'directory', 'tree'],
        company: null,
        url: 'https://www.lldcoding.com/design-lld-file-system-machine-coding',
        video: null,
      },
      {
        id: 10,
        title: 'Design (LLD) 2048 Game - Machine Coding',
        difficulty: 2,
        tags: ['game', '2048', 'grid'],
        company: null,
        url: 'https://www.lldcoding.com/design-lld-2048-game-machine-coding',
        video: null,
      },
    ],
    intermediate: [
      {
        id: 101,
        title: 'Design (LLD) Internet Download Manager like IDM - Machine Coding Interview',
        difficulty: 3,
        tags: ['download', 'multi-thread', 'resume'],
        company: null,
        url: 'https://www.lldcoding.com/design-lld-internet-download-manager-like-idm-machine-coding-interview',
        video: null,
      },
      {
        id: 102,
        title: 'Design (LLD) Coupon System for Zepto - Machine Coding Interview',
        difficulty: 3,
        tags: ['ecommerce', 'coupon', 'validation'],
        company: 'Zepto',
        url: 'https://www.lldcoding.com/design-lld-coupon-system-for-zepto-machine-coding-interview',
        video: null,
      },
      {
        id: 103,
        title: 'Design (LLD) Android Unlock Pattern - Machine Coding Interview',
        difficulty: 3,
        tags: ['pattern', 'security', 'graph'],
        company: null,
        url: 'https://www.lldcoding.com/design-lld-android-unlock-pattern-machine-coding-interview',
        video: null,
      },
      {
        id: 104,
        title: 'Designing a Scalable Database Schema for Reddit-like Comments - Part 1',
        difficulty: 3,
        tags: ['database', 'schema', 'scalability', 'comments'],
        company: 'Reddit',
        url: 'https://www.lldcoding.com/designing-a-scalable-database-schema-for-reddit-like-comments-part-1',
        video: null,
      },
      {
        id: 105,
        title: 'Design (LLD) Sublime Text IDE - Machine Coding',
        difficulty: 3,
        tags: ['editor', 'ide', 'text-processing'],
        company: null,
        url: 'https://www.lldcoding.com/design-lld-sublime-text-ide-machine-coding',
        video: null,
      },
      {
        id: 106,
        title: 'Design (LLD) Ngrok Tool - Machine Coding',
        difficulty: 3,
        tags: ['tunneling', 'network', 'proxy'],
        company: 'Ngrok',
        url: 'https://www.lldcoding.com/design-lld-ngrok-tool-machine-coding',
        video: null,
      },
      {
        id: 107,
        title: 'Design (LLD) Rate Limiter - Machine Coding',
        difficulty: 3,
        tags: ['rate-limiting', 'concurrency', 'token-bucket'],
        company: null,
        url: 'https://www.lldcoding.com/design-lld-rate-limiter-machine-coding',
        video: null,
      },
      {
        id: 108,
        title: 'Design (LLD) Thread Pool - Machine Coding',
        difficulty: 3,
        tags: ['concurrency', 'thread-pool', 'executor'],
        company: null,
        url: 'https://www.lldcoding.com/design-lld-thread-pool-machine-coding',
        video: null,
      },
      {
        id: 109,
        title: 'Design OYO/Airbnb - Part 1: Database Modelling',
        difficulty: 3,
        tags: ['booking', 'database', 'schema'],
        company: ['OYO', 'Airbnb'],
        url: 'https://www.lldcoding.com/design-oyo-airbnb-part-1-database-modelling',
        video: null,
      },
      {
        id: 110,
        title: 'Design (LLD) Google Calendar Database Model',
        difficulty: 3,
        tags: ['calendar', 'database', 'scheduling'],
        company: 'Google',
        url: 'https://www.lldcoding.com/design-google-calendar-database-model',
        video: null,
      },
      {
        id: 111,
        title: 'Design (LLD) Google Authenticator - Machine Coding',
        difficulty: 3,
        tags: ['auth', '2fa', 'totp'],
        company: 'Google',
        url: 'https://www.lldcoding.com/design-lld-google-authenticator-machine-coding',
        video: null,
      },
      {
        id: 112,
        title: 'Design (LLD) Amazon Prime Video - Machine Coding',
        difficulty: 3,
        tags: ['streaming', 'video', 'recommendation'],
        company: 'Amazon',
        url: 'https://www.lldcoding.com/design-lld-amazon-prime-video-machine-coding',
        video: null,
      },
      {
        id: 113,
        title: 'Design Online Book Management System - Machine Coding',
        difficulty: 3,
        tags: ['library', 'inventory', 'management'],
        company: 'Microsoft',
        url: 'https://www.lldcoding.com/design-lld-online-book-management-system-machine-coding-interview',
        video: null,
      },
      {
        id: 114,
        title: 'Design (LLD) Lift - Machine Coding',
        difficulty: 3,
        tags: ['elevator', 'state-machine', 'concurrency'],
        company: null,
        url: 'https://www.lldcoding.com/design-lld-lift-machine-coding',
        video: null,
      },
    ],
    advanced: [
      {
        id: 201,
        title: 'Design (LLD) AWS S3 Service - Machine Coding',
        difficulty: 5,
        tags: ['storage', 'object-storage', 'distributed'],
        company: 'AWS',
        url: 'https://www.lldcoding.com/design-lld-aws-s3-service-machine-coding',
        video: null,
      },
      {
        id: 202,
        title: 'Design (LLD) Google Drive - Machine Coding',
        difficulty: 5,
        tags: ['file-storage', 'sync', 'sharing'],
        company: 'Google',
        url: 'https://www.lldcoding.com/design-lld-google-drive-machine-coding',
        video: null,
      },
      {
        id: 203,
        title: 'Design Version Control (GitHub) - Database Modelling',
        difficulty: 4,
        tags: ['version-control', 'git', 'database'],
        company: 'GitHub',
        url: 'https://www.lldcoding.com/design-version-control-github-database-modelling-part-1',
        video: null,
      },
      {
        id: 204,
        title: 'Design (LLD) Mentorship Platform like Preplaced - Machine Coding',
        difficulty: 4,
        tags: ['mentorship', 'matching', 'platform'],
        company: 'Preplaced',
        url: 'https://www.lldcoding.com/design-lld-mentorship-platform-like-preplaced-machine-coding',
        video: null,
      },
      {
        id: 205,
        title: 'Design (LLD) Tinder Dating App - Machine Coding',
        difficulty: 5,
        tags: ['matching', 'geolocation', 'swipe'],
        company: 'Tinder',
        url: 'https://www.lldcoding.com/design-lld-tinder-dating-app-machine-coding',
        video: null,
      },
      {
        id: 206,
        title: 'Design (LLD) WhatsApp Messenger - Machine Coding',
        difficulty: 5,
        tags: ['messaging', 'realtime', 'chat'],
        company: 'WhatsApp',
        url: 'https://www.lldcoding.com/design-lld-whatsapp-messenger-machine-coding',
        video: null,
      },
      {
        id: 207,
        title: 'Design (LLD) Gmail - Machine Coding',
        difficulty: 5,
        tags: ['email', 'inbox', 'search'],
        company: 'Google',
        url: 'https://www.lldcoding.com/design-lld-gmail-machine-coding',
        video: null,
      },
      {
        id: 208,
        title: 'Design (LLD) Game Engine like Unreal - Machine Coding',
        difficulty: 5,
        tags: ['game-engine', 'rendering', 'physics'],
        company: 'Unreal',
        url: 'https://www.lldcoding.com/design-lld-game-engine-like-unreal-machine-coding',
        video: null,
      },
      {
        id: 209,
        title: 'Design (LLD) Real-Time Chat System with Millions of Users',
        difficulty: 5,
        tags: ['realtime', 'chat', 'scalability', 'millions'],
        company: null,
        url: 'https://www.lldcoding.com/design-lld-a-real-time-chat-system-with-support-for-millions-of-concurrent-users-machine-coding',
        video: null,
      },
      {
        id: 210,
        title: 'Design (LLD) Video Conferencing App like Zoom',
        difficulty: 5,
        tags: ['video', 'conferencing', 'webrtc'],
        company: 'Zoom',
        url: 'https://www.lldcoding.com/design-lld-a-video-conferencing-application-like-zoom-machine-coding',
        video: null,
      },
      {
        id: 211,
        title: 'Design (LLD) Cryptocurrency Exchange Platform',
        difficulty: 5,
        tags: ['crypto', 'exchange', 'trading', 'wallet'],
        company: null,
        url: 'https://www.lldcoding.com/design-lld-a-cryptocurrency-exchange-platform-machine-coding',
        video: null,
      },
      {
        id: 212,
        title: 'Design (LLD) Collaborative Document Editing (Google Docs)',
        difficulty: 5,
        tags: ['collaboration', 'realtime', 'document', 'ot'],
        company: 'Google',
        url: 'https://www.lldcoding.com/design-lld-a-real-time-collaborative-document-editing-platform-like-google-docs-machine-coding',
        video: null,
      },
      {
        id: 213,
        title: 'Design (LLD) Payment Recommendation System - Machine Coding',
        difficulty: 5,
        tags: ['payment', 'recommendation', 'ml'],
        company: 'CRED',
        url: 'https://interview.lldcoding.com/',
        video: null,
      },
      {
        id: 214,
        title: 'Design (LLD) Alexa - Machine Coding',
        difficulty: 5,
        tags: ['voice', 'assistant', 'nlp', 'iot'],
        company: 'Amazon',
        url: 'https://www.lldcoding.com/design-lld-alexa-machine-coding',
        video: null,
      },
    ],
  };

  const currentProblems = allProblems[activeTab as keyof typeof allProblems] || [];

  const filteredProblems = currentProblems.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSolved = solvedProblems.length;
  const totalProblems = Object.values(allProblems).flat().length;
  const progress = Math.round((totalSolved / totalProblems) * 100) || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          LLD & Machine Coding Problem Sheet
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
          Practice real interview-style Low-Level Design problems — from beginner games to advanced distributed systems.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="max-w-xl mx-auto mb-10 px-4">
        <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 mb-3">
          <div
            className="bg-orange-500 h-3 sm:h-4 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 text-center">
          {totalSolved} / {totalProblems} solved ({progress}%)
        </p>
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch gap-4 mb-8">
        <div className="flex overflow-x-auto gap-2 pb-2 sm:pb-0 scrollbar-thin scrollbar-thumb-gray-300">
          {['beginner', 'intermediate', 'advanced'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full font-medium text-sm sm:text-base transition whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search problems..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-72 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-base"
        />
      </div>

      {/* Problem List - Clean Listing Style */}
      <div className="space-y-5">
        {filteredProblems.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No problems found.</div>
        ) : (
          filteredProblems.map((problem) => {
            const isSolved = solvedProblems.includes(problem.id);

            return (
              <div
                key={problem.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all"
              >
                {/* Title & Solved Button */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex-1 line-clamp-2">
                    {problem.title}
                  </h3>

                  <button
                    onClick={() => toggleSolved(problem.id)}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors flex-shrink-0 ${
                      isSolved ? 'text-green-600' : 'text-gray-400 hover:text-green-500'
                    }`}
                    aria-label={isSolved ? 'Mark as unsolved' : 'Mark as solved'}
                  >
                    <CheckCircle size={22} className={isSolved ? 'fill-green-500 text-white' : ''} />
                    {isSolved ? 'Solved' : 'Mark Solved'}
                  </button>
                </div>

                {/* Metadata */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    {'★'.repeat(problem.difficulty)}
                  </span>
                  {problem.tags?.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                      #{tag}
                    </span>
                  ))}
                  {problem.company && (
                    <span className="px-2.5 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      {Array.isArray(problem.company) ? problem.company.join(', ') : problem.company}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={problem.url}
                    className="flex-1 text-center bg-orange-500 hover:bg-orange-600 text-white py-3 px-5 rounded-lg font-medium transition text-sm"
                  >
                    View Problem →
                  </a>

                  {problem.video && (
                    <a
                      href={problem.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 py-3 px-5 rounded-lg text-sm"
                    >
                      <Video size={18} /> Watch Video
                    </a>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Premium Teaser */}
      <div className="mt-12 p-6 sm:p-10 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl text-center">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">
          Want 50+ More Advanced & Company-Specific Problems?
        </h3>
        <p className="text-base sm:text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
          Unlock full video solutions, runnable code, mocks, priority support, and monthly new challenges.
        </p>
        <a
          href="https://interview.lldcoding.com"
          className="inline-block bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-orange-700 transition shadow-lg"
        >
          Explore Premium Course →
        </a>
      </div>
    </div>
  );
}