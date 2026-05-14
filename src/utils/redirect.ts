/**
 * Returns a safe relative redirect path.
 *
 * External URLs and protocol-relative URLs are rejected to prevent open-redirect
 * attacks (CWE-601). Only paths that begin with a single "/" (not "//") are
 * accepted; everything else falls back to `fallback`.
 *
 * @example
 * sanitizeRedirectUrl('/app/dashboard', '/') // → '/app/dashboard'
 * sanitizeRedirectUrl('https://evil.com', '/') // → '/'
 * sanitizeRedirectUrl('//evil.com', '/')       // → '/'
 * sanitizeRedirectUrl(null, '/app')            // → '/app'
 */

/** Matches any URI scheme such as http:, https:, javascript:, data:, etc. */
const PROTOCOL_SCHEME_RE = /^[a-zA-Z][a-zA-Z\d+\-.]*:/;

export function sanitizeRedirectUrl(
  redirectTo: string | null | undefined,
  fallback: string,
): string {
  if (!redirectTo) return fallback;

  // Reject protocol-relative URLs (//example.com) and absolute URLs
  // (http://, https://, javascript:, data:, etc.)
  if (redirectTo.startsWith('//') || PROTOCOL_SCHEME_RE.test(redirectTo)) {
    return fallback;
  }

  // Must start with a single "/" (not "//" – already handled above, but
  // kept here as an explicit defense-in-depth guard)
  if (!redirectTo.startsWith('/')) {
    return fallback;
  }

  return redirectTo;
}
