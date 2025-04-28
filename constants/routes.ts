const ROUTES = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  QUESTION: (id: string) => `/question/${id}`,
  TAG: (id: string) => `/tags/${id}`,
};

export default ROUTES;
