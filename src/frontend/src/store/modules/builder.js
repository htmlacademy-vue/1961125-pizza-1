import { pickBy } from "lodash";
import pizza from "@/static/pizza.json";
import {
  doughMapper,
  ingredientsMapper,
  sizesMapper,
  sousesMapper,
  calculatePrice,
  getZeroedIngredients,
} from "@/modules/builder/helpers";
import {
  DEFAULT_PIZZA_STATE,
  MIN_PIZZA_NAME_LENGTH,
} from "@/modules/builder/constants";
import {
  SET_DOUGH_TYPES,
  SET_SIZES_TYPES,
  SET_SAUCES_TYPES,
  SET_INGREDIENTS_TYPES,
  SET_SELECTED_DOUGH,
  SET_SELECTED_SIZE,
  SET_SELECTED_SAUCE,
  SET_SELECTED_INGREDIENTS,
  SET_SELECTED_PIZZA_NAME,
} from "../mutation.types";

export default {
  namespaced: true,

  state: () => ({
    doughTypes: null,
    sizesTypes: null,
    saucesTypes: null,
    ingredientsTypes: null,

    selectedDough: DEFAULT_PIZZA_STATE.dough,
    selectedSize: DEFAULT_PIZZA_STATE.size,
    selectedSauce: DEFAULT_PIZZA_STATE.sauce,
    selectedIngredients: DEFAULT_PIZZA_STATE.ingredients,
    selectedPizzaName: DEFAULT_PIZZA_STATE.name,
  }),

  getters: {
    isPizzaTypesLoaded: (state) =>
      !!state.doughTypes &&
      !!state.sizesTypes &&
      !!state.saucesTypes &&
      !!state.ingredientsTypes,

    isPizzaReadyToBuy: (state, getters) =>
      state.selectedPizzaName.length >= MIN_PIZZA_NAME_LENGTH &&
      Object.keys(getters.clearedIngredients).length > 0,

    calculatedPrice: (state, getters) =>
      calculatePrice(
        state.selectedDough,
        state.selectedSize,
        state.selectedSauce,
        getters.clearedIngredients,
        state
      ),

    clearedIngredients: (state) =>
      pickBy(state.selectedIngredients, (value) => value > 0),

    pizzaData: (state, getters) => ({
      dough: state.selectedDough,
      size: state.selectedSize,
      sauce: state.selectedSauce,
      ingredients: getters.clearedIngredients,
      name: state.selectedPizzaName,
      price: getters.calculatedPrice,
    }),
  },

  mutations: {
    [SET_DOUGH_TYPES](state, payload) {
      state.doughTypes = payload;
    },

    [SET_SIZES_TYPES](state, payload) {
      state.sizesTypes = payload;
    },

    [SET_SAUCES_TYPES](state, payload) {
      state.saucesTypes = payload;
    },

    [SET_INGREDIENTS_TYPES](state, payload) {
      state.ingredientsTypes = payload;
    },

    [SET_SELECTED_DOUGH](state, payload) {
      state.selectedDough = payload;
    },

    [SET_SELECTED_SIZE](state, payload) {
      state.selectedSize = payload;
    },

    [SET_SELECTED_SAUCE](state, payload) {
      state.selectedSauce = payload;
    },

    [SET_SELECTED_INGREDIENTS](state, payload) {
      state.selectedIngredients = payload;
    },

    [SET_SELECTED_PIZZA_NAME](state, payload) {
      state.selectedPizzaName = payload;
    },
  },

  actions: {
    init({ commit }) {
      // TODO: получение данных pizza с бека

      commit(SET_DOUGH_TYPES, doughMapper(pizza.dough));
      commit(SET_SIZES_TYPES, sizesMapper(pizza.sizes));
      commit(SET_SAUCES_TYPES, sousesMapper(pizza.sauces));
      commit(SET_INGREDIENTS_TYPES, ingredientsMapper(pizza.ingredients));
    },

    setPizzaDataToDefault({ dispatch }) {
      dispatch("setPizzaData", DEFAULT_PIZZA_STATE);
    },

    setPizzaData({ dispatch }, { dough, size, sauce, ingredients, name }) {
      dispatch("setSelectedDough", dough);
      dispatch("setSelectedSize", size);
      dispatch("setSelectedSauce", sauce);
      dispatch("setSelectedIngredients", ingredients);
      dispatch("setSelectedPizzaName", name);
    },

    setSelectedDough({ commit }, payload) {
      commit(SET_SELECTED_DOUGH, payload);
    },

    setSelectedSize({ commit }, payload) {
      commit(SET_SELECTED_SIZE, payload);
    },

    setSelectedSauce({ commit }, payload) {
      commit(SET_SELECTED_SAUCE, payload);
    },

    setSelectedIngredients({ commit, state }, payload = {}) {
      const result = Object.assign(
        getZeroedIngredients(state.ingredientsTypes),
        payload
      );

      commit(SET_SELECTED_INGREDIENTS, result);
    },

    setSelectedPizzaName({ commit }, payload) {
      commit(SET_SELECTED_PIZZA_NAME, payload);
    },
  },
};
