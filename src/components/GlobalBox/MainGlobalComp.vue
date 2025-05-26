<template>
  <div class="wrapper">
    <subscribe-comp />
    <shop-insta-comp />
    <big-footer-comp />
  </div>
</template>

<script setup>
import SubscribeComp from './SubscribeComp.vue'
import ShopInstaComp from './ShopInstaComp.vue'
import BigFooterComp from './BigFooterComp.vue'
</script>

<style lang="scss" scoped>
.wrapper {
  padding-top: 120px;
}
@media (max-width: 768px) {
  .wrapper {
    padding-top: 40px;
  }
}
</style>
