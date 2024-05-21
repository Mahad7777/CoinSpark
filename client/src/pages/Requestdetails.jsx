import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RequestDetails = () => {
  const {id} = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await axios.get(`/campaigns/${id}`);
        setCampaign(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching campaign:', error);
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (!campaign) {
    return <div className="text-white">Campaign not found</div>;
  }

  return (
    <div className="p-4 bg-[#13131a] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">{campaign.campaignTitle}</h1>
      <img src={campaign.imageUrl} alt={campaign.campaignTitle} className="w-full h-64 object-cover rounded mb-4" />
      <p className="mb-4"><strong>Organizer:</strong> {campaign.name}</p>
      <p className="mb-4"><strong>Email:</strong> {campaign.useremail}</p>
      <p className="mb-4"><strong>Story:</strong> {campaign.story}</p>
      <p className="mb-4"><strong>Goal:</strong> ${campaign.goal}</p>
      <p className="mb-4"><strong>End Date:</strong> {new Date(campaign.endDate).toLocaleDateString()}</p>
      <p className="mb-4"><strong>Wallet Address:</strong> {campaign.walletAddress}</p>
      <button>Make it live</button>
      <button>Rejected</button>
    </div>
  );
};

export default RequestDetails;
