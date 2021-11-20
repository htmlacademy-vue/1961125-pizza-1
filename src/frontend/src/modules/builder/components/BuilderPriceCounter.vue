<template>
  <p>Итого: {{ price }} ₽</p>
</template>

<script>
export default {
  name: "BuilderPriceCounter",
  props: {
    price: {
      type: Number,
      required: true,
    },
  },
};
</script>
