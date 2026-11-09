// The panel is normally reached on the origin the Worker itself serves, but it
// can also be exposed under an additional public origin (for example a CDN
// hostname in front of the Worker). Requests submitted from such an origin are
// legitimate panel requests, so the CSRF origin check accepts an exact-match
// allowlist of extra origins, configured via the PANEL_ALLOWED_ORIGINS
// environment variable as a comma-separated list of origins.
export function originAllowed(headerOrigin: string | undefined, requestUrl: string, allowedList?: string): boolean {
  if (!headerOrigin) return false;
  if (headerOrigin === new URL(requestUrl).origin) return true;
  if (!allowedList) return false;
  return allowedList.split(',').map((value) => value.trim()).filter(Boolean).includes(headerOrigin);
}
