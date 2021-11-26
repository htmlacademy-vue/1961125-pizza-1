export const DOUGH_TYPES = new Map([
  ["Тонкое", "light"],
  ["Толстое", "large"],
]);

export const SIZES_TYPES = new Map([
  [1, "small"],
  [2, "normal"],
  [3, "big"],
]);

export const SOUSES_TYPES = new Map([
  ["Томатный", "tomato"],
  ["Сливочный", "creamy"],
]);

export const INGREDIENTS_TYPES = new Map([
  ["Грибы", "mushrooms"],
  ["Чеддер", "cheddar"],
  ["Салями", "salami"],
  ["Ветчина", "ham"],
  ["Ананас", "ananas"],
  ["Бекон", "bacon"],
  ["Лук", "onion"],
  ["Чили", "chile"],
  ["Халапеньо", "jalapeno"],
  ["Маслины", "olives"],
  ["Томаты", "tomatoes"],
  ["Лосось", "salmon"],
  ["Моцарелла", "mozzarella"],
  ["Пармезан", "parmesan"],
  ["Блю чиз", "blue_cheese"],
]);

export const MAX_SAME_INGREDIENTS_COUNT = 3;

export const MIN_PIZZA_NAME_LENGTH = 3;

export const DEFAULT_PIZZA_STATE = {
  dough: "light",
  size: "small",
  sauce: "tomato",
  ingredients: {
    mushrooms: 0,
    cheddar: 0,
    salami: 0,
    ham: 0,
    ananas: 0,
    bacon: 0,
    onion: 0,
    chile: 0,
    jalapeno: 0,
    olives: 0,
    tomatoes: 0,
    salmon: 0,
    mozzarella: 0,
    parmesan: 0,
    blue_cheese: 0,
  },
  name: "",
};
