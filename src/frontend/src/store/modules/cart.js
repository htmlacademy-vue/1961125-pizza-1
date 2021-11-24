import { SET_CART_ITEMS } from "@/store/mutation.types";

export default {
  namespaced: true,

  state: () => ({
    items: [],
    additionalItems: [],
  }),

  getters: {
    totalPrice: (state) =>
      state.items.reduce((acc, item) => acc + item.price, 0) +
      state.additionalItems.reduce((acc, item) => acc + item.price, 0),
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

      items.push(payload);

      commit(SET_CART_ITEMS, items);
    },
    clearItems({ commit }) {
      commit(SET_CART_ITEMS, []);
    },
  },
};
