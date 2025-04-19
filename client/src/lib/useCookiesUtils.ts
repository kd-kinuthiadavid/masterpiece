/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCookies } from "next-client-cookies";

export const ACCESS_TOKEN_COOKIE_NAME = "access_token";
export const CURRENT_USER_COOKIE_NAME = "current_user";
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

  function setCurrentUser(user: any) {
    const userString = JSON.stringify(user);
    cookies.set(CURRENT_USER_COOKIE_NAME, userString, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
  }

  function getCurrentUser() {
    const userString = cookies.get(CURRENT_USER_COOKIE_NAME);
    return userString ? JSON.parse(userString) : null;
  }

  function removeAccessToken() {
    cookies.remove(ACCESS_TOKEN_COOKIE_NAME);
  }

  function removeCurrentUser() {
    cookies.remove(CURRENT_USER_COOKIE_NAME);
  }

  function removeAllCookies() {
    cookies.remove(ACCESS_TOKEN_COOKIE_NAME);
    cookies.remove(CURRENT_USER_COOKIE_NAME);
  }

  return {
    accessToken,
    getAccessToken,
    setAccessToken,
    removeAccessToken,
    setCurrentUser,
    getCurrentUser,
    removeCurrentUser,
    removeAllCookies,
  };
}
