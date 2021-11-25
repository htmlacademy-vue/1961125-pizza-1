import { uniqueId } from "lodash";
import {
  SET_CART_ITEMS,
  SET_CART_ADDITIONAL_ITEMS,
} from "@/store/mutation.types";
import { additionalItems } from "@/modules/cart/constants";

const testItems = [
  {
    dough: "light",
    size: "normal",
    sauce: "tomato",
    ingredients: { ham: 1, onion: 1 },
    name: "ghbdtn",
    price: 826,
    id: "cart-item-1",
    count: 3,
  },
  {
    dough: "large",
    size: "big",
    sauce: "tomato",
    ingredients: { mushrooms: 2, olives: 1, tomatoes: 1 },
    name: "test",
    price: 1428,
    id: "cart-item-2",
    count: 3,
  },
];

export default {
  namespaced: true,

  state: () => ({
    items: testItems,
    additionalItems: [],
  }),

  getters: {
    totalPrice: (state) =>
      state.items.reduce((acc, item) => acc + item.price * item.count, 0) +
      state.additionalItems.reduce(
        (acc, item) => acc + item.price * item.count,
        0
      ),
    isEmpty: (state) =>
      !state.items.length &&
      !state.additionalItems.filter((item) => item.count > 0),
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
