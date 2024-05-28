import React from 'react'
import { DisplayRequests } from '../components'

const CampaignRequests = () => {
  return (
    <div>
      <div className='flex items-center flex-col'>
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#1abc9c] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-black">Campaign Requests</h1>
      </div>
      </div>
      <DisplayRequests />
    </div>
  )
}

export default CampaignRequests