<template>
  <label :class="[{ radio: !isClearedStyles }]" @click.prevent="setModelValue">
    <input type="radio" :checked="modelValue === value" :disabled="disabled" />
    <slot>
      <span>{{ label }}</span>
    </slot>
  </label>
</template>

<script>
export default {
  name: "BaseRadio",
  model: {
    prop: "modelValue",
    event: "change",
  },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
    },
    isClearedStyles: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    setModelValue() {
      if (this.disabled || this.value === this.modelValue) return;
      this.$emit("change", this.value);
    },
  },
};
</script>
