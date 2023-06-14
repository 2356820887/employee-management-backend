import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "../views/LoginView.vue";
import IndexView from "../views/IndexView.vue";
import TestView from "../views/TestView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/index",
    name: "index",
    component: IndexView,
  },
  {
    path: "/test",
    name: "test",
    component: TestView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
