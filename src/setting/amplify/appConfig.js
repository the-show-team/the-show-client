const appConfig = {
  aws: {
    cognito: {
      region: 'ap-northeast-1',
      IdentityPoolId: process.env.REACT_APP_THE_SHOW_AWS_COGNITO_IDENTITY_POOL_ID,
      UserPoolId: process.env.REACT_APP_THE_SHOW_AWS_COGNITO_USER_POOL_ID,
      ClientId: process.env.REACT_APP_THE_SHOW_AWS_COGNITO_CLIENT_ID,
      GoogleClientID: process.env.REACT_APP_THE_SHOW_GOOGLE_CLIENT_ID
    }
  }
};

export default appConfig
