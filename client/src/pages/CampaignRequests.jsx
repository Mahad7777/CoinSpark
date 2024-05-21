import React from 'react'
import { DisplayRequests } from '../components'

const CampaignRequests = () => {
  return (
    <div>
      <div>
      <h1 className="text-3xl font-bold text-center mt-6 text-white pb-5">Requested Campaigns</h1>
      <DisplayRequests />
    </div>
    </div>
  )
}

export default CampaignRequests