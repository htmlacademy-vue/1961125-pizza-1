<template>
  <section class="footer">
    <div class="footer__more">
      <router-link to="/" class="button button--border button--arrow">
        Хочу еще одну
      </router-link>
    </div>
    <p class="footer__text">
      Перейти к конструктору<br />чтоб собрать ещё одну пиццу
    </p>
    <div class="footer__price">
      <b>Итого: {{ totalPrice }} ₽</b>
    </div>

    <div class="footer__submit">
      <button
        type="submit"
        class="button"
        :disabled="!isAddressFormValid"
        @click="placeOrder"
      >
        Оформить заказ
      </button>
    </div>

    <AppPopup
      v-model="isPopupShowed"
      title="Спасибо за заказ"
      caption="Мы начали готовить Ваш заказ, скоро привезём его вам ;)"
      ok-btn-caption="Отлично, я жду!"
      @popup-ok="goToNextPage"
      @popup-close="goToNextPage"
    />
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AppPopup from "@/common/components/AppPopup";

export default {
  name: "CartFooter",
  components: { AppPopup },
  data() {
    return {
      isPopupShowed: false,
    };
  },
  computed: {
    ...mapGetters("Cart", ["totalPrice", "isAddressFormValid"]),
    ...mapGetters("Auth", ["isAuth"]),
  },
  methods: {
    ...mapActions("Cart", ["clearCart"]),

    placeOrder() {
      this.isPopupShowed = true;
    },
    goToNextPage() {
      if (this.isAuth) {
        // TODO: добавить ордер в стор
        this.$router.push({ name: "Orders" });
      } else {
        this.$router.push({ name: "Index" });
      }

      this.clearCart();
    },
  },
};
</script>
