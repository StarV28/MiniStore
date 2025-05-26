<template>
  <Swiper
    :modules="modules"
    :loop="products.length > 4"
    :autoplay="{ delay: 3000 }"
    :pagination="{ clickable: true }"
    :slides-per-view="sliderPrev"
    @slideChange="onSlideChange"
    class="my-swiper"
  >
    <SwiperSlide class="swiper__main" v-for="product in products" :key="product.product_id">
      <div class="swiper__card">
        <div class="swiper__image">
          <img :src="fullImagePath(product?.image_path)" alt="Image Product" />
        </div>
        <ul class="swiper__data">
          <li class="swiper__title">{{ product.title }}</li>
          <li class="swiper__price">{{ product.price }} €</li>
        </ul>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script setup>
import { useProductsStore } from '@/stores/productStore'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
// import 'swiper/css/autoplay'
import { Pagination } from 'swiper/modules'
import { useWidthScreen } from '../../CompositionFunk/dynamicScreenWidth'
import { watch, ref, onMounted } from 'vue'
//========================================================================================================================================================
const prodStore = useProductsStore()
const { windowWidth } = useWidthScreen()
const sliderPrev = ref(null)

defineProps({
  products: {
    type: Array,
    required: true,
  },
})

//========================================================================================================================================================

const fullImagePath = (imagePath) => `${prodStore.baseURL}${imagePath}`
//========================================================================================================================================================

const modules = [Pagination]
const onSlideChange = () => {}

//========================================================================================================================================================
watch(windowWidth, (newWidth) => {
  if (newWidth < 768) {
    sliderPrev.value = 2
  } else {
    sliderPrev.value = 4
  }
})
//========================================================================================================================================================
onMounted(() => {
  if (windowWidth.value < 768) {
    sliderPrev.value = 2
  } else {
    sliderPrev.value = 4
  }
})
</script>

<style lang="scss" scoped>
.swiper__card {
  width: 91%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 50px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.166);
}
.swiper__image {
  position: relative;
  width: 100%;
  padding-bottom: 118%;
  overflow: hidden;
  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.swiper__data {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
}
.swiper__title {
  font-weight: 400;
  font-size: 16px;
  line-height: 1.2;
}
.swiper__price {
  font-family: 'Lato';
  font-weight: 400;
  font-size: 16px;
  color: rgb(114, 174, 200);
}
@media (max-width: 768px) {
  .swiper__data {
    flex-direction: column;
    align-items: start;
    justify-content: center;
  }
  .swiper__title {
    font-size: 14px;
  }
  .swiper__price {
    font-size: 14px;
  }
}
</style>
