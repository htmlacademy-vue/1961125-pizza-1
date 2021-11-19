<template>
  <div class="counter counter--orange">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="isMinusButtonDisabled"
      @click="subtract"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      v-model.lazy.number="localValue"
      type="number"
      name="counter"
      class="counter__input"
      :min="min"
      :max="max"
      :step="step"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="isPlusButtonDisabled"
      @click="add"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",
  props: {
    value: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      default: Number.NEGATIVE_INFINITY,
    },
    max: {
      type: Number,
      default: Number.POSITIVE_INFINITY,
    },
    step: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    localValue: {
      get() {
        return this.value;
      },
      set(value) {
        if (!this.isValidValue(value)) return;

        this.$emit("input", value);
      },
    },
    isMinusButtonDisabled() {
      return this.localValue <= this.min;
    },
    isPlusButtonDisabled() {
      return this.localValue >= this.max;
    },
  },
  methods: {
    subtract() {
      this.localValue -= this.step;
    },
    add() {
      this.localValue += this.step;
    },
    isValidValue(value) {
      return value >= this.min && value <= this.max;
    },
  },
};
</script>
