export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const oauthPortalUrl =
    (import.meta.env.VITE_OAUTH_PORTAL_URL as string | undefined)?.trim() ||
    (import.meta.env.VITE_OAUTH_SERVER_URL as string | undefined)?.trim();
  const appId = import.meta.env.VITE_APP_ID;
  if (!oauthPortalUrl) {
    throw new Error(
      "OAuth portal URL is missing. Set VITE_OAUTH_PORTAL_URL (recommended) or VITE_OAUTH_SERVER_URL to the same base URL as OAUTH_SERVER_URL."
    );
  }
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};
