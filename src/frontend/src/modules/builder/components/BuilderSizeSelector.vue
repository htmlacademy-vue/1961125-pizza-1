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

export default {
  name: "BuilderSizeSelector",
  components: { BaseRadio },
  props: {
    sizes: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedSize: null,
    };
  },
  watch: {
    selectedSize(value) {
      this.$emit("size-select", value);
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
};
</script>
