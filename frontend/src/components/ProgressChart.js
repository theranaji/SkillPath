import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProgressChart = ({ progress }) => {
  const data = {
    datasets: [{
      data: [progress, 100 - progress],
      backgroundColor: ['#10B981', '#E5E7EB'],
      borderWidth: 0,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    }
  };

  return (
    <div className="h-32 w-32 mx-auto">
      <Pie data={data} options={options} />
    </div>
  );
};

export default ProgressChart;