<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script>
/*
sidebar - profile, orders
default - index, cart +
empty - login +
 */

const defaultLayout = "AppLayoutDefault";

export default {
  name: "AppLayout",
  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>
