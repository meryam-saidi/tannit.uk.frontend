import { UserManagerSettings } from 'oidc-client-ts';

const authConfig: UserManagerSettings = {
  authority: "https://localhost:7111", // IdentityServer
  client_id: "tannit_web_client",
  redirect_uri: "http://localhost:3000/callback", // callback page du frontend
  post_logout_redirect_uri: "http://localhost:3000/",
  response_type: "code",
  //scope: "openid profile api1 offline_access",
  scope: "openid profile api1",
  //automaticSilentRenew: true,
  //loadUserInfo: true,
};

export default authConfig;
