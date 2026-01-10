import { useState } from 'react';

export default function LLDProblemSheet() {
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

  const beginnerProblems = [
    { title: 'Design (LLD) Tic-Tac-Toe - Machine Coding', url: 'https://lldcoding.com/design-lld-tic-tac-toe-machine-coding', video: 'https://www.youtube.com/watch?v=z3DtSt3oDJI&t=1s' },
    { title: 'Design (LLD) Snake and Ladder Game - Machine Coding', url: 'https://lldcoding.com/design-lld-snake-and-ladder-game-machine-coding-1', video: 'https://www.youtube.com/watch?v=qTDuhvLmM2g' },
    { title: 'Design (LLD) Tetris Game - Machine Coding', url: 'https://lldcoding.com/design-lld-tetris-game-machine-coding', video: 'https://www.youtube.com/watch?v=x2kWgDv_Kqo' },
    { title: 'Design (LLD) Minesweeper - Machine Coding', url: 'https://lldcoding.com/design-lld-minesweeper-machine-coding', video: 'https://www.youtube.com/watch?v=1DsZYh4dtHs' },
    { title: 'Design (LLD) Chess Game - Machine Coding', url: 'https://lldcoding.com/design-lld-chess-game-machine-coding' },
    { title: 'Design (LLD) Alarm/Alert Service for AWS - Machine Coding', url: 'https://lldcoding.com/design-lld-alarm-or-alert-service-for-aws-machine-coding' },
    { title: 'Design (LLD) Logging Library like log4j - Machine Coding', url: 'https://lldcoding.com/design-logging-library-like-log4j-machine-coding' },
    { title: 'Design (LLD) JSON Parser - Machine Coding', url: 'https://lldcoding.com/design-lld-json-parser-machine-coding', video: 'https://www.youtube.com/watch?v=a28kk-hM3TM' },
    { title: 'Design (LLD) File System - Machine Coding', url: 'https://lldcoding.com/design-lld-file-system-machine-coding' },
    { title: 'Design (LLD) 2048 Game - Machine Coding', url: 'https://lldcoding.com/design-lld-2048-game-machine-coding' },
  ];

  const intermediateProblems = [
    { title: 'Design (LLD) Internet Download Manager like IDM - Machine Coding Interview', url: 'https://lldcoding.com/design-lld-internet-download-manager-like-idm-machine-coding-interview' },
    { title: 'Design (LLD) Coupon System for Zepto - Machine Coding Interview', url: 'https://lldcoding.com/design-lld-coupon-system-for-zepto-machine-coding-interview' },
    { title: 'Design (LLD) Android Unlock Pattern - Machine Coding Interview', url: 'https://lldcoding.com/design-lld-android-unlock-pattern-machine-coding-interview' },
    { title: 'Designing a Scalable Database Schema for Reddit-like Comments - Part 1', url: 'https://lldcoding.com/designing-a-scalable-database-schema-for-reddit-like-comments-part-1' },
    { title: 'Design (LLD) Sublime Text IDE - Machine Coding', url: 'https://lldcoding.com/design-lld-sublime-text-ide-machine-coding' },
    { title: 'Design (LLD) Ngrok Tool - Machine Coding', url: 'https://lldcoding.com/design-lld-ngrok-tool-machine-coding' },
    { title: 'Design (LLD) Rate Limiter - Machine Coding', url: 'https://lldcoding.com/design-lld-rate-limiter-machine-coding' },
    { title: 'Design (LLD) Thread Pool - Machine Coding', url: 'https://lldcoding.com/design-lld-thread-pool-machine-coding' },
    { title: 'Design OYO/Airbnb - Part 1: Database Modelling', url: 'https://lldcoding.com/design-oyo-airbnb-part-1-database-modelling' },
    { title: 'Design (LLD) Google Calendar Database Model', url: 'https://lldcoding.com/design-google-calendar-database-model' },
    { title: 'Design (LLD) Google Authenticator - Machine Coding', url: 'https://lldcoding.com/design-lld-google-authenticator-machine-coding' },
    { title: 'Design (LLD) Amazon Prime Video - Machine Coding', url: 'https://lldcoding.com/design-lld-amazon-prime-video-machine-coding' },
    { title: 'Design Online Book Management System - Machine Coding', url: 'https://www.lldcoding.com/design-lld-online-book-management-system-machine-coding-interview', company: 'Microsoft' },
    { title: 'Design (LLD) Lift - Machine Coding', url: 'https://www.lldcoding.com/design-lld-lift-machine-coding' },
  ];

  const advancedProblems = [
    { title: 'Design (LLD) AWS S3 Service - Machine Coding', url: 'https://lldcoding.com/design-lld-aws-s3-service-machine-coding' },
    { title: 'Design (LLD) Google Drive - Machine Coding', url: 'https://lldcoding.com/design-lld-google-drive-machine-coding' },
    { title: 'Design Version Control (GitHub) - Database Modelling', url: 'https://lldcoding.com/design-version-control-github-database-modelling-part-1' },
    { title: 'Design (LLD) Mentorship Platform like Preplaced - Machine Coding', url: 'https://lldcoding.com/design-lld-mentorship-platform-like-preplaced-machine-coding' },
    { title: 'Design (LLD) Tinder Dating App - Machine Coding', url: 'https://lldcoding.com/design-lld-tinder-dating-app-machine-coding' },
    { title: 'Design (LLD) WhatsApp Messenger - Machine Coding', url: 'https://lldcoding.com/design-lld-whatsapp-messenger-machine-coding' },
    { title: 'Design (LLD) Gmail - Machine Coding', url: 'https://lldcoding.com/design-lld-gmail-machine-coding' },
    { title: 'Design (LLD) Game Engine like Unreal - Machine Coding', url: 'https://lldcoding.com/design-lld-game-engine-like-unreal-machine-coding' },
    { title: 'Design (LLD) Real-Time Chat System with Millions of Users', url: 'https://lldcoding.com/design-lld-a-real-time-chat-system-with-support-for-millions-of-concurrent-users-machine-coding' },
    { title: 'Design (LLD) Video Conferencing App like Zoom', url: 'https://lldcoding.com/design-lld-a-video-conferencing-application-like-zoom-machine-coding' },
    { title: 'Design (LLD) Cryptocurrency Exchange Platform', url: 'https://lldcoding.com/design-lld-a-cryptocurrency-exchange-platform-machine-coding' },
    { title: 'Design (LLD) Collaborative Document Editing (Google Docs)', url: 'https://lldcoding.com/design-lld-a-real-time-collaborative-document-editing-platform-like-google-docs-machine-coding' },
    { title: 'Design (LLD) Payment Recommendation System- Machine Coding', url: 'https://interview.lldcoding.com/' },
    { title: 'Design (LLD) Alexa - Machine Coding', url: 'https://www.lldcoding.com/design-lld-alexa-machine-coding' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">LLD Problem Sheet</h2>
      <p className="text-gray-700 mb-6">
        Solve real-world **Low-Level Design** problems. Sign in to unlock all challenges!
      </p>

      <h3 className="text-xl font-semibold text-gray-900 mb-4">Beginner Problems</h3>
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Problem Title</th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Link</th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Video</th>
          </tr>
        </thead>
        <tbody>
          {beginnerProblems.map((problem, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4 text-sm text-gray-800">{problem.title}</td>
              <td className="py-2 px-4 text-sm text-blue-500">
                <a href={problem.url} className="hover:underline">{problem.url}</a>
              </td>
              <td className="py-2 px-4 text-sm text-blue-500">
                {problem.video && <a href={problem.video} className="hover:underline">Watch</a>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="text-xl font-semibold text-gray-900 mt-8">Intermediate Problems</h3>
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Problem Title</th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Link</th>
            <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Video</th>
          </tr>
        </thead>
        <tbody>
          {intermediateProblems.map((problem, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4 text-sm text-gray-800">{problem.title}</td>
              <td className="py-2 px-4 text-sm text-blue-500">
                <a href={problem.url} className="hover:underline">{problem.url}</a>
              </td>
              <td className="py-2 px-4 text-sm text-blue-500"></td>
            </tr>
          ))}
        </tbody>
     </table>
    </div>
  );
}
