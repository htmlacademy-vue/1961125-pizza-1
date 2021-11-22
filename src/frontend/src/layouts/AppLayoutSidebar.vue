<template>
  <fragment>
    <AppHeader />
    <main class="layout">
      <AppSidebar class="layout__sidebar" />
      <div class="layout__content">
        <div class="layout__title">
          <h1 class="title title--big">Мои данные</h1>
        </div>
        <slot />
      </div>
    </main>
  </fragment>
</template>

<script>
import AppSidebar from "@/common/components/AppSidebar";
import AppHeader from "@/common/components/AppHeader";

export default {
  name: "AppLayoutSidebar",
  components: { AppHeader, AppSidebar },
};
</script>
