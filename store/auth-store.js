import { defineStore } from "pinia";

import * as authApi from "../api/auth-api";

export const authStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
  actions: {
    async login(input) {
      try {
        // console.log(input);
        const res = await authApi.login(input);
        const token = useCookie("accessToken");
        token.value = res.data;
        const resFetchMe = await authApi.fetchMe();
        this.isAuthenticated = true;
        this.user = resFetchMe.data;
      } catch (error) {
        console.log(error);
      }
    },

    async fetchMe() {
      try {
        const res = await authApi.fetchMe();
        this.isAuthenticated = true;
        this.user = res.data;
        // console.log("I'm here");
      } catch (error) {
        console.log(error);
      }
    },

    logout() {
      try {
        const token = useCookie("accessToken");
        // console.log(token);
        this.isAuthenticated = false;
        this.user = null;
        token.value = null;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
