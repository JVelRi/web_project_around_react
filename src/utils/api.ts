import { API_URL, API_TOKEN } from "./constants";
import type { UserData, CardData, CardFormData } from "../types/types";

class Api {
  private baseUrl: string;
  private token: string;

  constructor(baseUrl: string, token: string) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        authorization: this.token,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Error ${res.status}`);
    }

    return res.json();
  }

  getUserInfo() {
    return this.request<UserData>("/users/me");
  }

  getCardInfo() {
    return this.request<CardData[]>("/cards");
  }

  updateUserInfo(name: string, about: string) {
    return this.request<UserData>("/users/me", {
      method: "PATCH",
      body: JSON.stringify({ name, about }),
    });
  }

  updateUserAvatar(avatar: string) {
    return this.request<UserData>("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    });
  }

  addCard(data: CardFormData) {
    return this.request<CardData>("/cards", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  deleteCard(cardId: string) {
    return this.request<unknown>(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  changeLikeStatus(cardId: string, isLiked: boolean) {
    return this.request<CardData>(`/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
    });
  }
}

const api = new Api(API_URL, API_TOKEN);

export default api;
