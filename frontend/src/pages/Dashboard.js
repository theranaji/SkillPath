import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { progressService } from '../services/api';
import ProgressChart from '../components/ProgressChart';

const Dashboard = () => {
  const [progress, setProgress] = useState({});
  const [dailySections, setDailySections] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const sections = [
    'Java', 'Spring Boot', 'Data Structures', 'React', 'HTML/CSS/JavaScript',
    'MySQL', 'Docker', 'AWS', 'Terraform', 'Jenkins', 'Linux', 'Git',
    'Kubernetes', 'Grafana', 'Ansible'
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const username = localStorage.getItem('username');
        const userResponse = await progressService.getUserByUsername(username);
        const uid = userResponse.data.id;
        setUserId(uid);

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
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">SkillPath Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="container mx-auto p-6">
        {dailySections.length > 0 && (
          <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6">
            <h3 className="font-semibold text-green-800">Today's Progress</h3>
            <p className="text-green-700">
              You studied: {Array.from(dailySections).join(', ')}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map(section => (
            <div
              key={section}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/section/${section}`)}
            >
              <h3 className="text-xl font-semibold mb-4">{section}</h3>
              <ProgressChart progress={progress[section] || 0} />
              <p className="text-center mt-2 text-gray-600">
                {Math.round(progress[section] || 0)}% Complete
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;