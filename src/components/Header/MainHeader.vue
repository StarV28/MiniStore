<template>
  <div class="container">
    <div class="header">
      <router-link :to="{ name: 'home' }" class="header__logo">MiniStore.</router-link>
      <menu-header class="header__menu" />
    </div>
  </div>
</template>

<script setup>
import MenuHeader from './MenuHeader.vue'
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 25px 0;
}
.header__logo {
  font-size: 33px;
  font-weight: 400;
  color: rgb(39, 39, 39);
  cursor: pointer;
  text-decoration: none;
  @media (max-width: 768px) {
    font-size: 24px;
  }
}
@media (max-width: 768px) {
  .header {
    position: relative;
  }
  .header__logo {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    text-align: center;
    font-size: 55px;
    color: rgb(255, 255, 255, 0.4);
    z-index: 0;
  }
  .header__menu {
    position: relative;
    z-index: 100;
  }
}
</style>
