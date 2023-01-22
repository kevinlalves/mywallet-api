import { sessionCookieName } from "../constants.js";

export default function getSessionCookie(cookies) {
  return cookies?.split(`${sessionCookieName}=`)[1]?.split(";")[0];
}
