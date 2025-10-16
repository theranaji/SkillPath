import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
      <div className="text-center text-white px-8">
        <div className="mb-8">
          <h1 className="text-6xl font-bold mb-4 animate-pulse">
            Welcome to <span className="text-yellow-400">SkillPath</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Master Your Technical Interview Skills • Track Your Progress • Achieve Your Goals
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            🚀 Get Started - Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            ✨ Join SkillPath - Register
          </button>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">15+ Tech Sections</h3>
            <p className="text-gray-300">Java, React, AWS, Docker, and more</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
            <p className="text-gray-300">Visual charts and daily summaries</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Interview Ready</h3>
            <p className="text-gray-300">Structured learning path</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;