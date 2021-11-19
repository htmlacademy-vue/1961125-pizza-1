<template>
  <div class="diameter">
    <BaseRadio
      v-for="size in sizes"
      :key="`size-${size.id}`"
      v-model="selectedSize"
      :value="size.type"
      :label="size.name"
      :class="['diameter__input', `diameter__input--${size.type}`]"
      is-cleared-styles
    />
  </div>
</template>
<script>
import BaseRadio from "@/common/components/BaseRadio";
import pizza from "@/static/pizza.json";
import { sizesMapper } from "../helpers";

export default {
  name: "BuilderSizeSelector",
  components: { BaseRadio },
  data() {
    return {
      selectedSize: null,
      sizes: Object.freeze(sizesMapper(pizza.sizes)),
    };
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
  created() {
    this.setDefaults();
  },
  methods: {
    setDefaults() {
      this.selectedSize = this.sizes.find(
        (sizeItem) => sizeItem.id === 2
      )?.type;
    },
  },
  watch: {
    selectedSize(value) {
      this.$emit("size-select", value);
    },
  },
};
</script>
