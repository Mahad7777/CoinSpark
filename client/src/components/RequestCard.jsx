import React from 'react';
import { useNavigate } from 'react-router-dom';

const RequestCard = ({ campaign }) => {
  const navigate = useNavigate()
  const handlenavigate =() => { 
    navigate(`/campaign-requests/${campaign._id}`)
  }

  return (
    <div className="flex bg-gray-800 shadow-md rounded-lg p-4 space-x-4 text-white">
      <img src={campaign.image} alt="Campaign" className="w-32 h-32 rounded-lg object-cover" />
      <div>
        <h2 className="text-xl font-bold">{campaign.campaignTitle}</h2>
        <p className="text-gray-300">{campaign.story}</p>
        <div className="mt-2">
          <button onClick={()=>{
            handlenavigate()
          }} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
