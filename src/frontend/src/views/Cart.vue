<template>
  <form @submit.prevent class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div v-if="isEmpty" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>

        <template v-else>
          <CartList class="sheet" />

          <div class="cart__additional">
            <CartAdditionalList />
          </div>

          <div class="cart__form">
            <CartForm />
          </div>
        </template>
      </div>
    </main>

    <CartFooter v-if="!isEmpty" />
  </form>
</template>

<script>
import { mapGetters } from "vuex";
import CartList from "@/modules/cart/components/CartList";
import CartAdditionalList from "@/modules/cart/components/CartAdditionalList";
import CartForm from "@/modules/cart/components/CartForm";
import CartFooter from "@/modules/cart/components/CartFooter";

export default {
  name: "Cart",
  components: { CartFooter, CartForm, CartAdditionalList, CartList },
  computed: {
    ...mapGetters("Cart", ["isEmpty"]),
  },
};
</script>
