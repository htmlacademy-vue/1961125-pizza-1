<template>
  <div class="ingredients">
    <div class="ingredients__sauce">
      <p>Основной соус:</p>

      <BaseRadio
        v-for="{ id, type, name } in saucesTypes"
        :key="`sauce-${id}`"
        v-model="localSelectedSauce"
        :value="type"
        :label="name"
        class="ingredients__input"
      />
    </div>

    <div class="ingredients__filling">
      <p>Начинка:</p>

      <ul class="ingredients__list">
        <li
          v-for="{ id, type, name } in ingredientsTypes"
          :key="`ingredient-${id}`"
          class="ingredients__item"
        >
          <span
            :class="['filling', `filling--${type}`]"
            :draggable="selectedIngredients[type] < 3"
            @dragstart="onDragstart($event, type)"
          >
            {{ name }}
          </span>

          <BaseCounter
            :value="selectedIngredients[type]"
            class="ingredients__counter"
            :min="0"
            :max="$options.maxSameIngredientsCount"
            @input="updateSelectedIngredients(type, $event)"
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
import { MAX_SAME_INGREDIENTS_COUNT } from "../constants";

export default {
  name: "BuilderIngredientsSelector",

  components: { BaseCounter, BaseRadio },

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
  created() {
    this.$options.maxSameIngredientsCount = MAX_SAME_INGREDIENTS_COUNT;
  },
  methods: {
    ...mapActions("Builder", ["setSelectedSauce", "setSelectedIngredients"]),

    onDragstart({ dataTransfer }, ingredientType) {
      dataTransfer.setData("ingredientType", ingredientType);
    },

    updateSelectedIngredients(key, value) {
      const selectedIngredients = this.selectedIngredients;

      selectedIngredients[key] = value;

      this.setSelectedIngredients(selectedIngredients);
    },
  },
};
</script>
