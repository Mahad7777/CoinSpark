import React, { useEffect, useState } from 'react';
import { Scatter, Pie, Bar } from 'react-chartjs-2';
import { useStateContext } from '../context';
import { daysLeft } from '../utils';
import axios from 'axios';
// import 'moment/moment.js'; 
// Import necessary Chart.js components
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement, // Import PointElement
  Title,
  Tooltip,
  Legend,
  // TimeScale, // Import TimeScale
  // TimeSeriesScale, // Import TimeSeriesScale
} from 'chart.js';


// Register Chart.js components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement, // Register PointElement
  Title,
  Tooltip,
  Legend,
  // TimeScale, // Register TimeScale
  // TimeSeriesScale // Register TimeSeriesScale
);


const AdminDashboard = () => {
  const {address,contract,getCampaigns} = useStateContext()
  const [campaigns, setCampaigns] = useState([]);
  const [requests, setRequests] = useState([])

  // Dummy data for scatter plot
  const barData = {
    labels: [], // Static date labels for the past 7 days
    datasets: [
      {
        label: 'Number of Transactions',
        data: [1,1,2,1,3,6], // Dummy transaction counts
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const barOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: { color: '#F3F4F6' }, // Axis tick color
        grid: { color: '#4B5563' }, // Grid line color
      },
      y: {
        ticks: { color: '#F3F4F6' }, // Axis tick color
        grid: { color: '#4B5563' }, // Grid line color
      },
    },
    plugins: {
      legend: {
        labels: { color: '#F3F4F6' }, // Legend label color
      },
    },
  };
  

  async function fetchTransactionData() {
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      console.log(dateString)
      
      // Use Axios to fetch transaction count for the current date
      // const transactionCount = await fetchTransactionCountFromDate(dateString);
      barData.labels.push(dateString); // Use the same date format as in the database
      // barData.datasets[0].data.push(transactionCount);
    }
  }
  
  // Function to fetch transaction count using Axios for a given date
  async function fetchTransactionCountFromDate() {
    try {
      let date = '2024-06-03'
      // Make an Axios POST request to fetch transaction count for the given date
      const response = await axios.post('/transactions/bydate', { date });
      console.log(response.data.countbydate.count)
      // Extract the transaction count from the response
      const transactionCount = response.data.countbydate.count; // Assuming the response contains the transaction count
      
      return transactionCount;
    } catch (error) {
      console.error('Error fetching transaction count:', error);
      throw error;
    }
  }

  const data = fetchTransactionCountFromDate()
  barData.datasets[0].data.push(data);
  
  // Call the function to fetch transaction data
  fetchTransactionData();

  const fetchCampaigns = async () => {
    const data = await getCampaigns();
    setCampaigns(data);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  const displayedCampaigns = campaigns.filter(campaign => daysLeft(campaign.deadline) >= 0);
  const closedCampaigns = campaigns.length - displayedCampaigns.length;

  const pieData1 = {
    labels: ['Live Campaigns', 'Closed Campaigns'],
    datasets: [{
      data: [displayedCampaigns.length, closedCampaigns],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
      ],
    }],
  };

  const fetchRequests = async () => {
    try {
      const response = await axios.get('/campaigns');
        setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };
  
  useEffect(() => {
    fetchRequests();
  }, []);

  const accepted = requests.filter(request => request.status === 'accepted')
  const rejected = requests.filter(request => request.status === 'rejected')
  const pending = requests.filter(request => request.status === 'pending')


  const pieData2 = {
  labels: ['Accepted', 'Rejected', 'Pending'],
  datasets: [
    {
      data: [accepted.length, rejected.length, pending.length],
      backgroundColor: [
        'rgba(144, 238, 144, 0.6)', // Light Green for Accepted
        'rgba(255, 99, 71, 0.6)', // Light Red for Rejected
        'rgba(255, 255, 0, 0.6)', // Yellow for Pending
      ],
    },
  ],
};

  const pieData3 = {
    labels: ['Punjab', 'KPK', 'Sindh', 'Balochistan'],
    datasets: [{
      data: [2, 1, 1, 3],
      backgroundColor: [
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(255, 206, 86, 0.6)',
      ],
    }],
  };

  return (
    <div className="p-8 min-h-screen text-gray-200">
      <h1 className="flex justify-center text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">
        <div className="bg-gray-900 p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold mb-4">Campaigns</h2>
          <Pie data={pieData1} />
        </div>

        <div className="bg-gray-900 p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold mb-4">Requests</h2>
          <Pie data={pieData2} />
        </div>

        <div className="bg-gray-900 p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          <Pie data={pieData3} />
        </div>
      </div>
  
      <div className="bg-gray-900 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Transactions</h2>
          <Bar data={barData} options={barOptions} />
      </div>
    </div>
  );
};

export default AdminDashboard;

  // const today = new Date();
  // const pastSevenDays = [];
  
  // for (let i = 6; i >= 0; i--) {
  //   const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
  //   pastSevenDays.push(date);
  
  //   // Replace the following line with your logic to fetch the transaction count for the current date
  //   const transactionCount = Math.floor(Math.random() * 100); // Dummy data
  
  //   barData.labels.push(date.toDateString());
  //   barData.datasets[0].data.push(transactionCount);
  // }
  
  // Populate the labels and data arrays with past 7 days and transaction counts
