import { authStore } from "~/store/auth-store";

export default defineNuxtRouteMiddleware(async () => {
  const nuxtApp = useNuxtApp();
  const { fetchMe } = authStore();
  const token = useCookie("accessToken");
  try {
    if (token.value) {
      await fetchMe();
      // console.log("Yessss");
    }
  } catch (error) {
    console.log(error);
  }
  if (!token) {
    console.log("Noooooo");
    return nuxtApp.runWithContext(() => navigateTo("/"));
  }
});
