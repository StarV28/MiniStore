<template>
  <div class="container">
    <div class="big-footer">
      <div class="big-footer__network network">
        <h5>MiniStore.</h5>
        <p>{{ $t('globalBox.bigFooter.text') }}</p>
        <div class="network-foot__icons">
          <router-link to="" class="network__item"
            ><icons-comp name="fb" size="21" color="72aec8"
          /></router-link>
          <router-link to="" class="network__item"
            ><icons-comp name="insta" size="21" color="72aec8"
          /></router-link>
          <router-link to="" class="network__item"
            ><icons-comp name="twitter" size="21" color="72aec8"
          /></router-link>
          <router-link to="" class="network__item"
            ><icons-comp name="in" size="21" color="72aec8"
          /></router-link>
          <router-link to="" class="network__item"
            ><icons-comp name="youtube" size="21" color="72aec8"
          /></router-link>
        </div>
      </div>
      <div class="big-footer__menu menu">
        <h5>{{ $t('globalBox.bigFooter.title1') }}</h5>
        <ul class="menu__list">
          <li v-for="item in menuFooterItems" :key="item.name" class="menu__item">
            <router-link :to="{ name: item.name }" class="menu__link">
              {{ $t(`menu.title.${item.name}`) }}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="big-footer__contact contact">
        <h5>{{ $t('globalBox.bigFooter.title2') }}</h5>
        <div class="contact__info">
          <p>{{ $t('globalBox.bigFooter.textEmail') }}</p>
          <a href="mailto:yourinfo@gmail.com">yourinfo@gmail.com</a>
        </div>
        <div class="contact__info">
          <p>{{ $t('globalBox.bigFooter.textTel') }}</p>
          <a href="tel:+5511122233344">+55 111 222 333 44</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { routes } from '@/router/index'
const menuFooterItems = computed(() => routes.filter((route) => route.meta.useInMenu))
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
}
.big-footer {
  display: grid;
  grid-template-columns: 345px 1fr 345px;
  grid-template-rows: auto;
  gap: 20px;
  margin-bottom: 80px;
  h5 {
    font-size: 33px;
    font-weight: 400;
    color: rgb(39, 39, 39);
  }
}
.network {
  display: flex;
  flex-direction: column;
  gap: 10px;
  p {
    font-size: 16px;
    font-weight: 300;
    line-height: 1.4;
    letter-spacing: 3%;
    color: rgb(58, 58, 58);
  }
}
.network-foot__icons {
  padding-top: 15px;
  display: flex;
  gap: 30px;
}
.network__item {
  transition: all 0.3s ease;
  &:hover {
    transform: translate(0, -5px) scale(1.1);
  }
}
.menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.menu__list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.menu__item {
  list-style: none;
}
.menu__link {
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.1;
  letter-spacing: 10%;
  color: rgb(58, 58, 58);
  transition: all 0.3s ease;
  &:hover {
    color: rgb(114, 174, 200);
  }
}
.router-link-active {
  color: rgb(114, 174, 200);
}
.contact {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.contact__info {
  display: flex;
  flex-direction: column;
  p {
    font-family: 'Lato';
    font-size: 16px;
    font-weight: 300;
    line-height: 1.4;
    letter-spacing: 3%;
  }
  a {
    font-family: 'Lato';
    font-size: 16px;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: 3%;
    color: rgb(58, 58, 58);
    transition: all 0.3s ease;
    &:hover {
      color: rgb(114, 174, 200);
    }
  }
}
@media (max-width: 965px) {
  .big-footer {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-template-rows: auto;
    margin-bottom: 40px;
    gap: 30px;
  }
}
@media (max-width: 768px) {
  .big-footer {
    // grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-template-rows: auto;
    margin-bottom: 40px;
    gap: 20px;
    h5 {
      font-size: 18px;
      border-bottom: 1px solid #72aec8;
    }
  }
}
</style>
