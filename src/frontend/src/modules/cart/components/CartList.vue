<template>
  <ul v-if="items" class="cart-list">
    <li
      v-for="item in items"
      :key="`cart-list-item-${item.id}`"
      class="cart-list__item"
    >
      <Product
        :name="item.name"
        :features="[
          `${getPizzaFeatureTranslate(item.size)}, ${getPizzaFeatureTranslate(
            item.dough
          )}`,
          `Соус: ${getPizzaFeatureTranslate(item.sauce)}`,
          `Начинка: ${getIngredientsTranslate(item.ingredients)}`,
        ]"
        class="cart-list__product"
      />

      <BaseCounter
        :value="item.count"
        :min="0"
        class="cart-list__counter"
        is-orange-style
        @input="updateCartItemCount(item.id, $event)"
      />

      <div class="cart-list__price">
        <b>{{ item.price * item.count }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button type="button" class="cart-list__edit">Изменить</button>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Product from "@/common/components/Product";
import BaseCounter from "@/common/components/BaseCounter";
import { pizzaFeatures } from "../constants";

export default {
  name: "CartList",
  components: { BaseCounter, Product },
  computed: {
    ...mapState("Cart", ["items"]),
  },
  methods: {
    ...mapActions("Cart", ["setItems"]),

    updateCartItemCount(itemId, count) {
      const items = this.items;
      const item = items.find((item) => item.id === itemId);

      item.count = count;

      this.setItems(items);
    },

    getPizzaFeatureTranslate(type) {
      return pizzaFeatures.get(type);
    },

    getIngredientsTranslate(ingredients) {
      return Object.keys(ingredients)
        .map((type) => this.getPizzaFeatureTranslate(type))
        .join(", ");
    },
  },
};
</script>
