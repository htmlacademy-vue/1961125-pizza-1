import { uniqueId } from "lodash";
import { SET_CART_ITEMS } from "@/store/mutation.types";

export default {
  namespaced: true,

  state: () => ({
    items: [],
    additionalItems: [],
  }),

  getters: {
    totalPrice: (state) =>
      state.items.reduce((acc, item) => acc + item.price * item.count, 0) +
      state.additionalItems.reduce(
        (acc, item) => acc + item.price * item.count,
        0
      ),
    isEmpty: (state) => !state.items.length && !state.additionalItems.length,
  },

  mutations: {
    [SET_CART_ITEMS](state, payload) {
      state.items = payload;
    },
  },

  actions: {
    setItems({ commit }, payload) {
      commit(SET_CART_ITEMS, payload);
    },
    addToItems({ commit, state }, payload) {
      const items = state.items;
      const item = payload;

      item.id = uniqueId("cart-item-");
      item.count = 1;

      items.push(payload);

      commit(SET_CART_ITEMS, items);
    },
    clearItems({ commit }) {
      commit(SET_CART_ITEMS, []);
    },
  },
};
