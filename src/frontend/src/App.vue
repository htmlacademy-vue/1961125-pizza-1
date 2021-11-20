<template>
  <AppLayout>
    <Index />
  </AppLayout>
</template>

<script>
import Index from "@/views/Index";
import AppLayout from "@/layouts/AppLayout";

export default {
  name: "App",
  components: { AppLayout, Index },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
