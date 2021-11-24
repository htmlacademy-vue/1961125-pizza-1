<template>
  <main class="content" v-if="isPizzaTypesLoaded">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <BuilderDoughSelector class="sheet__content" />
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <BuilderSizeSelector class="sheet__content" />
          </div>
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <BuilderIngredientsSelector class="sheet__content" />
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              v-model="localSelectedPizzaName"
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
            <button
              type="button"
              class="button"
              :disabled="!isPizzaReadyToBuy"
              @click="addToCart"
            >
              Готовьте!
            </button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import {
  BuilderDoughSelector,
  BuilderSizeSelector,
  BuilderIngredientsSelector,
  BuilderPizzaView,
  BuilderPriceCounter,
} from "@/modules/builder/components";

export default {
  name: "Index",
  components: {
    BuilderPriceCounter,
    BuilderPizzaView,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
  },
  computed: {
    ...mapState("Builder", ["selectedPizzaName"]),
    ...mapGetters("Builder", [
      "isPizzaTypesLoaded",
      "isPizzaReadyToBuy",
      "pizzaData",
    ]),

    localSelectedPizzaName: {
      get() {
        return this.selectedPizzaName;
      },
      set(value) {
        this.setSelectedPizzaName(value);
      },
    },
  },
  methods: {
    ...mapActions("Builder", ["setSelectedPizzaName", "setPizzaDataToDefault"]),
    ...mapActions("Cart", ["addToItems"]),

    addToCart() {
      this.addToItems(this.pizzaData);
      this.setPizzaDataToDefault();
    },
  },
  created() {
    this.setPizzaDataToDefault();
  },
};
</script>
