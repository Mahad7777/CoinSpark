import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RequestCard from './RequestCard';

const DisplayRequests = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get('/campaigns');
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className=" p-6 space-y-4">
      {campaigns.map(campaign => (
        <RequestCard
          key = {campaign._id}
          campaign={campaign}
        />
      ))}
    </div>
  );
};

export default DisplayRequests;
