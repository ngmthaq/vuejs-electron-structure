import Vue from "vue";
import VueRouter from "vue-router";
import PATH_CONSTANTS from "../const/path.const";

Vue.use(VueRouter);

const DEFAULT_TITLE = "Vuejs 2 with Electron Application";

const routes = Object.values(PATH_CONSTANTS).map((config) => ({
  name: config.name,
  path: config.path,
  component: config.component,
  meta: { title: config.title || DEFAULT_TITLE },
}));

const router = new VueRouter({
  mode: "hash", // "history", "hash", "abstract"
  base: process.env.BASE_URL,
  routes,
});

router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = to.meta.title;
  });
});

export default router;
