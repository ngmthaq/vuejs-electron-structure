import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";

const PATH_CONSTANTS = {
  home: {
    name: "home",
    path: "/",
    component: HomeView,
    title: "Homepage",
  },
  about: {
    name: "about",
    path: "/about",
    component: AboutView,
    title: "About",
  },
};

export default PATH_CONSTANTS;
