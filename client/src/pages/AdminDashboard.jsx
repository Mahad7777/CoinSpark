import React from 'react';
import { Scatter, Pie } from 'react-chartjs-2';

// Import necessary Chart.js components
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement, // Import PointElement
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement, // Register PointElement
  Title,
  Tooltip,
  Legend
);


const AdminDashboard = () => {
  // Dummy data for scatter plot
  const scatterData = {
    datasets: [
      {
        label: 'Dataset 1',
        data: [
          { x: 1, y: 2 },
          { x: 2, y: 3 },
          { x: 3, y: 4 },
          { x: 4, y: 5 },
          { x: 5, y: 6 },
        ],
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: 'Dataset 2',
        data: [
          { x: 1, y: 1 },
          { x: 2, y: 4 },
          { x: 3, y: 2 },
          { x: 4, y: 7 },
          { x: 5, y: 3 },
        ],
        backgroundColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };

  const scatterOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: { color: '#F3F4F6' }, // Axis tick color
        grid: { color: '#4B5563' },  // Grid line color
      },
      y: {
        ticks: { color: '#F3F4F6' }, // Axis tick color
        grid: { color: '#4B5563' },  // Grid line color
      },
    },
    plugins: {
      legend: {
        labels: { color: '#F3F4F6' }, // Legend label color
      },
    },
  };

  // Dummy data for pie charts
  const pieData1 = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
      ],
    }],
  };

  const pieData2 = {
    labels: ['Green', 'Purple', 'Orange'],
    datasets: [{
      data: [200, 100, 150],
      backgroundColor: [
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
      ],
    }],
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-gray-200">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Scatter Plot</h2>
          <Scatter data={scatterData} options={scatterOptions} />
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Pie Chart 1</h2>
          <Pie data={pieData1} />
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Pie Chart 2</h2>
          <Pie data={pieData2} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
