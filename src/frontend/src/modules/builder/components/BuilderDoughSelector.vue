<template>
  <div class="dough">
    <BaseRadio
      v-for="doughItem in dough"
      :key="`doughItem-${doughItem.id}`"
      v-model="selectedDough"
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
    },
  },
  data() {
    return {
      selectedDough: null,
    };
  },
  watch: {
    selectedDough(value) {
      this.$emit("dough-select", value);
    },
  },
  created() {
    this.setDefaults();
  },
  methods: {
    setDefaults() {
      this.selectedDough = this.dough.find(
        (doughItem) => doughItem.id === 1
      )?.type;
    },
  },
};
</script>
