<template>
  <div class="wrapper">
    <div :class="active">
      <ul class="menu__list">
        <li v-for="item in menuItems" :key="item.name" class="menu__item">
          <router-link :to="item.path" class="menu__link">
            {{ $t(`menu.title.${item.name}`) }}
          </router-link>
        </li>
      </ul>
    </div>
    <language-comp />
    <nav-header />
    <icons-comp name="menu" size="50" :class="['btn', statusBtn]" @click="toggleDrawer" />
  </div>
</template>

<script setup>
import { routes } from '@/router/index'
import { useWidthScreen } from '@/CompositionFunk/dynamicScreenWidth'
import { computed, ref } from 'vue'
import NavHeader from './NavHeader.vue'
import LanguageComp from './LanguageComp.vue'

const menuItems = computed(() => routes.filter((route) => route.meta.useInMenu))
const drawer = ref(false)
const { windowWidth } = useWidthScreen()

const active = computed(() => {
  return drawer.value ? 'active' : ''
})
const statusBtn = computed(() => {
  return windowWidth.value > 768 ? 'box-none' : ''
})

const toggleDrawer = () => {
  drawer.value = !drawer.value
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  gap: 20px;
}
.menu {
  position: relative;
}
.menu__list {
  display: flex;
  list-style: none;
  align-items: center;
  gap: 35px;
}

.menu__link {
  font-size: 14px;
  font-family: 'Lato';
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 10%;
  text-decoration: none;
  text-transform: capitalize;
  color: rgb(39, 39, 39);
  transition: color 0.3s ease;
  &:hover {
    color: rgb(114, 174, 200);
  }
}
.router-link-active {
  color: rgb(114, 174, 200);
}
.box-none {
  display: none;
}
@media (max-width: 768px) {
  .menu__list {
    position: fixed;
    top: 15%;
    right: -100%;
    width: 0;
    opacity: 0;
    height: 100vh;
    background-color: rgb(255, 255, 255);
    flex-direction: column;
    padding-top: 35px;
    align-items: center;
    transition: all 0.7s ease;
    z-index: 100;
  }
  .menu__list::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(22, 22, 22, 0.1);
    z-index: -1;
  }
  .menu__link {
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
  }
  .btn {
    display: block;
  }
}
.active {
  & .menu__list {
    right: 0;
    width: 100%;
    opacity: 1;
    transition: all 0.3s ease;
  }
}
@media (max-width: 768px) {
  .wrapper {
    width: 100%;
    justify-content: space-around;
    gap: 10px;
  }
}
</style>
