import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

import { axiosAPI } from "../api/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: useLocalStorage("Authenticated", null),
    username: useLocalStorage("Username", null),
  }),
  actions: {
    async getCSRFToken() {
      const response = await axiosAPI.get("csrf/", {
        credentials: "include",
      });

      let token = response.headers.get("X-CSRFToken");
      return token;
    },

    async getSession() {
      await axiosAPI.get("/session/");
    },

    async login(user) {
      await axiosAPI.post("/login/", user);
      const response = await axiosAPI.get("username/");
      this.username = response.data.username;
      this.isAuthenticated = true;
    },

    async register(user) {
      await axiosAPI.post("/api-auth/register/", user);
    },

    async logout() {
      await axiosAPI.post(
        "/api-auth/logout/",
        {},
        {
          withCredentials: true,
        }
      );
      this.isAuthenticated = null;
      localStorage.removeItem("Authenticated");

      this.username = null;
      localStorage.removeItem("Username");
    },
  },
});
