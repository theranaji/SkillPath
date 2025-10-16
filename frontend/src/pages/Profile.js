import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { progressService } from '../services/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState({});
  const [totalProgress, setTotalProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem('email');
        const userResponse = await progressService.getUserByEmail(email);
        setUser(userResponse.data);

        const progressResponse = await progressService.getProgress(userResponse.data.id);
        setProgress(progressResponse.data);
        
        // Calculate overall progress
        const progressValues = Object.values(progressResponse.data);
        const avg = progressValues.length > 0 
          ? progressValues.reduce((a, b) => a + b, 0) / progressValues.length 
          : 0;
        setTotalProgress(avg);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Profile
            </h1>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-6 mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{user.username}</h2>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">🎯 Overall Progress</h3>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Total Completion</span>
                  <span>{Math.round(totalProgress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${totalProgress}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800">
                {Math.round(totalProgress)}%
              </div>
            </div>
          </div>
        </div>

        {/* Progress by Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">📊 Progress by Section</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(progress).map(([section, percentage]) => (
              <div key={section} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-gray-800">{section}</h4>
                  <span className="text-lg font-bold text-gray-700">{Math.round(percentage)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      percentage >= 75 ? 'bg-green-500' :
                      percentage >= 50 ? 'bg-yellow-500' :
                      percentage >= 25 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>
                    {percentage >= 75 ? '🎉 Excellent' :
                     percentage >= 50 ? '👍 Good Progress' :
                     percentage >= 25 ? '📈 Getting Started' : '🚀 Just Beginning'}
                  </span>
                  <span>{Math.round(100 - percentage)}% remaining</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">🏆 Achievements</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {totalProgress >= 10 && (
              <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="text-3xl mb-2">🌟</div>
                <div className="font-semibold text-yellow-800">First Steps</div>
                <div className="text-xs text-yellow-600">10% Overall Progress</div>
              </div>
            )}
            {totalProgress >= 25 && (
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-3xl mb-2">🚀</div>
                <div className="font-semibold text-blue-800">Rising Star</div>
                <div className="text-xs text-blue-600">25% Overall Progress</div>
              </div>
            )}
            {totalProgress >= 50 && (
              <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-3xl mb-2">💪</div>
                <div className="font-semibold text-purple-800">Half Way Hero</div>
                <div className="text-xs text-purple-600">50% Overall Progress</div>
              </div>
            )}
            {totalProgress >= 75 && (
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-3xl mb-2">🏆</div>
                <div className="font-semibold text-green-800">Almost There</div>
                <div className="text-xs text-green-600">75% Overall Progress</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;