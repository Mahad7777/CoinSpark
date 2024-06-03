import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const DocumentCard = ({ doc, index }) => (
  <div className=" flex justify-center items-center bg-gray-800 shadow-md rounded-lg hover:bg-[#3498db] p-4 text-white mr-4 mb-4" style={{ width: '150px', height: '150px' }}>
    <a href={`http://localhost:8000/${doc}`} target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-black underline flex justify-center">
      Document {index + 1}
    </a>
  </div>
);

const RequestDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
  }, [id]); // <-- Empty dependency array

  const rejectRequest = async () => {
    try {
      const response = await axios.patch(`/campaigns/${id}`, { status: 'rejected' });
      toast.success(response.data.message);
      navigate('/campaign-requests');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error('Server error');
      }
    }
  };

  const makeLive = async () => {
    try {
      const response = await axios.patch(`/campaigns/${id}`, { status: 'accepted' });
      toast.success(response.data.message);
      navigate('/create-campaign', { state: { campaign } });
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error('Server error');
      }
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (!campaign) {
    return <div className="text-white">Campaign not found</div>;
  }

  return (
    <div className="p-8 min-h-screen text-white rounded-lg font-epilogue bg-gray-900">
      <div className='flex justify-center pb-5'>
        <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#1abc9c] rounded-[10px]">
          <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-black">{campaign.campaignTitle}</h1>
        </div>
      </div>
      <div className="flex flex-wrap justify-between items-start">
        {/* Image on the left */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <img src={campaign.imageUrl} alt={campaign.campaignTitle} className="w-full h-72 object-cover rounded-lg mb-6" />
        </div>
        {/* Details on the right */}
        <div className="w-full md:w-1/2 md:pl-6 text-gray-300">
          <div className="mb-6">
            <p className="mb-2 text-lg">{campaign.name}</p>
            <p className="mb-2 text-lg">{campaign.useremail}</p>
            <p className="mb-4 text-lg">RS {campaign.goal}</p>
            <p className="mb-2 text-lg">{new Date(campaign.endDate).toLocaleDateString()}</p>
            <p className="mb-2 text-lg">{campaign.walletAddress}</p>
            <p className="mb-2 text-lg">{campaign.status}</p>
            {/* Add other details here */}
          </div>
          {/* Story and additional details */}
          <div className="mb-4">
            <p className="text-lg"><strong>Story:</strong> {campaign.story}</p>
            {/* Add other details here */}
          </div>
        </div>
      </div>
      {/* Supporting Documents section */}
      <div className="mb-4">
        <p className="text-lg pb-3 text-gray-300"><strong>Supporting Documents:</strong></p>
        <div className="flex flex-wrap">
          {campaign.documents.map((doc, index) => (
            <DocumentCard key={index} doc={doc} index={index} />
          ))}
        </div>
      </div>
      {/* Action buttons */}
      <div className="flex">
        <button onClick={makeLive} className="bg-green-600 hover:bg-green-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
          Make it Live
        </button>
        <button onClick={rejectRequest} className="bg-red-600 hover:bg-red-400 text-black font-bold ml-5 py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300">
          Reject
        </button>
      </div>
    </div>
  );
};

export default RequestDetails;
