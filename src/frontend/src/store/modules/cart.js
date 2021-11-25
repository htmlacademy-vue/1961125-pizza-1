import { uniqueId, sortBy } from "lodash";
import {
  SET_CART_ITEMS,
  SET_CART_ADDITIONAL_ITEMS,
  SET_CART_RECEIVING_TYPE,
  SET_CART_ADDRESS_STREET,
  SET_CART_ADDRESS_BUILDING,
  SET_CART_ADDRESS_APARTMENT,
  SET_CART_PHONE,
} from "@/store/mutation.types";
import { additionalItems, receivingTypes } from "@/modules/cart/constants";

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
    receivingType: receivingTypes.NEW,
    phone: "",
    addressStreet: "",
    addressBuilding: "",
    addressApartment: "",
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
    [SET_CART_RECEIVING_TYPE](state, payload) {
      state.receivingType = payload;
    },
    [SET_CART_ADDRESS_STREET](state, payload) {
      state.addressStreet = payload;
    },
    [SET_CART_PHONE](state, payload) {
      state.phone = payload;
    },
    [SET_CART_ADDRESS_BUILDING](state, payload) {
      state.addressBuilding = payload;
    },
    [SET_CART_ADDRESS_APARTMENT](state, payload) {
      state.addressApartment = payload;
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
    setReceivingType({ commit }, payload) {
      commit(SET_CART_RECEIVING_TYPE, payload);
    },
    setAddressStreet({ commit }, payload) {
      commit(SET_CART_ADDRESS_STREET, payload);
    },
    setPhone({ commit }, payload) {
      commit(SET_CART_PHONE, payload);
    },
    setAddressBuilding({ commit }, payload) {
      commit(SET_CART_ADDRESS_BUILDING, payload);
    },
    setAddressApartment({ commit }, payload) {
      commit(SET_CART_ADDRESS_APARTMENT, payload);
    },
  },
};
