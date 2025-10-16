import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { progressService } from '../services/api';
import SectionCard from '../components/SectionCard';

const Dashboard = () => {
  const [progress, setProgress] = useState({});
  const [dailySections, setDailySections] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const sectionsData = [
    { name: 'Java', icon: '☕', color: 'from-orange-400 to-red-500' },
    { name: 'Spring Boot', icon: '🍃', color: 'from-green-400 to-green-600' },
    { name: 'Data Structures', icon: '🏗️', color: 'from-blue-400 to-blue-600' },
    { name: 'React', icon: '⚛️', color: 'from-cyan-400 to-blue-500' },
    { name: 'HTML CSS JS', icon: '🌐', color: 'from-yellow-400 to-orange-500' },
    { name: 'MySQL', icon: '🗄️', color: 'from-blue-500 to-indigo-600' },
    { name: 'Docker', icon: '🐳', color: 'from-blue-400 to-cyan-500' },
    { name: 'AWS', icon: '☁️', color: 'from-orange-400 to-yellow-500' },
    { name: 'Terraform', icon: '🏗️', color: 'from-purple-400 to-purple-600' },
    { name: 'Jenkins', icon: '🔧', color: 'from-gray-400 to-gray-600' },
    { name: 'Linux', icon: '🐧', color: 'from-yellow-400 to-orange-500' },
    { name: 'Git', icon: '📝', color: 'from-red-400 to-pink-500' },
    { name: 'Kubernetes', icon: '⚙️', color: 'from-blue-500 to-purple-600' },
    { name: 'Grafana', icon: '📊', color: 'from-orange-400 to-red-500' },
    { name: 'Ansible', icon: '🔄', color: 'from-red-500 to-pink-600' }
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem('email');
        const userResponse = await progressService.getUserByEmail(email);
        const uid = userResponse.data.id;
        setUserId(uid);
        setUserName(userResponse.data.username);

        const progressResponse = await progressService.getProgress(uid);
        setProgress(progressResponse.data);

        const dailyResponse = await progressService.getDailyProgress(uid);
        setDailySections(dailyResponse.data.sections);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/');
  };

  const getMotivationalMessage = () => {
    const javaProgress = progress['Java'] || 0;
    if (javaProgress < 25) return `${userName}, your Java journey is just beginning! 🚀`;
    if (javaProgress < 50) return `${userName}, you're making great progress in Java! Keep going! 💪`;
    if (javaProgress < 75) return `${userName}, you're more than halfway through Java! Amazing! 🎉`;
    return `${userName}, you're almost a Java master! Just ${100 - Math.round(javaProgress)}% remaining! 🏆`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SkillPath Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome back,</p>
                <p className="font-semibold text-gray-800">{userName}</p>
              </div>
              <button
                onClick={() => navigate('/profile')}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors"
              >
                👤 My Profile
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Motivational Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-4">🎯 Your Learning Journey</h2>
          <p className="text-lg mb-4">{getMotivationalMessage()}</p>
          {progress['Java'] && (
            <div className="bg-white/20 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Java Progress</span>
                <span className="font-bold">{Math.round(progress['Java'])}%</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-3">
                <div
                  className="bg-yellow-400 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${progress['Java']}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Daily Progress */}
        {dailySections.length > 0 && (
          <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-green-800 text-lg mb-2">🔥 Today's Achievement</h3>
            <p className="text-green-700">
              Great job! You studied: <span className="font-semibold">{Array.from(dailySections).join(', ')}</span>
            </p>
          </div>
        )}

        {/* Sections Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📚 Your Learning Sections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectionsData.map(section => (
              <SectionCard
                key={section.name}
                section={section.name}
                progress={progress[section.name] || 0}
                icon={section.icon}
                color={section.color}

              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;