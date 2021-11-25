<template>
  <ul class="additional-list">
    <li
      v-for="{ id, type, name, count, price } in additionalItems"
      :key="`additional-item-${id}`"
      class="additional-list__item sheet"
    >
      <p class="additional-list__description">
        <img :src="$options.images[type]" width="39" height="60" :alt="name" />
        <span>{{ name }}</span>
      </p>

      <div class="additional-list__wrapper">
        <BaseCounter
          :value="count"
          :min="0"
          class="additional-list__counter"
          is-orange-style
          @input="updateAdditionalItemCount(id, $event)"
        />

        <div class="additional-list__price">
          <b>× {{ price }} ₽</b>
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
    this.$options.images = {
      cola: require("@/assets/img/cola.svg"),
      sauce: require("@/assets/img/sauce.svg"),
      potato: require("@/assets/img/potato.svg"),
    };
  },

  methods: {
    ...mapActions("Cart", ["setAdditionalItems"]),

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
