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
          <span
            :class="['filling', `filling--${ingredient.type}`]"
            :draggable="selectedIngredients[ingredient.type] < 3"
            @dragstart="onDragstart($event, ingredient.type)"
          >
            {{ ingredient.name }}
          </span>

          <BaseCounter
            :value="selectedIngredients[ingredient.type]"
            class="ingredients__counter"
            :min="0"
            :max="maxSameIngredientsCount"
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
import { maxSameIngredientsCount } from "../constants";

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

    this.maxSameIngredientsCount = maxSameIngredientsCount;

    this.$eventBus.$on("increase-ingredient", (type) => {
      console.log(this.selectedIngredients[type]);
      this.selectedIngredients[type] += 1;
    });
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
    onDragstart(e, ingredientType) {
      e.dataTransfer.setData("ingredientType", ingredientType);
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
