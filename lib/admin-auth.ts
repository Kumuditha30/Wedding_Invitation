import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "homecoming_admin";

function sign(value: string) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is missing.");

  return createHmac("sha256", secret).update(value).digest("hex");
}

export function makeAdminToken() {
  const value = `admin:${Date.now()}`;
  return `${value}.${sign(value)}`;
}

export function isValidAdminToken(token: string | undefined) {
  if (!token) return false;

  const dot = token.lastIndexOf(".");
  if (dot === -1) return false;

  const value = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  const expected = sign(value);

  if (signature.length !== expected.length) return false;

  try {
    return timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expected)
    );
  } catch {
    return false;
  }
}

export async function isAdmin() {
  const store = await cookies();
  return isValidAdminToken(store.get(COOKIE_NAME)?.value);
}

export { COOKIE_NAME };
