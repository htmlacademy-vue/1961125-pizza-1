import {
  doughTypes,
  sizesTypes,
  sousesTypes,
  ingredientsTypes,
} from "./constants";

export const doughMapper = (array) =>
  array.map((item) => ({
    ...item,
    type: doughTypes.get(item.name),
  }));

export const sizesMapper = (array) =>
  array.map((item) => ({
    ...item,
    type: sizesTypes.get(item.multiplier),
  }));

export const sousesMapper = (array) =>
  array.map((item) => ({
    ...item,
    type: sousesTypes.get(item.name),
  }));

export const ingredientsMapper = (array) =>
  array.map((item) => ({
    ...item,
    type: ingredientsTypes.get(item.name),
  }));
