<template>
  <div>
    <main-page>
      <div class="page__title">
        <h1>{{ $t('namePage.cart') }}</h1>
      </div>
      <div class="container">
        <div class="page">
          <cart-comp />
        </div>
      </div>
    </main-page>
  </div>
</template>

<script setup>
import CartComp from '../components/CartComp.vue'
</script>

<style lang="scss" scoped>
.page__title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 77px 0 109px 0;
  background-color: rgb(237, 241, 243);
  &:not(:last-child) {
    margin-bottom: 120px;
  }

  h1 {
    font-weight: 300;
    font-size: 83px;
    line-height: 1.14;
    letter-spacing: 2%;
  }
}
@media (max-width: 768px) {
  .page__title {
    padding: 35px 0 55px 0;
    &:not(:last-child) {
      margin-bottom: 60px;
    }
    h1 {
      font-size: 53px;
    }
  }
}
</style>
