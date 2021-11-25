<template>
  <div class="dough">
    <BaseRadio
      v-for="{ id, type, name, description } in doughTypes"
      :key="`doughItem-${id}`"
      v-model="localSelectedDough"
      :value="type"
      :class="['dough__input', `dough__input--${type}`]"
      is-cleared-styles
    >
      <b>{{ name }}</b>
      <span>{{ description }}</span>
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
