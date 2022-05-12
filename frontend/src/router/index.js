import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: () => import("../layouts/Main/Main.vue"),
    children: [
      {
        path: "/",
        name: "Dashboard",
        component: () => import("../views/Dashboard.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "",
    component: () => import("@/layouts/full-page/FullPage.vue"),
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => import("../views/Auth/Login.vue"),
        meta: {
          requiresAuth: false,
        },
      },
      {
        path: "/register",
        name: "Register",
        component: () => import("../views/Auth/Register.vue"),
        meta: {
          requiresAuth: false,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
