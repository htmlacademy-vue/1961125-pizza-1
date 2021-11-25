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
            <AdditionalList />
          </div>

          <div class="cart__form">
            <CartForm />
          </div>
        </template>
      </div>
    </main>

    <section v-if="!isEmpty" class="footer">
      <div class="footer__more">
        <router-link to="/" class="button button--border button--arrow">
          Хочу еще одну
        </router-link>
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: 2 228 ₽</b>
      </div>

      <div class="footer__submit">
        <button type="submit" class="button">Оформить заказ</button>
      </div>
    </section>
  </form>
</template>

<script>
import { mapGetters } from "vuex";
import CartList from "@/modules/cart/components/CartList";
import AdditionalList from "@/modules/cart/components/AdditionalList";
import CartForm from "@/modules/cart/components/CartForm";

export default {
  name: "Cart",
  components: { CartForm, AdditionalList, CartList },
  computed: {
    ...mapGetters("Cart", ["isEmpty"]),
  },
};
</script>
