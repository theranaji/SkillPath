import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { progressService } from '../services/api';

const SectionView = () => {
  const { sectionName } = useParams();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await progressService.getTopicsBySection(sectionName);
        setTopics(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching topics:', error);
        setLoading(false);
      }
    };

    fetchTopics();
  }, [sectionName]);

  if (loading) {
    return <div className="p-8">Loading {sectionName} topics...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{sectionName}</h1>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Back to Dashboard
          </button>
        </div>

        {topics.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl text-gray-600">No topics found for {sectionName}</h2>
          </div>
        ) : (
          <div className="space-y-4">
            {topics.map((topic, index) => (
              <div key={topic.id} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">{topic.name}</h3>
                <p className="text-gray-600">{topic.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionView;