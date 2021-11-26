<template>
  <div class="diameter">
    <BaseRadio
      v-for="{ id, type, name } in sizesTypes"
      :key="`size-${id}`"
      v-model="localSelectedSize"
      :value="type"
      :label="name"
      :class="['diameter__input', `diameter__input--${type}`]"
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
