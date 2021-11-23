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
    this.init();
  },
  methods: {
    ...mapActions("Builder", ["init"]),
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
