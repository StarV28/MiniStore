<template>
  <div class="wrapper">
    <header :class="headerScroll">
      <main-header />
    </header>
    <main>
      <slot></slot>
      <main-global-comp />
    </main>
    <footer>
      <footer-comp />
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import MainHeader from '../components/Header/MainHeader.vue'
import FooterComp from '../components/FooterComp.vue'
import MainGlobalComp from '../components/GlobalBox/MainGlobalComp.vue'

//===const=====================================================================================================================================================

const statusScrollY = ref(false)
const headerScroll = computed(() => (statusScrollY.value ? 'scrolled' : ''))
//==scroll======================================================================================================================================================
const handleScroll = () => {
  statusScrollY.value = window.scrollY > 100
}
//========================================================================================================================================================
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  position: relative;
}
header {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  position: fixed;
  width: 100%;
  z-index: 100;
  background-color: rgb(255, 255, 255);
}
@media (max-width: 768px) {
  header {
    background-color: rgb(0, 0, 0, 0.1);
  }
  .scrolled {
    background-color: rgb(255, 255, 255);
  }
}
main {
  margin-top: 102.8px;
  flex: 1 0 auto;
}
footer {
  border-top: 1px solid #eaeaea;
  margin-top: auto;
}
</style>
