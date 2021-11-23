<template>
  <div class="ingredients">
    <div class="ingredients__sauce">
      <p>Основной соус:</p>

      <BaseRadio
        v-for="sauceType in saucesTypes"
        :key="`sauce-${sauceType.id}`"
        v-model="localSelectedSauce"
        :value="sauceType.type"
        :label="sauceType.name"
        class="ingredients__input"
      />
    </div>

    <div class="ingredients__filling">
      <p>Начинка:</p>

      <ul class="ingredients__list">
        <li
          v-for="ingredientType in ingredientsTypes"
          :key="`ingredient-${ingredientType.id}`"
          class="ingredients__item"
        >
          <span
            :class="['filling', `filling--${ingredientType.type}`]"
            :draggable="selectedIngredients[ingredientType.type] < 3"
            @dragstart="onDragstart($event, ingredientType.type)"
          >
            {{ ingredientType.name }}
          </span>

          <BaseCounter
            :value="selectedIngredients[ingredientType.type]"
            class="ingredients__counter"
            :min="0"
            :max="maxSameIngredientsCount"
            @input="updateSelectedIngredients(ingredientType.type, $event)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import BaseCounter from "@/common/components/BaseCounter";
import BaseRadio from "@/common/components/BaseRadio";
import { maxSameIngredientsCount } from "../constants";

export default {
  name: "BuilderIngredientsSelector",
  components: { BaseCounter, BaseRadio },
  created() {
    this.maxSameIngredientsCount = maxSameIngredientsCount;
  },
  computed: {
    ...mapState("Builder", [
      "selectedSauce",
      "selectedIngredients",
      "saucesTypes",
      "ingredientsTypes",
    ]),

    localSelectedSauce: {
      get() {
        return this.selectedSauce;
      },
      set(value) {
        this.setSelectedSauce(value);
      },
    },
  },
  methods: {
    ...mapActions("Builder", ["setSelectedSauce", "setSelectedIngredients"]),

    onDragstart(e, ingredientType) {
      e.dataTransfer.setData("ingredientType", ingredientType);
    },

    updateSelectedIngredients(key, value) {
      const selectedIngredients = this.selectedIngredients;

      selectedIngredients[key] = value;

      this.setSelectedIngredients(selectedIngredients);
    },
  },
};
</script>
