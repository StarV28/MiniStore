<template>
  <div class="navigate">
    <icons-comp name="search" size="18" @click="toOpenPopupSearch" />
    <icons-comp name="user" size="18" @click="toOpenPopup()" />
    <router-link :to="{ name: 'cart' }" class="navigate__cart">
      <icons-comp name="cart" size="18" />
      <span>({{ cartStore.cartCounter }})</span>
    </router-link>
  </div>
  <v-dialog v-model="authbox" width="auto">
    <v-card max-width="450" class="card">
      <img class="card__image" src="/images/insta-block-3.jpeg" alt="" />
      <h2>Sign In / Up</h2>
      <div class="card__btn-box">
        <span @click="toOpenLogin" class="btn-auth">Log In</span>
        <span @click="toOpenRegister" class="btn-auth">Register</span>
      </div>
    </v-card>
  </v-dialog>
  <login-comp />
  <register-comp />
  <search-comp v-model="searchDialog" />
  <!-- <div class="navigate__nickname"></div> -->
</template>

<script setup>
import { ref, provide, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import LoginComp from './AuthBox/LoginComp.vue'
import RegisterComp from './AuthBox/RegisterComp.vue'
import { useCartStore } from '@/stores/cartStore'
import { useAuthStore } from '@/stores/authStore'

//=======Open Popup =================================================================================================================================================
const router = useRouter()
const dialog = ref(false)
const dialogRegister = ref(false)
const authbox = ref(false)
const cartStore = useCartStore()
const authStore = useAuthStore()
//========================================================================================================================================================

const toOpenPopup = () => {
  try {
    const userLocal = localStorage.getItem('user')
    if (!userLocal) {
      authbox.value = !authbox.value
    } else {
      const user = JSON.parse(userLocal)
      const userID = user.id
      router.push({ name: 'user', params: { id: userID } })
    }
  } catch (error) {
    console.error('Error with open user', error)
    localStorage.removeItem('user')
    authbox.value = true
  }
}
const toOpenLogin = () => {
  authStore.dialog = true
  authbox.value = false
}
const toOpenRegister = () => {
  dialogRegister.value = !dialogRegister.value
  authbox.value = false
}
//========================================================================================================================================================

provide('dialogRegister', dialogRegister)
provide('dialog', dialog)

//===========Search Popup=============================================================================================================================================
import SearchComp from './SearchComp.vue'

const searchDialog = ref(false)
const toOpenPopupSearch = () => {
  searchDialog.value = !searchDialog.value
}
provide('searchDialog', searchDialog)
//========================================================================================================================================================
onMounted(() => {
  cartStore.initCart()
})
</script>

<style lang="scss" scoped>
.navigate {
  display: flex;
  align-items: center;
  gap: 19px;
  cursor: pointer;
}
@media (max-width: 768px) {
  .navigate {
    width: 100%;
    justify-content: space-around;
  }
}
.navigate__cart {
  display: flex;
  align-items: center;
  gap: 5px;
  text-decoration: none;
  color: rgb(39, 39, 39);
  span {
    font-size: 18px;
  }
}
.card {
  position: relative;
  z-index: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  width: 340px;
  padding: 25px;
  padding-bottom: 100px;
  // text-align: center;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.68);
    z-index: 3;
  }
  h2 {
    position: relative;
    z-index: 3;
    font-size: 30px;
    font-weight: 900;
    margin-bottom: 10px;
  }
}

.card__image {
  position: absolute;
  z-index: 2;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.card__btn-box {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
}
.btn-auth {
  padding: 16px 20px;
  background-color: rgb(39, 39, 39);
  color: #fff;
  font-size: 14px;
  font-family: 'Lato';
  font-weight: 400;
  line-height: 1.4;
  text-align: center;
  text-transform: capitalize;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 2px 5px 7px rgba(0, 0, 0, 0.7);
  }
}
.v-overlay--scroll-blocked {
  background-color: #72aec8b4;
}
</style>
