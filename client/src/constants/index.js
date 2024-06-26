import { createCampaign, dashboard, logout, payment, profile, withdraw } from '../assets';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'campaign',
    imgUrl: createCampaign,
    link: '/submit-request',
  },

  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/',
    disabled: true,
  },
];

export const adminNavlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/admin-dashboard',
  },
  {
    name: 'campaign',
    imgUrl: createCampaign,
    link: '/create-campaign',
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/campaign-requests',
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/',
    disabled: true,
  },
];