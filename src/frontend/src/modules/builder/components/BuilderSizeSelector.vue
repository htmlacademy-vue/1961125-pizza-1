<template>
  <div class="diameter">
    <BaseRadio
      v-for="sizeType in sizesTypes"
      :key="`size-${sizeType.id}`"
      v-model="localSelectedSize"
      :value="sizeType.type"
      :label="sizeType.name"
      :class="['diameter__input', `diameter__input--${sizeType.type}`]"
      is-cleared-styles
    />
  </div>
</template>
<script>
import BaseRadio from "@/common/components/BaseRadio";
import { mapState, mapActions } from "vuex";

export default {
  name: "BuilderSizeSelector",
  components: { BaseRadio },
  computed: {
    ...mapState("Builder", ["sizesTypes", "selectedSize"]),

    localSelectedSize: {
      get() {
        return this.selectedSize;
      },
      set(value) {
        this.setSelectedSize(value);
      },
    },
  },
  methods: {
    ...mapActions("Builder", ["setSelectedSize"]),
  },
};
</script>
