<template>
  <div v-if="isShowed" class="popup-wrapper">
    <div class="popup">
      <a class="close" @click.prevent="onClose">
        <span class="visually-hidden">Закрыть попап</span>
      </a>
      <div v-if="title" class="popup__title">
        <h2 class="title">{{ title }}</h2>
      </div>
      <p v-if="caption">{{ caption }}</p>
      <div v-if="okBtnCaption" class="popup__button">
        <a class="button" @click="onOk">{{ okBtnCaption }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppPopup",
  model: {
    prop: "isShowed",
    event: "change",
  },
  props: {
    isShowed: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
    },
    caption: {
      type: String,
    },
    okBtnCaption: {
      type: String,
    },
  },
  methods: {
    onClose() {
      this.$emit("popup-close");
      this.$emit("change", false);
    },
    onOk() {
      this.$emit("popup-ok");
    },
  },
};
</script>
