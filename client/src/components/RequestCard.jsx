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
    <div className={`flex bg-gray-900 shadow-md rounded-lg p-4 space-x-4 text-white items-center relative`}>
      <img src={campaign.imageUrl} alt="Campaign" className="w-100 h-32 rounded-lg object-cover" />
      <div className="flex flex-col flex-grow">
        <h1 className="font-epilogue text-xl font-bold mb-4">{campaign.campaignTitle}</h1>
        <p className="font-epilogue text-md mb-4">{campaign.name}</p>
        <button 
          onClick={handleNavigate}
          className={`absolute top-12 right-4 px-4 py-2 bg-${borderColorClass} font-epilogue text-white rounded hover:bg-blue-600 transition duration-300 border-2 ${borderColorClass}`}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
