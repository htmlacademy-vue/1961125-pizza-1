<template>
  <div class="dough">
    <BaseRadio
      v-for="doughType in doughTypes"
      :key="`doughItem-${doughType.id}`"
      v-model="localSelectedDough"
      :value="doughType.type"
      :class="['dough__input', `dough__input--${doughType.type}`]"
      is-cleared-styles
    >
      <b>{{ doughType.name }}</b>
      <span>{{ doughType.description }}</span>
    </BaseRadio>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import BaseRadio from "@/common/components/BaseRadio";

export default {
  name: "BuilderDoughSelector",
  components: { BaseRadio },
  computed: {
    ...mapState("Builder", ["doughTypes", "selectedDough"]),

    localSelectedDough: {
      get() {
        return this.selectedDough;
      },
      set(value) {
        this.setSelectedDough(value);
      },
    },
  },
  methods: {
    ...mapActions("Builder", ["setSelectedDough"]),
  },
};
</script>
