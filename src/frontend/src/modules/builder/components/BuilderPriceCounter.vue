<template>
  <p>Итого: {{ calculatedPrice }} ₽</p>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BuilderPriceCounter",

  computed: {
    ...mapGetters("Builder", ["calculatedPrice"]),
  },
};
</script>
