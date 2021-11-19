<template>
  <div
    :class="`pizza pizza--foundation--${selectedDough}-${selectedSauce}`"
    @drop="onDrop"
    @dragover.prevent
  >
    <div class="pizza__wrapper">
      <div
        v-for="(count, ingredient, index) in clearedIngredients"
        :key="`${ingredient}-${index}`"
        :class="[
          'pizza__filling',
          `pizza__filling--${ingredient}`,
          { 'pizza__filling--second': count === 2 },
          { 'pizza__filling--third': count === 3 },
        ]"
      ></div>
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
  },
};
</script>
