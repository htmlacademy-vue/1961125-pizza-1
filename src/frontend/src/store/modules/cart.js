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
import { ADDITIONAL_ITEMS, receivingTypes } from "@/modules/cart/constants";

export default {
  namespaced: true,

  state: () => ({
    items: [],
    additionalItems: [],
    receivingType: receivingTypes.NEW,
    phone: "",
    addressStreet: "",
    addressBuilding: "",
    addressApartment: "",
  }),

  getters: {
    getSortedItems: (state) => sortBy(state.items, "id"),

    getSortedItemById: (state, getters) => (itemId) =>
      getters.getSortedItems.find((item) => item.id === itemId),

    totalItemsPrice: (state) =>
      state.items.reduce((acc, item) => acc + item.price * item.count, 0),

    totalAdditionalItemsPrice: (state) =>
      state.additionalItems.reduce(
        (acc, item) => acc + item.price * item.count,
        0
      ),

    totalPrice: (state, getters) =>
      getters.totalItemsPrice + getters.totalAdditionalItemsPrice,

    isEmpty: (state) =>
      !state.items.length &&
      !state.additionalItems.filter((item) => item.count > 0).length,

    getItemById: (state) => (itemId) =>
      state.items.find((item) => item.id === itemId),

    getItemExcludeId: (state) => (itemId) =>
      state.items.filter((item) => item.id !== itemId),

    isAddressFormValid: (state) =>
      (state.receivingType === receivingTypes.NEW &&
        !!state.addressStreet &&
        !!state.addressBuilding) ||
      state.receivingType !== receivingTypes.NEW,
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
      dispatch("setClearAdditionalItems");
    },

    clearCart({ dispatch, commit }) {
      dispatch("setClearAdditionalItems");
      commit(SET_CART_ITEMS, []);
      commit(SET_CART_RECEIVING_TYPE, receivingTypes.NEW);
      commit(SET_CART_ADDRESS_STREET, "");
      commit(SET_CART_ADDRESS_BUILDING, "");
      commit(SET_CART_ADDRESS_APARTMENT, "");
      commit(SET_CART_PHONE, "");
    },

    setItems({ commit }, payload) {
      commit(SET_CART_ITEMS, payload);
    },

    addToItems({ commit, state }, payload) {
      const items = state.items;

      payload.id = uniqueId("cart-item-");
      payload.count = 1;

      items.push(payload);

      commit(SET_CART_ITEMS, items);
    },

    editItem({ getters, commit }, { itemId, itemData }) {
      const item = getters.getItemById(itemId);
      const items = getters.getItemExcludeId(itemId);

      Object.assign(item, itemData);

      items.push(item);

      commit(SET_CART_ITEMS, items);
    },

    clearItems({ commit }) {
      commit(SET_CART_ITEMS, []);
    },

    setClearAdditionalItems({ dispatch }) {
      dispatch("clearAdditionalItems");
      ADDITIONAL_ITEMS.forEach((additionalItem) => {
        dispatch("addToAdditionalItems", additionalItem);
      });
    },

    setAdditionalItems({ commit }, payload) {
      commit(SET_CART_ADDITIONAL_ITEMS, payload);
    },

    addToAdditionalItems({ commit, state }, payload) {
      const additionalItems = state.additionalItems;

      payload.id = uniqueId("cart-additional-item-");
      payload.count = 0;

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
