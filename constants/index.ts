export const sidebarLinks = [
  {
    imgURL: '/icons/home.svg',
    route: '/',
    label: 'Home',
  },
  {
    imgURL: '/icons/users.svg',
    route: '/community',
    label: 'Community',
  },
  {
    imgURL: '/icons/star.svg',
    route: '/collections',
    label: 'Collections',
  },
  {
    imgURL: '/icons/suitcase.svg',
    route: '/find-jobs',
    label: 'Find Jobs',
  },
  {
    imgURL: '/icons/tag.svg',
    route: '/tags',
    label: 'Tags',
  },
  {
    imgURL: '/icons/user.svg',
    route: '/profile',
    label: 'Profile',
  },
  {
    imgURL: '/icons/question.svg',
    route: '/ask-question',
    label: 'Ask a question',
  },
];

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

export const API_USERS_URL = `${API_BASE_URL}/users`;
export const API_ACCOUNTS_URL = `${API_BASE_URL}/accounts`;
