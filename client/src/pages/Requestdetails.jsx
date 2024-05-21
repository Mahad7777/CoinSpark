import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-hot-toast'

const RequestDetails = () => {
    const navigate = useNavigate()
  const {id} = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // Skip the effect if id is falsy
  
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
  
    // Since we only want this effect to run once, pass an empty dependency array
  }, [id]); // <-- Empty dependency array
  

  const rejectRequest = async () => {
    try {    
        const response = await axios.patch(`/campaigns/${id}`, { status: 'rejected' });
        toast.success(response.data.message)
        navigate('/campaign-requests')
    } catch (err) {
        if (err.response && err.response.data && err.response.data.error) {
            toast.error(err.response.data.error);
        } else {
            toast.error('Server error');
        }
    }
  }

  const makeLive = () => {
    navigate('/create-campaign', { state: { campaign } });
  };


  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (!campaign) {
    return <div className="text-white">Campaign not found</div>;
  }

  return (
    <div className="p-8 bg-[#1a1a2e] min-h-screen text-white">
  <div className="max-w-3xl mx-auto bg-[#2e2e4d] p-6 rounded-lg shadow-md">
    <h1 className="text-4xl font-bold mb-6 text-center">{campaign.campaignTitle}</h1>
    <img src={campaign.imageUrl} alt={campaign.campaignTitle} className="w-full h-72 object-cover rounded-lg mb-6" />
    <div className="mb-6">
      <p className="mb-2 text-lg"><strong>Organizer:</strong> {campaign.name}</p>
      <p className="mb-2 text-lg"><strong>Email:</strong> {campaign.useremail}</p>
      <p className="mb-4 text-lg"><strong>Story:</strong> {campaign.story}</p>
      <p className="mb-2 text-lg"><strong>Goal:</strong> ${campaign.goal}</p>
      <p className="mb-2 text-lg"><strong>End Date:</strong> {new Date(campaign.endDate).toLocaleDateString()}</p>
      <p className="mb-2 text-lg"><strong>Wallet Address:</strong> {campaign.walletAddress}</p>
      <p className="mb-2 text-lg"><strong>Status:</strong> {campaign.status}</p>
    </div>
    <div className="flex justify-between">
      <button onClick={makeLive} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
        Make it Live
      </button>
      <button onClick={rejectRequest} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
        Reject
      </button>
    </div>
  </div>
</div>

  );
};

export default RequestDetails;
