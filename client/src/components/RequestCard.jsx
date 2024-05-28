import React from 'react';
import { useNavigate } from 'react-router-dom';

const RequestCard = ({ campaign }) => {
  const navigate = useNavigate();

  const handleNavigate = () => { 
    navigate(`/campaign-requests/${campaign._id}`);
  };

  // Determine the border color based on the campaign status
  const borderColorClass = campaign.status === 'pending' ? 'border-yellow-200'
                        : campaign.status === 'accepted' ? 'border-green-300'
                        : 'border-red-500';

  return (
    <div className={`flex bg-gray-900 shadow-md rounded-lg p-4 space-x-4 text-white`}>
      {/* <img src={campaign.image} alt="Campaign" className="w-32 h-32 rounded-lg object-cover" /> */}
      <div className="flex flex-col flex-grow">
        <h2 className="text-xl font-bold">{campaign.campaignTitle}</h2>
        <p className="text-gray-300">{campaign.story}</p>
      </div>
      <button 
        onClick={handleNavigate}
        className={`px-4 py-2 bg-${borderColorClass} text-white rounded hover:bg-blue-600 transition duration-300 border-2 ${borderColorClass}`}
      >
        View Details
      </button>
    </div>
  );
};

export default RequestCard;
