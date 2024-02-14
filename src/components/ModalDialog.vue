<script setup>
  defineProps({
    visible: {
      required: true,
      type: Boolean,
      default: false,
    },
  })

  const emits = defineEmits(['close-modal'])

  const closeModal = () => {
    emits('close-Modal')
  }
</script>

<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="modal"
    >
      <div
        class="modal__overlay"
        @click="closeModal"
      >
      &nbsp;
      </div>
      <div class="modal__content">
        <div class="modal__content-header">
          <slot name="header"></slot>
        </div>
        <div class="modal__content-body">
          <slot name="body"></slot>
        </div>
        <div class="modal__content-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal {
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;

  &__overlay {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    z-index: 999;
    background-color: rgba(0,0,0,.5);
    z-index: 0;
  }

  &__content {
    width: 520px;
    z-index: 1;
    background: #fff;
    border-radius: 12px;
    margin: 20px 12px;
    transition: transform .4s,opacity .4s,-webkit-transform .4s;
    transition-timing-function: cubic-bezier(.2,.8,.4,1);
    transform: translateY(0);

    &-header {
      margin: 20px 24px 16px;
      margin-right: 40px;
      font-size: 20px;
      line-height: 28px;
      color: #202123;
      font-weight: 700;
    }

    &-body {
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      margin: 20px 24px 24px;
    }

    &-footer {
      align-items: center;
      display: flex;
      justify-content: flex-end;
      margin: 32px 24px 24px;
    }
  }
}
</style>