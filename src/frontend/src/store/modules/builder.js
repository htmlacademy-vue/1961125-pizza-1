import { pickBy } from "lodash";
import pizza from "@/static/pizza.json";
import {
  doughMapper,
  ingredientsMapper,
  sizesMapper,
  sousesMapper,
  calculatePrice,
} from "@/modules/builder/helpers";
import { minPizzaNameLength } from "@/modules/builder/constants";
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

    selectedDough: null,
    selectedSize: null,
    selectedSauce: null,
    selectedIngredients: null,
    selectedPizzaName: "",
  }),

  getters: {
    isPizzaTypesLoaded: (state) =>
      !!state.doughTypes &&
      !!state.sizesTypes &&
      !!state.saucesTypes &&
      !!state.ingredientsTypes,

    isPizzaReadyToBuy: (state, getters) =>
      state.selectedPizzaName.length >= minPizzaNameLength &&
      Object.keys(getters.clearedIngredients).length > 0,

    calculatedPrice: (state) =>
      calculatePrice(
        state.selectedDough,
        state.selectedSize,
        state.selectedSauce,
        state.selectedIngredients,
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

      commit(SET_DOUGH_TYPES, Object.freeze(doughMapper(pizza.dough)));
      commit(SET_SIZES_TYPES, Object.freeze(sizesMapper(pizza.sizes)));
      commit(SET_SAUCES_TYPES, Object.freeze(sousesMapper(pizza.sauces)));
      commit(
        SET_INGREDIENTS_TYPES,
        Object.freeze(ingredientsMapper(pizza.ingredients))
      );
    },
    setPizzaDataToDefault({ state, commit }) {
      const selectedDough = state.doughTypes.find(
        (doughType) => doughType.id === 1
      )?.type;
      const selectedSize = state.sizesTypes.find(
        (sizeType) => sizeType.id === 1
      )?.type;
      const selectedSauce = state.saucesTypes.find(
        (sauceType) => sauceType.id === 1
      )?.type;
      const selectedIngredients = {};

      state.ingredientsTypes.forEach((ingredientType) => {
        selectedIngredients[ingredientType.type] = 0;
      });

      commit(SET_SELECTED_DOUGH, selectedDough);
      commit(SET_SELECTED_SIZE, selectedSize);
      commit(SET_SELECTED_SAUCE, selectedSauce);
      commit(SET_SELECTED_INGREDIENTS, selectedIngredients);
      commit(SET_SELECTED_PIZZA_NAME, "");
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
    setSelectedIngredients({ commit }, payload) {
      commit(SET_SELECTED_INGREDIENTS, payload);
    },
    setSelectedPizzaName({ commit }, payload) {
      commit(SET_SELECTED_PIZZA_NAME, payload);
    },
  },
};
