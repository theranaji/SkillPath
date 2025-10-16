import React from 'react';
import { useNavigate } from 'react-router-dom';

const SectionCard = ({ section, progress, icon, color }) => {
  const navigate = useNavigate();
  const completedPercentage = Math.round(progress || 0);
  const remainingPercentage = 100 - completedPercentage;

  return (
    <div
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden border border-gray-100"
      onClick={() => navigate(`/section/${section}`)}
    >
      <div className={`h-2 bg-gradient-to-r ${color}`}></div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{icon}</div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">{section}</h3>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-800">{completedPercentage}%</div>
            <div className="text-sm text-gray-500">Complete</div>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{completedPercentage}% of 100%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completedPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Done: {completedPercentage}%</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Remaining: {remainingPercentage}%</span>
            </div>
          </div>
          <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
            View Topics →
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionCard;