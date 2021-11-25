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
        :min="1"
        class="cart-list__counter"
        is-orange-style
        @input="updateCartItemCount(item.id, $event)"
      />

      <div class="cart-list__price">
        <b>{{ item.price * item.count }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button type="button" class="cart-list__edit" @click="editItem(item)">
          Изменить
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Product from "@/common/components/Product";
import BaseCounter from "@/common/components/BaseCounter";
import { pizzaFeatures } from "../constants";

export default {
  name: "CartList",
  components: { BaseCounter, Product },
  computed: {
    ...mapGetters("Cart", {
      items: "getSortedItems",
    }),
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

    editItem(item) {
      this.$router.push({ path: "/", query: { cartItemId: item.id } });
    },
  },
};
</script>
