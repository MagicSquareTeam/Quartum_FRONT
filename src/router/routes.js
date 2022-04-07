const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/PageHome.vue"),
        name: "Главная",
        meta: {
          icon: "fas fa-home"
        }
      },
      {
        path: "/overview",
        component: () => import("pages/PageOverview.vue"),
        name: "Обзор",
        meta: {
          icon: "fas fa-stream"
        }
      },
      {
        path: "/profile",
        component: () => import("pages/PageProfile.vue"),
        name: "Профиль",
        meta: {
          icon: "fas fa-user-circle"
        }
      },
      {
        path: "/favourite",
        component: () => import("pages/PageFavourite.vue"),
        name: "Избранное",
        meta: {
          icon: "fas fa-star"
        }
      },
      {
        path: "/archive",
        component: () => import("pages/PageArchived.vue"),
        name: "Архив",
        meta: {
          icon: "fas fa-archive"
        }
      }
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];


export default routes;
