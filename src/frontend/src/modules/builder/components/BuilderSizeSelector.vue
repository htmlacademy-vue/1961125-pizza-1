<template>
  <div class="diameter">
    <BaseRadio
      v-for="size in sizes"
      :key="`size-${size.id}`"
      v-model="localValue"
      :value="size.type"
      :label="size.name"
      :class="['diameter__input', `diameter__input--${size.type}`]"
      is-cleared-styles
    />
  </div>
</template>
<script>
import BaseRadio from "@/common/components/BaseRadio";

export default {
  name: "BuilderSizeSelector",
  components: { BaseRadio },
  props: {
    sizes: {
      type: Array,
      required: true,
      validator: (value) => value.length > 0,
    },
    value: {
      type: String,
      required: true,
    },
  },
  computed: {
    localValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>
