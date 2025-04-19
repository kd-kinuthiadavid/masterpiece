import { useCookies } from "next-client-cookies";

export const ACCESS_TOKEN_COOKIE_NAME = "access_token";

export default function useCookiesUtils() {
  const cookies = useCookies();
  const accessToken = cookies.get(ACCESS_TOKEN_COOKIE_NAME);

  function getAccessToken() {
    return cookies.get(ACCESS_TOKEN_COOKIE_NAME);
  }

  function setAccessToken(token: string) {
    cookies.set(ACCESS_TOKEN_COOKIE_NAME, token, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
  }

  function removeAccessToken() {
    cookies.remove(ACCESS_TOKEN_COOKIE_NAME);
  }

  return { accessToken, getAccessToken, setAccessToken, removeAccessToken };
}
