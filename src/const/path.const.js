import HomeView from "../views/HomeView.vue";
import BookingView from "../views/BookingView.vue";

const PATH_CONSTANTS = {
  home: {
    name: "home",
    path: "/",
    component: HomeView,
    title: "Homepage",
  },
  booking: {
    name: "booking",
    path: "/booking",
    component: BookingView,
    title: "Booking",
  },
};

export default PATH_CONSTANTS;
