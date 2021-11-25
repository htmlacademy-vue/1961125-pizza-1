import { uniqueId, sortBy } from "lodash";
import {
  SET_CART_ITEMS,
  SET_CART_ADDITIONAL_ITEMS,
} from "@/store/mutation.types";
import { additionalItems } from "@/modules/cart/constants";

export default {
  namespaced: true,

  state: () => ({
    items: [],
    additionalItems: [],
  }),

  getters: {
    getSortedItems: (state) => sortBy(state.items, "id"),
    totalPrice: (state) =>
      state.items.reduce((acc, item) => acc + item.price * item.count, 0) +
      state.additionalItems.reduce(
        (acc, item) => acc + item.price * item.count,
        0
      ),
    isEmpty: (state) =>
      !state.items.length &&
      !state.additionalItems.filter((item) => item.count > 0).length,
    getItemById: (state) => (itemId) =>
      state.items.find((item) => item.id === itemId),
  },

  mutations: {
    [SET_CART_ITEMS](state, payload) {
      state.items = payload;
    },
    [SET_CART_ADDITIONAL_ITEMS](state, payload) {
      state.additionalItems = payload;
    },
  },

  actions: {
    init({ dispatch }) {
      additionalItems.forEach((additionalItem) => {
        dispatch("addToAdditionalItems", additionalItem);
      });
    },
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
    editItem({ getters, state, commit }, { itemId, itemData }) {
      const item = getters.getItemById(itemId);
      const items = state.items.filter((item) => item.id !== itemId);

      Object.assign(item, itemData);

      items.push(item);

      commit(SET_CART_ITEMS, items);
    },
    clearItems({ commit }) {
      commit(SET_CART_ITEMS, []);
    },
    setAdditionalItems({ commit }, payload) {
      commit(SET_CART_ADDITIONAL_ITEMS, payload);
    },
    addToAdditionalItems({ commit, state }, payload) {
      const additionalItems = state.additionalItems;
      const additionalItem = payload;

      additionalItem.id = uniqueId("cart-additional-item-");
      additionalItem.count = 0;

      additionalItems.push(payload);

      commit(SET_CART_ADDITIONAL_ITEMS, additionalItems);
    },
    clearAdditionalItems({ commit }) {
      commit(SET_CART_ADDITIONAL_ITEMS, []);
    },
  },
};
