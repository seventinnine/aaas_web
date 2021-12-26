import { AuthConfig } from 'angular-oauth2-oidc';

// INTROSPECTION
// with Keycloak 11.0.2
// siehe https://www.keycloak.org/docs/latest/securing_apps/index.html#endpoints-2


export const authConfig: AuthConfig = {
  issuer: 'https://steyer-identity-server.azurewebsites.net/identity',
  redirectUri: window.location.origin + '/index.html',
  clientId: 'spa-demo', // ah yes, max geheim
  scope: 'openid profile email voucher'

  /*
  issuer: 'http://localhost:8080/auth/realms/AaaS',
  loginUrl: 'http://localhost:8080/auth/realms/AaaS/protocol/openid-connect/auth',
  logoutUrl: 'http://localhost:8080/realms/AaaS/protocol/openid-connect/logout',
  tokenEndpoint: 'http://localhost:8080/auth/realms/AaaS/protocol/openid-connect/token',
  sessionCheckIFrameUrl: 'http://localhost:8080/auth/realms/AaaS/protocol/openid-connect/login-status-iframe.html',
  userinfoEndpoint: 'http://localhost:8080/auth/realms/AaaS/protocol/openid-connect/userinfo',
  clientId: 'AaaS-demo',
  redirectUri: window.location.origin + '/index.html',
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  scope: 'profile email',
  silentRefreshTimeout: 5000, // For faster testing
  timeoutFactor: 0.25, // For faster testing
  sessionChecksEnabled: true,
  showDebugInformation: true, // Also requires enabling "Verbose" level in devtools
  clearHashAfterLogin: false, // https://github.com/manfredsteyer/angular-oauth2-oidc/issues/457#issuecomment-431807040
  */
};