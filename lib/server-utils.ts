import { cookies } from "next/headers";

export async function getCurrentUserServer() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("user")?.value;
  return userCookie ? JSON.parse(userCookie) : null;
}
