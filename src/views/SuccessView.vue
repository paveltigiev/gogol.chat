<script setup lang="ts">
import HeroBlock from '../components/HeroBlock.vue'
import ChatBox from '../components/ChatBox.vue'
</script>

<template>
  <div class="content__wrapper">
    <div class="container">
      <div class="content">
        <div class="content__box">
          <hero-block
            title="Brings humanity<br> to your CRM system"
            video="/demo.mp4"
          />
        </div>
        <chat-box
          title="Вы в списке"
          text="Сейчас мы на этапе закрытого тестирования. Мы пригласим вас как только появится свободный слот..."
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '/src/assets/styles/mixins/main.scss';
.content {
  display: flex;
  gap: 140px;

  @include mq($bp-medium-big, $bp-big) {
    gap: 0;
    flex-wrap: wrap;
  }

  @include mq($bp-super-small, $bp-medium-big) {
    gap: 0;
    width: 100%;
  }

  &__box {
    display: flex;
    flex-direction: column;
    gap: 120px;

    @include mq($bp-medium-big, $bp-big) {
      gap: 60px;
    }

    @include mq($bp-super-small, $bp-medium-big) {
      width: 100%;
      gap: 40px;
    }
  }
}
</style>
