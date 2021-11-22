export default [
  {
    path: "/",
    name: "Index",
    component: () => import("../views/Index.vue"),
    meta: { layout: "AppLayoutDefault" },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
    meta: { layout: "AppLayoutDefault" },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders.vue"),
    meta: {
      layout: "AppLayoutSidebar",
      sidebarLinks: [
        {
          to: "/orders",
          label: "История заказов",
        },
        {
          to: "/profile",
          label: "Мои данные",
        },
      ],
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: {
      layout: "AppLayoutSidebar",
      sidebarLinks: [
        {
          to: "/orders",
          label: "История заказов",
        },
        {
          to: "/profile",
          label: "Мои данные",
        },
      ],
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: { layout: "AppLayoutEmpty" },
  },
];
