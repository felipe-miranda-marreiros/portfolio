/** A stand-in session until Better Auth (ADR 0003): remembered for the tab, so a reload keeps the Owner signed in. */

const KEY = "cms-session";
let current: string | null = null;

export function isSignedIn(): boolean {
  if (current) return true;
  try {
    current = sessionStorage.getItem(KEY);
  } catch {
    // Storage blocked: only this page load's session counts.
  }
  return current !== null;
}

export function setSignedIn(email: string | null): void {
  current = email;
  try {
    if (email) sessionStorage.setItem(KEY, email);
    else sessionStorage.removeItem(KEY);
  } catch {
    // Storage blocked: the session lasts until the page reloads.
  }
}
