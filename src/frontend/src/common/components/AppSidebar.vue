<template>
  <div class="sidebar">
    <router-link to="/" class="logo layout__logo">
      <img
        src="~@/assets/img/logo.svg"
        alt="V!U!E! Pizza logo"
        width="90"
        height="40"
      />
    </router-link>

    <router-link
      v-for="{ to, label } in $options.sidebarLinks"
      :key="`sidebar-link-${to}`"
      class="layout__link"
      active-class="layout__link--active"
      :to="to"
    >
      {{ label }}
    </router-link>
  </div>
</template>

<script>
import { sidebarLinks } from "@/common/constants";

export default {
  name: "AppSidebar",

  created() {
    this.$options.sidebarLinks = sidebarLinks;
  },
};
</script>
