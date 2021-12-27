import { AuthConfig } from 'angular-oauth2-oidc';

// INTROSPECTION
// with Keycloak 11.0.2
// siehe https://www.keycloak.org/docs/latest/securing_apps/index.html#endpoints-2


export const authConfig: AuthConfig = {
  issuer: 'https://steyer-identity-server.azurewebsites.net/identity',
  redirectUri: window.location.origin + '/index.html',
  clientId: 'spa-demo', // ah yes, max geheim
  scope: 'openid profile email voucher'
};