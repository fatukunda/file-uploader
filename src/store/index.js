import Vue from "vue";
import Vuex from "vuex";
import upload from "../store/upload";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    upload,
  },
});
