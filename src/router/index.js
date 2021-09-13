import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Product from "../views/Product.vue";
import Category from "../views/Category.vue";
import Search from "../views/Search.vue";
import Cart from "../views/Cart.vue";
import Checkout from "../views/Checkout.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import MyAccount from "../views/MyAccount.vue";
import Success from "../views/Success.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/:category_slug/:product_slug/",
    name: "Product",
    component: Product,
  },
  {
    path: "/:category_slug/",
    name: "Category",
    component: Category,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
    meta: {
      requiredLogin: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/myaccount",
    name: "MyAccount",
    component: MyAccount,
    meta: {
      requiredLogin: true,
    },
  },
  {
    path: "/checkout/success",
    name: "Success",
    component: Success,
    meta: {
      requiredLogin: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requiredLogin) &&
    !store.state.isAuthenticated
  ) {
    next({ name: "Login", query: { to: to.path } });
  } else {
    next();
  }
});

export default router;
