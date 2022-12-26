const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "random", component: () => import("pages/random.vue") },
      { path: "traning", component: () => import("pages/traning.vue") },
      { path: "water", component: () => import("pages/water.vue") },
      { path: "diet", component: () => import("pages/diet.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
