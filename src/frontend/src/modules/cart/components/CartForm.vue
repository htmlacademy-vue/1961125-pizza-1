<template>
  <div class="cart-form">
    <label class="cart-form__select">
      <span class="cart-form__label">Получение заказа:</span>

      <select class="select" v-model="localReceivingType">
        <option :value="$options.receivingTypes.BY_SELF">Заберу сам</option>
        <option :value="$options.receivingTypes.NEW">Новый адрес</option>
        <option
          v-for="{ id, name } in userAddresses"
          :key="`address-${id}`"
          :value="$options.receivingTypes.SAVED_ADDRESS"
        >
          {{ name }}
        </option>
      </select>
    </label>

    <label v-if="isPhoneInputShowed" class="input input--big-label">
      <span>Контактный телефон:</span>
      <input
        v-model="localPhone"
        type="text"
        name="tel"
        placeholder="+7 999-999-99-99"
        autocomplete="tel"
      />
    </label>

    <div v-if="isAddressInputShowed" class="cart-form__address">
      <span class="cart-form__label">Новый адрес:</span>

      <div class="cart-form__input">
        <label class="input">
          <span>Улица*</span>
          <input
            v-model="localAddressStreet"
            type="text"
            name="street"
            autocomplete="address-line1"
            :disabled="isAddressInputDisabled"
          />
        </label>
      </div>

      <div class="cart-form__input cart-form__input--small">
        <label class="input">
          <span>Дом*</span>
          <input
            v-model="localAddressBuilding"
            type="text"
            name="house"
            autocomplete="address-line2"
            :disabled="isAddressInputDisabled"
          />
        </label>
      </div>

      <div class="cart-form__input cart-form__input--small">
        <label class="input">
          <span>Квартира</span>
          <input
            v-model="localAddressApartment"
            type="text"
            name="apartment"
            :disabled="isAddressInputDisabled"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
import { receivingTypes } from "../constants";

export default {
  name: "CartForm",

  computed: {
    ...mapGetters("Auth", ["isAuth"]),
    ...mapState("Auth", ["userAddresses"]),
    ...mapState("Cart", [
      "receivingType",
      "phone",
      "addressStreet",
      "addressBuilding",
      "addressApartment",
    ]),

    localReceivingType: {
      get() {
        return this.receivingType;
      },
      set(value) {
        this.setReceivingType(value);
      },
    },

    localPhone: {
      get() {
        return this.phone;
      },
      set(value) {
        this.setPhone(value);
      },
    },

    localAddressStreet: {
      get() {
        return this.addressStreet;
      },
      set(value) {
        this.setAddressStreet(value);
      },
    },

    localAddressBuilding: {
      get() {
        return this.addressBuilding;
      },
      set(value) {
        this.setAddressBuilding(value);
      },
    },

    localAddressApartment: {
      get() {
        return this.addressApartment;
      },
      set(value) {
        this.setAddressApartment(value);
      },
    },

    isPhoneInputShowed() {
      return (
        this.receivingType === receivingTypes.BY_SELF ||
        this.receivingType === receivingTypes.NEW
      );
    },

    isAddressInputShowed() {
      return this.receivingType === receivingTypes.NEW;
    },

    isAddressInputDisabled() {
      return this.receivingType === receivingTypes.SAVED_ADDRESS;
    },
  },

  created() {
    this.$options.receivingTypes = receivingTypes;
  },

  methods: {
    ...mapActions("Cart", [
      "setReceivingType",
      "setPhone",
      "setAddressStreet",
      "setAddressBuilding",
      "setAddressApartment",
    ]),
  },
};
</script>
