// import { storeToRefs } from "pinia";

import { authStore } from "~/store/auth-store";

export default defineNuxtRouteMiddleware(() => {
  // const { isAuthenticated } = storeToRefs(authStore());
  const store = authStore()
  const isAuthenticated = store.isAuthenticated

  if (!isAuthenticated) {
    console.log("Authen : ");
    return navigateTo("/login");
  }
});
