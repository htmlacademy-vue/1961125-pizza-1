<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <div class="sheet__content dough">
              <label
                v-for="doughItem in dough"
                :key="`doughItem-${doughItem.id}`"
                :class="['dough__input', `dough__input--${doughItem.type}`]"
              >
                <input
                  v-model="selectedDough"
                  :value="doughItem.type"
                  class="visually-hidden"
                  type="radio"
                />
                <b>{{ doughItem.name }}</b>
                <span>{{ doughItem.description }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
              <label
                v-for="size in sizes"
                :key="`size-${size.id}`"
                :class="['diameter__input', `diameter__input--${size.type}`]"
              >
                <input
                  v-model="selectedSize"
                  :value="size.type"
                  class="visually-hidden"
                  type="radio"
                />
                <span>{{ size.name }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <div class="ingredients__sauce">
                <p>Основной соус:</p>

                <label
                  v-for="sauce in sauces"
                  :key="`sauce-${sauce.id}`"
                  class="radio ingredients__input"
                >
                  <input
                    v-model="selectedSauce"
                    :value="sauce.type"
                    type="radio"
                  />
                  <span>{{ sauce.name }}</span>
                </label>
              </div>

              <div class="ingredients__filling">
                <p>Начинка:</p>

                <ul class="ingredients__list">
                  <li
                    v-for="ingredient in ingredients"
                    :key="`ingredient-${ingredient.id}`"
                    class="ingredients__item"
                  >
                    <span :class="['filling', `filling--${ingredient.type}`]">
                      {{ ingredient.name }}
                    </span>

                    <div class="counter counter--orange ingredients__counter">
                      <button
                        type="button"
                        class="counter__button counter__button--minus"
                        disabled
                      >
                        <span class="visually-hidden">Меньше</span>
                      </button>
                      <input
                        type="text"
                        name="counter"
                        class="counter__input"
                        value="0"
                      />
                      <button
                        type="button"
                        class="counter__button counter__button--plus"
                      >
                        <span class="visually-hidden">Больше</span>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
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
            <div class="pizza pizza--foundation--big-tomato">
              <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas"></div>
                <div class="pizza__filling pizza__filling--bacon"></div>
                <div class="pizza__filling pizza__filling--cheddar"></div>
              </div>
            </div>
          </div>

          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import pizza from "@/static/pizza.json";

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
  data() {
    return {
      selectedDough: null,
      selectedSize: null,
      selectedSauce: null,
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
    },
  },
};
</script>
