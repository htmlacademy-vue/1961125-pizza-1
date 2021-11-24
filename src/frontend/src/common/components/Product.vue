<template>
  <div class="product">
    <img
      src="~@/assets/img/product.svg"
      class="product__img"
      width="56"
      height="56"
      :alt="name"
    />
    <div class="product__text">
      <h2>{{ name }}</h2>
      <ul>
        <li v-for="(feature, index) in features" :key="`feature-${index}`">
          {{ feature }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Product",
  props: {
    name: {
      type: String,
      required: true,
    },
    features: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
