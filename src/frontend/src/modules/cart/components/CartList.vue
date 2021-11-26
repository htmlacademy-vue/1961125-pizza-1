<template>
  <ul v-if="items" class="cart-list">
    <CartListItem
      v-for="item in items"
      :key="`cart-list-item-${item.id}`"
      :item="item"
      @count-update="updateCartItemCount(item.id, $event)"
      @edit-item="editItem(item.id)"
    />
  </ul>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CartListItem from "./CartListItem";

export default {
  name: "CartList",

  components: { CartListItem },

  computed: {
    ...mapGetters("Cart", {
      items: "getSortedItems",
      getSortedItemById: "getSortedItemById",
    }),
  },

  methods: {
    ...mapActions("Cart", ["setItems"]),

    updateCartItemCount(itemId, count) {
      const items = this.items;
      const item = this.getSortedItemById(itemId);

      item.count = count;

      this.setItems(items);
    },

    editItem(itemId) {
      this.$router.push({ path: "/", query: { cartItemId: itemId } });
    },
  },
};
</script>
