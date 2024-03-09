const apiPath = '/api/v1';

export default {
  signupApiPath: () => [apiPath, 'signup'].join('/'),
  loginPath: () => [apiPath, 'login'].join('/'),
  usersPath: () => [apiPath, 'data'].join('/'),
};