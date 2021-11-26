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
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "BuilderPizzaView",

  computed: {
    ...mapState("Builder", [
      "selectedDough",
      "selectedSauce",
      "selectedIngredients",
    ]),
    ...mapGetters("Builder", ["clearedIngredients"]),
  },

  methods: {
    ...mapActions("Builder", ["setSelectedIngredients"]),

    onDrop({ dataTransfer }) {
      const type = dataTransfer.getData("ingredientType");
      const selectedIngredients = this.selectedIngredients;

      selectedIngredients[type] += 1;

      this.setSelectedIngredients(selectedIngredients);
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
