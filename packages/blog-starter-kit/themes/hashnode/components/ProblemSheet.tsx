import { useState } from 'react';
// import { useAuth } from '../context/AuthContext'; // Auth Context
import Link from 'next/link';

export default function LLDProblemSheet() {
  // const { user, signIn } = useAuth(); // Auth Context
  const [isHidden, setIsHidden] = useState(true);
  const user = false;

  // Dummy LLD problems (partially visible)
  const problems = [
    { id: 1, title: 'Design a URL Shortener (e.g., Bitly)', visible: true },
    { id: 2, title: 'Design a Parking Lot System', visible: true },
    { id: 3, title: 'Design a Distributed Rate Limiter', visible: false },
    { id: 4, title: 'Design a Collaborative Document Editor', visible: false },
    { id: 5, title: 'Design a Hotel Booking System', visible: false },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-white mb-4">LLD Problem Sheet</h2>
      <p className="text-gray-400 mb-6">
        Solve real-world **Low-Level Design** problems. Sign in to unlock all challenges!
      </p>

      <div className="space-y-4">
        {problems.map((problem) => (
          <div
            key={problem.id}
            className={`p-4 rounded-lg border ${problem.visible || !isHidden ? 'border-gray-700 bg-gray-800' : 'border-gray-600 bg-gray-700 opacity-40 blur-md'}`}
          >
            <h3 className="text-lg font-semibold text-white">
              {problem.title}
            </h3>
          </div>
        ))}
      </div>

      {isHidden && !user && (
        <div className="mt-6 text-center">
          <button
            onClick={() => {}} // Call Auth Sign In
            className="px-5 py-3 bg-brand-orange text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition"
          >
            Sign in to Unlock All Problems
          </button>
          <p className="text-gray-400 mt-2 text-sm">
            New here? <Link href="/signup" className="text-brand-orange hover:underline">Create an account</Link>
          </p>
        </div>
      )}

      {!isHidden && (
        <button
          onClick={() => setIsHidden(true)}
          className="mt-6 px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition"
        >
          Hide Locked Content
        </button>
      )}
    </div>
  );
}
