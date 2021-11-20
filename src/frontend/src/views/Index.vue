<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <BuilderDoughSelector
              :dough="pizzaStore.dough"
              class="sheet__content"
              @dough-select="setPizzaDataValue('dough', $event)"
            />
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <BuilderSizeSelector
              :sizes="pizzaStore.sizes"
              class="sheet__content"
              @size-select="setPizzaDataValue('size', $event)"
            />
          </div>
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <BuilderIngredientsSelector
              :ingredients="pizzaStore.ingredients"
              :sauces="pizzaStore.sauces"
              class="sheet__content"
              @ingredients-select="setPizzaDataValue('ingredients', $event)"
              @sauce-select="setPizzaDataValue('sauce', $event)"
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
            <BuilderPizzaView
              v-if="pizzaData.dough && pizzaData.sauce"
              :selected-dough="pizzaData.dough"
              :selected-sauce="pizzaData.sauce"
              :selected-ingredients="pizzaData.ingredients"
            />
          </div>

          <div class="content__result">
            <BuilderPriceCounter :price="price" />
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import { calculatePrice, getPizzaStore } from "@/modules/builder/helpers";
import { debounce } from "lodash";

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
      price: 0,
      pizzaData: {
        dough: null,
        size: null,
        sauce: null,
        ingredients: {},
      },
      pizzaStore: Object.freeze(getPizzaStore()),
    };
  },
  methods: {
    async setPizzaDataValue(key, value) {
      this.pizzaData[key] = value;

      this.debouncedCalculatePrice(
        this.pizzaData.dough,
        this.pizzaData.size,
        this.pizzaData.sauce,
        this.pizzaData.ingredients,
        this.pizzaStore
      );
    },
  },
  created() {
    this.debouncedCalculatePrice = debounce((...args) => {
      this.price = calculatePrice(...args);
    }, 10);
  },
};
</script>
