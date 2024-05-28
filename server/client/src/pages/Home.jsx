import React, { useState, useEffect, useContext } from 'react';
import { DisplayCampaigns, DisplayAllCampaigns } from '../components';
import { useStateContext } from '../context';
import { UserContext } from '../context/userContext'; // Import UserContext

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
      <div className="home">
        <DisplayCampaigns
          title="All Campaigns"
          isLoading={isLoading}
          campaigns={campaigns}
        />
      </div>
  );
};

export default Home;
