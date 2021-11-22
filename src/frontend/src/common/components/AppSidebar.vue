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
      v-for="(link, index) in links"
      :key="`sidebar-link-${index}`"
      class="layout__link"
      active-class="layout__link--active"
      :to="link.to"
    >
      {{ link.label }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: "AppSidebar",
  computed: {
    links() {
      return this.$route.meta?.sidebarLinks || [];
    },
  },
};
</script>
