import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Tasks from "../pages/Tasks.vue";
import Notes from "../pages/Notes.vue";
import NotFound from "../pages/NotFound.vue";

import { userSession } from "../helpers/use-auth";

const requireAuth = (next: any) => {
  if (userSession.value.session === null) {
    next("/login"); // Redirect to login page if not authenticated
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    component: Tasks,
    meta: { requiresAuth: true },
    beforeEnter: requireAuth,
  },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  {
    path: "/notes",
    component: Notes,
    meta: { requiresAuth: true },
    beforeEnter: requireAuth,
  },
  { path: "/:catchAll(.*)", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

