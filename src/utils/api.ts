import { API_URL, API_TOKEN } from "./constants";
import type { UserData, CardData } from "./types";

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      authorization: API_TOKEN,
      "Content-Type": "application/json",
    },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`Error ${res.status}`);
  }
  return res.json();
}

export function getUserInfo() {
  return request<UserData>("/users/me");
}

export function getCardInfo() {
  return request<CardData[]>("/cards");
}

export function updateUserInfo(name: string, about: string) {
  return request<UserData>("/users/me", {
    method: "PATCH",
    body: JSON.stringify({ name, about }),
  });
}

export function updateUserAvatar(avatar: string) {
  return request<UserData>("/users/me/avatar", {
    method: "PATCH",
    body: JSON.stringify({ avatar }),
  });
}

export function addCard(name: string, link: string) {
  return request<CardData>("/cards", {
    method: "POST",
    body: JSON.stringify({ name, link }),
  });
}

export function updateLike(cardId: string, isLiked: boolean) {
  return request<CardData>(`/cards/${cardId}/likes`, {
    method: isLiked ? "DELETE" : "PUT",
  });
}

export function deleteCard(cardId: string) {
  return request<CardData>(`/cards/${cardId}`, {
    method: "DELETE",
  });
}
