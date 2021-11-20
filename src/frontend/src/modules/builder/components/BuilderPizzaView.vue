<template>
  <div
    :class="`pizza pizza--foundation--${selectedDough}-${selectedSauce}`"
    @drop="onDrop"
    @dragover.prevent
  >
    <div class="pizza__wrapper">
      <template v-for="(count, ingredient, index) in clearedIngredients">
        <div
          :key="`${ingredient}-${index}`"
          :class="getFillingClass(ingredient)"
        ></div>
        <div
          v-if="count >= 2"
          :key="`${ingredient}-${index}-second`"
          :class="getFillingClass(ingredient, 2)"
        ></div>
        <div
          v-if="count >= 3"
          :key="`${ingredient}-${index}-third`"
          :class="getFillingClass(ingredient, 3)"
        ></div>
      </template>
    </div>
  </div>
</template>

<script>
import { pickBy } from "lodash";

export default {
  name: "BuilderPizzaView",
  props: {
    selectedDough: {
      type: String,
      required: true,
    },
    selectedSauce: {
      type: String,
      required: true,
    },
    selectedIngredients: {
      type: Object,
      required: true,
    },
  },
  computed: {
    clearedIngredients() {
      return pickBy(this.selectedIngredients, (value) => value > 0);
    },
  },
  methods: {
    onDrop(e) {
      const type = e.dataTransfer.getData("ingredientType");

      this.$eventBus.$emit("increase-ingredient", type);
    },
    getFillingClass(ingredient, count = 1) {
      const secondClass = "pizza__filling--second";
      const thirdClass = "pizza__filling--third";
      const classes = ["pizza__filling", `pizza__filling--${ingredient}`];

      if (count >= 2) classes.push(secondClass);
      if (count >= 3) classes.push(thirdClass);

      return classes;
    },
  },
};
</script>
