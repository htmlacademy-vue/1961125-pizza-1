import Vue from "vue";
import Vuex from "vuex";
import { sidebarLinks } from "@/common/constants";
import Builder from "./modules/builder";
import Auth from "./modules/auth";
import Cart from "./modules/cart";
import Orders from "./modules/orders";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sidebarLinks: Object.freeze(sidebarLinks),
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    Builder,
    Auth,
    Cart,
    Orders,
  },
});
