import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import SignUpView from "@/views/SignUpView.vue";
import SignInView from "@/views/SignInView.vue";
import PasswordForgetView from "@/views/PasswordForgetView.vue";
import CategoriesView from "@/views/CategoriesView.vue";
import PositionsView from "@/views/PositionsView.vue";
import WaitersView from "@/views/WaitersView.vue";
import OrdersView from "@/views/OrdersView.vue";
import TestView from "@/views/TestView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/sign-up",
    name: "sigh-up",
    component: SignUpView,
  },
  {
    path: "/sign-in",
    name: "sigh-in",
    component: SignInView,
  },
  {
    path: "/password-forget",
    name: "password-forget",
    component: PasswordForgetView,
  },
  {
    path: "/categories",
    name: "categories",
    component: CategoriesView,
  },
  {
    path: "/positions",
    name: "positions",
    component: PositionsView,
  },
  {
    path: "/waiters",
    name: "waiters",
    component: WaitersView,
  },
  {
    path: "/orders",
    name: "orders",
    component: OrdersView,
  },
  {
    path: "/test",
    name: "test",
    component: TestView,
  },
  {
    path: "/404",
    component: NotFoundView,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
