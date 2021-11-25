<template>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<script>
import { mapActions } from "vuex";
import AppLayout from "@/layouts/AppLayout";

export default {
  name: "App",

  components: { AppLayout },

  created() {
    this.builderInit();
    this.cartInit();
  },

  methods: {
    ...mapActions("Builder", {
      builderInit: "init",
    }),

    ...mapActions("Cart", {
      cartInit: "init",
    }),
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
