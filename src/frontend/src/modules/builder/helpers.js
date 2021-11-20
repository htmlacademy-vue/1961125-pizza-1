import { omit } from "lodash";
import pizza from "@/static/pizza.json";
import {
  doughTypes,
  sizesTypes,
  sousesTypes,
  ingredientsTypes,
} from "./constants";

export const doughMapper = (array) =>
  array.map((item) => ({
    ...omit(item, "image"),
    type: doughTypes.get(item.name),
  }));

export const sizesMapper = (array) =>
  array.map((item) => ({
    ...omit(item, "image"),
    type: sizesTypes.get(item.multiplier),
  }));

export const sousesMapper = (array) =>
  array.map((item) => ({
    ...item,
    type: sousesTypes.get(item.name),
  }));

export const ingredientsMapper = (array) =>
  array.map((item) => ({
    ...omit(item, "image"),
    type: ingredientsTypes.get(item.name),
  }));

export const getPizzaStore = () => ({
  dough: doughMapper(pizza.dough),
  sizes: sizesMapper(pizza.sizes),
  sauces: sousesMapper(pizza.sauces),
  ingredients: ingredientsMapper(pizza.ingredients),
});

export const calculatePrice = (dough, size, sauce, ingredients, store) => {
  const doughSum = dough
    ? store.dough.find((item) => item.type === dough).price
    : 0;
  const sizesMultiplier = size
    ? store.sizes.find((item) => item.type === size).multiplier
    : 0;
  const saucesSum = sauce
    ? store.sauces.find((item) => item.type === sauce).price
    : 0;
  let ingredientsSum = 0;

  for (const ingredientType in ingredients) {
    const count = ingredients[ingredientType];

    if (count === 0) continue;

    const price = store.ingredients.find(
      (item) => item.type === ingredientType
    ).price;

    ingredientsSum += count * price;
  }

  return sizesMultiplier * (doughSum + saucesSum + ingredientsSum);
};
