import { omit } from "lodash";
import {
  DOUGH_TYPES,
  SIZES_TYPES,
  SOUSES_TYPES,
  INGREDIENTS_TYPES,
} from "./constants";

export const doughMapper = (array) =>
  array.map((item) => ({
    ...omit(item, "image"),
    type: DOUGH_TYPES.get(item.name),
  }));

export const sizesMapper = (array) =>
  array.map((item) => ({
    ...omit(item, "image"),
    type: SIZES_TYPES.get(item.multiplier),
  }));

export const sousesMapper = (array) =>
  array.map((item) => ({
    ...item,
    type: SOUSES_TYPES.get(item.name),
  }));

export const ingredientsMapper = (array) =>
  array.map((item) => ({
    ...omit(item, "image"),
    type: INGREDIENTS_TYPES.get(item.name),
  }));

export const getZeroedIngredients = (array) => {
  const result = {};

  array.forEach((item) => {
    result[item.type] = 0;
  });

  return result;
};

export const calculatePrice = (dough, size, sauce, ingredients, store) => {
  const doughSum = dough
    ? store.doughTypes.find((item) => item.type === dough).price
    : 0;
  const sizesMultiplier = size
    ? store.sizesTypes.find((item) => item.type === size).multiplier
    : 0;
  const saucesSum = sauce
    ? store.saucesTypes.find((item) => item.type === sauce).price
    : 0;
  const ingredientsSum = Object.keys(ingredients).reduce(
    (sum, ingredientType) =>
      sum +
      store.ingredientsTypes.find((item) => item.type === ingredientType).price,
    0
  );

  return sizesMultiplier * (doughSum + saucesSum + ingredientsSum);
};
