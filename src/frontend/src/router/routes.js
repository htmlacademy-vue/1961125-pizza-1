import { getView } from "@/common/helpers";

export default [
  {
    path: "/",
    name: "Index",
    component: getView("Index"),
    meta: { layout: "AppLayoutDefault" },
  },

  {
    path: "/cart",
    name: "Cart",
    component: getView("Cart"),
    meta: { layout: "AppLayoutDefault" },
  },

  {
    path: "/orders",
    name: "Orders",
    component: getView("Orders"),
    meta: { layout: "AppLayoutSidebar" },
  },

  {
    path: "/profile",
    name: "Profile",
    component: getView("Profile"),
    meta: { layout: "AppLayoutSidebar" },
  },

  {
    path: "/login",
    name: "Login",
    component: getView("Login"),
    meta: { layout: "AppLayoutEmpty" },
  },
];
