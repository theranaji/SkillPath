import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { progressService } from '../services/api';

const SectionView = () => {
  const { sectionName } = useParams();
  const [topics, setTopics] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem('username');
        const userResponse = await progressService.getUserByUsername(username);
        setUserId(userResponse.data.id);

        const topicsResponse = await progressService.getTopicsBySection(sectionName);
        setTopics(topicsResponse.data);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    fetchData();
  }, [sectionName]);

  const handleTopicComplete = async (topicId) => {
    try {
      await progressService.markTopicComplete(userId, topicId);
      alert('Topic marked as complete!');
    } catch (error) {
      console.error('Error marking topic complete:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">{sectionName} Topics</h1>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600"
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="grid gap-4">
          {topics.map(topic => (
            <div key={topic.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{topic.name}</h3>
                  <p className="text-gray-600 mt-2">{topic.description}</p>
                </div>
                <button
                  onClick={() => handleTopicComplete(topic.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Mark Complete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionView;