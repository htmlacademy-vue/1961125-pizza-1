<template>
  <div class="ingredients">
    <div class="ingredients__sauce">
      <p>Основной соус:</p>

      <BaseRadio
        v-for="sauce in sauces"
        :key="`sauce-${sauce.id}`"
        v-model="localSelectedSauce"
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

export default {
  name: "BuilderIngredientsSelector",
  components: { BaseCounter, BaseRadio },
  props: {
    selectedIngredients: {
      type: Object,
      required: true,
    },
    selectedSauce: {
      type: String,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
      validator: (value) => value.length > 0,
    },
    sauces: {
      type: Array,
      required: true,
      validator: (value) => value.length > 0,
    },
  },
  computed: {
    localSelectedSauce: {
      get() {
        return this.selectedSauce;
      },
      set(value) {
        console.log("selectedSauce");
        this.$emit("update:selectedSauce", value);
      },
    },
  },
  methods: {
    updateSelectedIngredients(key, value) {
      const localSelectedIngredients = this.selectedIngredients;

      localSelectedIngredients[key] = value;

      this.$emit("update:selectedIngredients", localSelectedIngredients);
    },
  },
};
</script>
