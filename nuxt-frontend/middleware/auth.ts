export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const authenticated = authStore.$state.isAuthenticated;

  if (to.meta.requireAuth && !authenticated) {
    return navigateTo("/login");
  } else if (to.path == "/auth/login" && authenticated) {
    return navigateTo("/");
  } else if (to.name == "registerPage" && authenticated) {
    return navigateTo("/");
  }
});
