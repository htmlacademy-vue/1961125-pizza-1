<template>
  <ul class="additional-list">
    <li
      v-for="additionalItem in additionalItems"
      :key="`additional-item-${additionalItem.id}`"
      class="additional-list__item sheet"
    >
      <p class="additional-list__description">
        <img
          :src="getImage(additionalItem.type)"
          width="39"
          height="60"
          :alt="additionalItem.name"
        />
        <span>{{ additionalItem.name }}</span>
      </p>

      <div class="additional-list__wrapper">
        <BaseCounter
          :value="additionalItem.count"
          :min="0"
          class="additional-list__counter"
          is-orange-style
          @input="updateAdditionalItemCount(additionalItem.id, $event)"
        />

        <div class="additional-list__price">
          <b>× {{ additionalItem.price }} ₽</b>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import BaseCounter from "@/common/components/BaseCounter";
import { mapState, mapActions } from "vuex";

export default {
  name: "AdditionalList",
  components: { BaseCounter },
  computed: {
    ...mapState("Cart", ["additionalItems"]),
  },
  created() {
    this.images = {
      cola: require("@/assets/img/cola.svg"),
      sauce: require("@/assets/img/sauce.svg"),
      potato: require("@/assets/img/potato.svg"),
    };
  },
  methods: {
    ...mapActions("Cart", ["setAdditionalItems"]),

    getImage(type) {
      return this.images[type] || null;
    },
    updateAdditionalItemCount(additionalItemId, count) {
      const additionalItems = this.additionalItems;
      const additionalItem = additionalItems.find(
        (item) => item.id === additionalItemId
      );

      additionalItem.count = count;

      this.setAdditionalItems(additionalItems);
    },
  },
};
</script>
