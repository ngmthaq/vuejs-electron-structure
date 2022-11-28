import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Bus from "./bus";
import API_CONSTANTS from "./const/api.const";
import APP_CONSTANTS from "./const/app.const";
import PATH_CONSTANTS from "./const/path.const";
import KEY_CONSTANTS from "./const/key.const";
import BACKGROUND_CONSTANTS from "./const/background.const";
import "./registerServiceWorker";

// Vue configs
Vue.config.productionTip = false;

// Vue prototype constants
Vue.prototype._apiConst = API_CONSTANTS;
Vue.prototype._appConst = APP_CONSTANTS;
Vue.prototype._keyConst = KEY_CONSTANTS;
Vue.prototype._pathConst = PATH_CONSTANTS;
Vue.prototype._backgroundConst = BACKGROUND_CONSTANTS;

// Vue prototype event bus
Vue.prototype._eventBus = Bus;

const app = new Vue({
  router: router,
  store: store,
  render: function (h) {
    return h(App);
  },
});

app.$mount("#app");
