import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLoading: false,
    isCallingApi: false,
  },

  getters: {
    getIsLoading(state) {
      return state.isLoading;
    },

    getIsCallingApi(state) {
      return state.isCallingApi;
    },
  },

  mutations: {
    setIsLoading(state, payload) {
      state.isLoading = payload.isLoading;
    },

    setIsCallingApi(state, payload) {
      state.isCallingApi = payload.isCallingApi;
    },
  },

  actions: {},

  modules: {},
});

export default store;
