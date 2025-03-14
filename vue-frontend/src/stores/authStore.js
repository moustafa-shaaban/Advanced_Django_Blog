import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

import { axiosAPI } from "../api/axios";
import { Notify } from "quasar";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: useLocalStorage("Authenticated", null),
    username: useLocalStorage("Username", null),
  }),
  actions: {
    async getCSRFToken() {
      const response = await axiosAPI.get("csrf/");

      let token = response.headers.get("X-CSRFToken");
      return token;
    },

    async getSession() {
      await axiosAPI.get("/session/");
    },

    async login(user) {
      try {
        await axiosAPI.post(
          "http://localhost:8000/_allauth/browser/v1/auth/login",
          user
        );
        const response = await axiosAPI.get("username/");
        this.username = response.data.username;
        this.isAuthenticated = true;
      } catch (error) {
        Notify.create({
          message: error.message,
          type: "negative",
          actions: [{ icon: "close", color: "white", round: true }],
        });
      }
    },

    async logout() {
      await axiosAPI.post("/api-auth/logout/");
      this.isAuthenticated = null;
      localStorage.removeItem("Authenticated");
      this.username = null;
      localStorage.removeItem("Username");
      // await axiosAPI.delete("http://localhost:8000/_allauth/browser/v1/auth/session");
    },

    // async register(user) {
    //   await axiosAPI.post(
    //     "http://localhost:8000/_allauth/browser/v1/auth/signup",
    //     user
    //   );
    //   router.push('/verify-email')
    // },

    // async verifyEmail(key) {
    //   await axiosAPI.post(
    //     "http://localhost:8000/_allauth/browser/v1/auth/email/verify",
    //     key
    //   );
    // },
  },
});
