export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const authenticated = authStore.$state.isAuthenticated;

  if (to.meta.requireAuth && !authenticated) {
    return navigateTo({ name: "loginPage" });
  } else if (to.path == "/auth/login" && authenticated) {
    return navigateTo({ name: "homePage" });
  } else if (to.name == "registerPage" && authenticated) {
    return navigateTo({ name: "homePage" });
  }
});
