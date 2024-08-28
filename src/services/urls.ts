const namespaces = 'payment';

const URL = {
  LOGIN: `${namespaces}/login`,
  USER_ME: `${namespaces}/me`,
  LOGOUT: `${namespaces}/logout`,
  RESET_PASSWORD: `${namespaces}/change-password`,
  TOKEN_PRIZE: `${namespaces}/tokenPrice`,
  INITIATE_PAYMENT: `${namespaces}/method/attach`,
  CREATE_PAYMENT: `${namespaces}/create`,
  PRICING_PLANS: `product/subscription/plans`,
  PLAN_CHECKOUT: `${namespaces}/checkout`,
  PLAN_VERIFY: `${namespaces}/verify`,
};

export default URL;
