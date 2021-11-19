<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <BuilderDoughSelector
              v-model="selectedDough"
              :dough="dough"
              class="sheet__content"
            />
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <BuilderSizeSelector
              v-model="selectedSize"
              :sizes="sizes"
              class="sheet__content"
            />
          </div>
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <BuilderIngredientsSelector
              :selected-ingredients.sync="selectedIngredients"
              :selected-sauce.sync="selectedSauce"
              :ingredients="ingredients"
              :sauces="sauces"
              class="sheet__content"
            />
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <div class="content__constructor">
            <BuilderPizzaView />
          </div>

          <div class="content__result">
            <BuilderPriceCounter />
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import pizza from "@/static/pizza.json";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

const pizzaDoughTypes = new Map([
  ["Тонкое", "light"],
  ["Толстое", "large"],
]);

const pizzaSizesTypes = new Map([
  [1, "small"],
  [2, "normal"],
  [3, "big"],
]);

const pizzaSousesTypes = new Map([
  ["Томатный", "tomato"],
  ["Сливочный", "creamy"],
]);

const pizzaIngredientsTypes = new Map([
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

const pizzaDoughMapper = (array) =>
  array.map((item) => ({
    ...item,
    type: pizzaDoughTypes.get(item.name),
  }));

const pizzaSizesMapper = (array) =>
  array.map((item) => ({
    ...item,
    type: pizzaSizesTypes.get(item.multiplier),
  }));

const pizzaSousesMapper = (array) =>
  array.map((item) => ({
    ...item,
    type: pizzaSousesTypes.get(item.name),
  }));

const pizzaIngredientsMapper = (array) =>
  array.map((item) => ({
    ...item,
    type: pizzaIngredientsTypes.get(item.name),
  }));

export default {
  name: "Index",
  components: {
    BuilderPriceCounter,
    BuilderPizzaView,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
  },
  data() {
    return {
      selectedDough: null,
      selectedSize: null,
      selectedSauce: null,
      selectedIngredients: {},
      dough: Object.freeze(pizzaDoughMapper(pizza.dough)),
      sizes: Object.freeze(pizzaSizesMapper(pizza.sizes)),
      sauces: Object.freeze(pizzaSousesMapper(pizza.sauces)),
      ingredients: Object.freeze(pizzaIngredientsMapper(pizza.ingredients)),
    };
  },
  created() {
    this.setSelectedDefaults();
  },
  methods: {
    setSelectedDefaults() {
      this.selectedDough = this.dough.find(
        (doughItem) => doughItem.id === 1
      )?.type;

      this.selectedSize = this.sizes.find(
        (sizeItem) => sizeItem.id === 2
      )?.type;

      this.selectedSauce = this.sauces.find(
        (sauceItem) => sauceItem.id === 1
      )?.type;

      this.ingredients.forEach((ingredientItem) => {
        this.$set(this.selectedIngredients, ingredientItem.type, 0);
      });
    },
  },
};
</script>
