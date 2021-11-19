<template>
  <div class="ingredients">
    <div class="ingredients__sauce">
      <p>Основной соус:</p>

      <BaseRadio
        v-for="sauce in sauces"
        :key="`sauce-${sauce.id}`"
        v-model="selectedSauce"
        :value="sauce.type"
        :label="sauce.name"
        class="ingredients__input"
      />
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

          <BaseCounter
            :value="selectedIngredients[ingredient.type]"
            class="ingredients__counter"
            :min="0"
            @input="updateSelectedIngredients(ingredient.type, $event)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import BaseCounter from "@/common/components/BaseCounter";
import BaseRadio from "@/common/components/BaseRadio";
import pizza from "@/static/pizza.json";
import { sousesMapper, ingredientsMapper } from "../helpers";

export default {
  name: "BuilderIngredientsSelector",
  components: { BaseCounter, BaseRadio },
  data() {
    return {
      selectedSauce: null,
      selectedIngredients: {},
      sauces: Object.freeze(sousesMapper(pizza.sauces)),
      ingredients: Object.freeze(ingredientsMapper(pizza.ingredients)),
    };
  },
  created() {
    this.setDefaults();
  },
  methods: {
    setDefaults() {
      this.selectedSauce = this.sauces.find(
        (sauceItem) => sauceItem.id === 1
      )?.type;

      this.ingredients.forEach((ingredientItem) => {
        this.$set(this.selectedIngredients, ingredientItem.type, 0);
      });
    },
    updateSelectedIngredients(key, value) {
      this.selectedIngredients[key] = value;
    },
  },
  watch: {
    selectedSauce(value) {
      this.$emit("sauce-select", value);
    },
    selectedIngredients: {
      deep: true,
      handler(value) {
        this.$emit("ingredients-select", value);
      },
    },
  },
};
</script>
