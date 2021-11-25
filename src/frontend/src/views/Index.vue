<template>
  <main class="content" v-if="isPizzaTypesLoaded">
    <form @submit.prevent>
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
    ...mapGetters("Cart", ["getItemById"]),

    localSelectedPizzaName: {
      get() {
        return this.selectedPizzaName;
      },
      set(value) {
        this.setSelectedPizzaName(value);
      },
    },

    editingCartItem() {
      const cartItemId = this.$route.query.cartItemId;

      return this.getItemById(cartItemId) || null;
    },

    isEditMode() {
      return !!this.editingCartItem;
    },
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions("Builder", [
      "setSelectedPizzaName",
      "setPizzaDataToDefault",
      "setPizzaData",
    ]),
    ...mapActions("Cart", ["addToItems", "editItem"]),

    init() {
      if (this.isEditMode) {
        this.setPizzaData(this.editingCartItem);
      } else {
        this.setPizzaDataToDefault();
      }
    },

    addToCart() {
      if (this.isEditMode) {
        this.editItem({
          itemId: this.editingCartItem.id,
          itemData: this.pizzaData,
        });
      } else {
        this.addToItems(this.pizzaData);
        this.setPizzaDataToDefault();
      }
    },
  },
};
</script>
