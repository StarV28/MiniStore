<template>
  <main-page>
    <div class="page">
      <div class="page__main-box">
        <div class="container">
          <div class="main-box">
            <div class="main-box__title">
              <h1>{{ $t('home.titleOne') }}</h1>
              <router-link :to="{ name: 'shop' }"
                ><span>{{ $t('home.btnShop') }}</span></router-link
              >
            </div>
            <div class="main-box__image">
              <img src="/images/apple-watch-main.jpeg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="page__guaranty">
          <guaranty-comp />
        </div>
        <div class="page__carousel">
          <p class="carousel__title">{{ $t('home.titlePhone') }}</p>
          <carousel-comp :products="phone" />
        </div>
        <div class="page__carousel">
          <p class="carousel__title">{{ $t('home.titleWatch') }}</p>
          <carousel-comp :products="watch" />
        </div>
      </div>
    </div>
  </main-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useProductsStore } from '../stores/productStore.js'
import GuarantyComp from '../components/GlobalBox/GuarantyComp.vue'
import CarouselComp from '../components/GlobalBox/CarouselComp.vue'
//========================================================================================================================================================
const productStore = useProductsStore()

const phone = ref([])
const watch = ref([])
//========================================================================================================================================================
const productByCategory = async (category, id) => {
  try {
    const data = { [category]: `${id}` }
    const response = await productStore.getByIdItemS('product/category', data)
    const result = Array.isArray(response.data) ? response : []
    return result.data
  } catch (err) {
    console.error(err)
  }
}
//========================================================================================================================================================
onMounted(async () => {
  phone.value = await productByCategory('id_category', 1)
  watch.value = await productByCategory('id_category', 7)
})
</script>

<style lang="scss" scoped>
.page__main-box {
  width: 100%;
  background-color: rgb(237, 241, 243);
  &:not(:last-child) {
    margin-bottom: 120px;
  }
}
.main-box {
  width: 100%;
  display: flex;
  gap: 65px;
  align-items: center;
  justify-content: space-between;
}
.main-box__title {
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: start;
  justify-content: center;

  h1 {
    font-weight: 300;
    font-size: 83px;
    line-height: 1.14;
    letter-spacing: 2%;
  }
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px 50px;
    background-color: rgb(39, 39, 39);
    transition: all 0.3s ease;
    span {
      text-decoration: none;
      font-family: 'Lato';
      font-weight: 500;
      font-size: 14px;
      line-height: 1.5;
      color: #ffff;
    }
    &:hover {
      transition: all 0.3s ease;
      transform: scale(1.03);
      box-shadow: 2px 2px 5px black;
    }
  }
}
.main-box__image {
  position: relative;
  width: 612px;
  padding-bottom: 500px;
  overflow: hidden;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.page__guaranty,
.page__carousel {
  &:not(:last-child) {
    margin-bottom: 120px;
  }
}
.carousel__title {
  display: inline-block;
  margin-bottom: 30px;
  font-weight: 400;
  font-size: 30px;
  line-height: 1.1;
}
@media (max-width: 768px) {
  .main-box {
    gap: 30px;
    &:not(:last-child) {
      margin-bottom: 60px;
    }
  }
  .main-box__title {
    gap: 20px;
    h1 {
      font-size: 53px;
    }
    a {
      padding: 8px 20px;
    }
  }
  .main-box__image {
    width: 312px;
    padding-bottom: 250px;
  }
  .page__guaranty,
  .page__carousel {
    &:not(:last-child) {
      margin-bottom: 60px;
    }
  }
  .carousel__title {
    margin-bottom: 30px;
    font-size: 18px;
  }
}
@media (max-width: 515px) {
  .main-box__title {
    gap: 15px;
    h1 {
      font-size: 33px;
    }
    a {
      padding: 8px 20px;
      span {
        font-size: 12px;
      }
    }
  }
}
</style>
