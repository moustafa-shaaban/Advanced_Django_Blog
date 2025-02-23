import { createRouter, createWebHistory, useRouter } from "vue-router";

import { useAuthStore } from "@/stores/authStore";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  let authenticated = authStore.$state.isAuthenticated;
  const router = useRouter();

  if (to.meta.requireAuth && !authenticated) {
    next({ name: "login" });
  } else if (to.name == "login" && authenticated) {
    next({ name: "home" });
  } else if (to.name == "register" && authenticated) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
