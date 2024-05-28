import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import FundCard from './FundCard';
import { loader } from '../assets';
import { daysLeft } from '../utils';
import { UserContext } from '../context/userContext';

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
    const navigate = useNavigate();
    const {isAdmin} = useContext(UserContext)

    const handleNavigate = (campaign) => {
        navigate(`/campaign-details/${campaign.title}`, { state: campaign })
    }

    // Filter campaigns with remaining days >= 0
    const displayedCampaigns = campaigns.filter(campaign => daysLeft(campaign.deadline) >= 0);

    return (
        <div>
            <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
                {title} ({displayedCampaigns.length})
            </h1>

            <div className="flex flex-wrap mt-[20px] gap-[26px]">
                {isLoading && (
                    <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
                )}

                {!isLoading && displayedCampaigns.length === 0 && (
                    <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
                        You have not created any campaigns yet
                    </p>
                )}

                {!isLoading && displayedCampaigns.length > 0 && displayedCampaigns.map((campaign) => (
                    <FundCard 
                        key={uuidv4()}
                        {...campaign}
                        handleClick={() => handleNavigate(campaign)}
                    />
                ))}
            </div>
        </div>
    );
}

export default DisplayCampaigns;
