<template>
  <li class="cart-list__item">
    <Product
      :name="item.name"
      :features="itemFeatures"
      class="cart-list__product"
    />

    <BaseCounter
      :value="item.count"
      :min="1"
      class="cart-list__counter"
      is-orange-style
      @input="setCount($event)"
    />

    <div class="cart-list__price">
      <b>{{ itemTotalPrice }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button type="button" class="cart-list__edit" @click="editItem">
        Изменить
      </button>
    </div>
  </li>
</template>

<script>
import BaseCounter from "@/common/components/BaseCounter";
import Product from "@/common/components/Product";
import { pizzaFeatures } from "../constants";

export default {
  name: "CartListItem",

  components: { BaseCounter, Product },

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  computed: {
    itemFeatures() {
      return [
        `${pizzaFeatures.get(this.item.size)}, ${pizzaFeatures.get(
          this.item.dough
        )}`,
        `Соус: ${pizzaFeatures.get(this.item.sauce)}`,
        `Начинка: ${this.getIngredientsTranslate(this.item.ingredients)}`,
      ];
    },

    itemTotalPrice() {
      return this.item.price * this.item.count;
    },
  },

  methods: {
    getIngredientsTranslate(ingredients) {
      return Object.keys(ingredients)
        .map((type) => pizzaFeatures.get(type))
        .join(", ");
    },

    setCount(count) {
      this.$emit("count-update", count);
    },

    editItem() {
      this.$emit("edit-item");
    },
  },
};
</script>
