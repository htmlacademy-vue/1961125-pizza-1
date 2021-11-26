import Vue from "vue";
import Vuex from "vuex";
import Builder from "./modules/builder";
import Auth from "./modules/auth";
import Cart from "./modules/cart";
import Orders from "./modules/orders";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Builder,
    Auth,
    Cart,
    Orders,
  },
});
