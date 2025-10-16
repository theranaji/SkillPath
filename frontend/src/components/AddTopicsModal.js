import React, { useState } from 'react';
import { topicService } from '../services/api';

const AddTopicsModal = ({ isOpen, onClose, section, onTopicsAdded }) => {
  const [topics, setTopics] = useState([{ name: '', description: '' }]);
  const [loading, setLoading] = useState(false);

  const addTopicField = () => {
    setTopics([...topics, { name: '', description: '' }]);
  };

  const removeTopicField = (index) => {
    setTopics(topics.filter((_, i) => i !== index));
  };

  const updateTopic = (index, field, value) => {
    const updatedTopics = topics.map((topic, i) => 
      i === index ? { ...topic, [field]: value } : topic
    );
    setTopics(updatedTopics);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const validTopics = topics.filter(topic => topic.name.trim() && topic.description.trim());
      if (validTopics.length === 0) {
        alert('Please add at least one valid topic');
        return;
      }

      await topicService.addBulkTopics(section, validTopics);
      alert(`✅ ${validTopics.length} topics added successfully!`);
      onTopicsAdded();
      onClose();
      setTopics([{ name: '', description: '' }]);
    } catch (error) {
      alert('Error adding topics: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const addPredefinedTopics = () => {
    const htmlCssJsTopics = [
      { name: 'HTML Basics', description: 'Tags, elements, document structure' },
      { name: 'HTML Forms', description: 'Input types, validation, form handling' },
      { name: 'CSS Selectors', description: 'Class, ID, pseudo selectors' },
      { name: 'CSS Flexbox', description: 'Layout with flexbox' },
      { name: 'CSS Grid', description: 'Grid layout system' },
      { name: 'JavaScript Basics', description: 'Variables, functions, data types' },
      { name: 'JavaScript ES6', description: 'Arrow functions, destructuring' },
      { name: 'DOM Manipulation', description: 'Event handling, DOM API' }
    ];
    setTopics(htmlCssJsTopics);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Add Topics to {section}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <button
              type="button"
              onClick={addPredefinedTopics}
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors"
            >
              📚 Load Default HTML/CSS/JS Topics
            </button>
          </div>

          <div className="space-y-4 mb-6">
            {topics.map((topic, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-gray-700">Topic {index + 1}</h3>
                  {topics.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTopicField(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      🗑️ Remove
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Topic Name"
                    value={topic.name}
                    onChange={(e) => updateTopic(index, 'name', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                  <textarea
                    placeholder="Topic Description"
                    value={topic.description}
                    onChange={(e) => updateTopic(index, 'description', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 h-20 resize-none"
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={addTopicField}
              className="bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors"
            >
              ➕ Add Another Topic
            </button>
            
            <div className="space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? '⏳ Adding...' : '✅ Add Topics'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTopicsModal;