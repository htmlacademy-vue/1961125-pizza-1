<template>
  <fragment>
    <AppHeader />
    <slot />
  </fragment>
</template>

<script>
import AppHeader from "@/common/components/AppHeader";

export default {
  name: "AppLayoutDefault",
  components: { AppHeader },
};
</script>
