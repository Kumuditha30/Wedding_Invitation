export const publicSiteUrl = "https://weddinginvitation-two-vert.vercel.app";

export function invitationUrl(code: string) {
  return `${publicSiteUrl}/i/${encodeURIComponent(code)}`;
}
