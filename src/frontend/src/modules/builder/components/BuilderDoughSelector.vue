<template>
  <div class="dough">
    <BaseRadio
      v-for="doughItem in dough"
      :key="`doughItem-${doughItem.id}`"
      v-model="localValue"
      :value="doughItem.type"
      :class="['dough__input', `dough__input--${doughItem.type}`]"
      is-cleared-styles
    >
      <b>{{ doughItem.name }}</b>
      <span>{{ doughItem.description }}</span>
    </BaseRadio>
  </div>
</template>

<script>
import BaseRadio from "@/common/components/BaseRadio";

export default {
  name: "BuilderDoughSelector",
  components: { BaseRadio },
  props: {
    dough: {
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
