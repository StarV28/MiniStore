<template>
  <div>
    <main-page>
      <div class="container">
        <div class="product">
          <div class="product__data data">
            <div class="data__image">
              <img :src="fullImagePath" alt="image product" />
            </div>
            <div class="data__box box">
              <div class="box__title">
                <h1>{{ product?.title }}</h1>
              </div>
              <div class="box__rating">
                <icons-comp name="star-black" color="transparent" size="17" /> {{ product?.rating }}
              </div>
              <div class="box__price">€ {{ product?.price }}</div>
              <div class="box__count">{{ product?.counter }} {{ $t('product.stock') }}</div>
              <!-- <div class="box__buy-count">
                <button class="counter" @click="increment(product)">+</button>
                <span>{{ product?.quantity }}</span>
                <button
                  class="counter"
                  @click="decrement(product)"
                  :disabled="product?.quantity <= 1"
                >
                  -
                </button>
              </div> -->
              <div class="box__btn-block">
                <!-- <router-link :to="{ name: 'checkout' }" class="btn-buy">{{
                  $t('product.buy')
                }}</router-link> -->
                <button @click="toCheckOut" type="button" class="btn-buy">
                  {{ $t('product.buy') }}
                </button>
                <button
                  class="btn-buy cart"
                  @click="addedToCart(product?.id_product, product?.quantity)"
                >
                  {{ $t('product.add') }}
                </button>
              </div>
              <div class="box__id">SKU: {{ product?.id_product }}</div>
              <div class="box__category">
                {{ $t('product.category') }}: {{ product?.category_title }}
              </div>
            </div>
          </div>
          <div class="product__description">
            <h3>{{ $t('product.description') }}</h3>
            <div class="text">{{ langDecrypt }}</div>
          </div>
        </div>
      </div>
    </main-page>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, computed, toRaw } from 'vue'
import { useProductsStore } from '../stores/productStore'
import { useCartStore } from '@/stores/cartStore'
//========================================================================================================================================================

const route = useRoute()
const router = useRouter()
const prodStore = useProductsStore()
const cartStore = useCartStore()

const productID = route.params.id
const error = ref(null)
const product = ref(null)

const baseURL = prodStore.baseURL

const fullImagePath = computed(() => `${baseURL}${product.value?.image_path}`)
//========================================================================================================================================================
const requestOfProduct = async () => {
  try {
    const response = await prodStore.getByIdItem('product', productID)
    if (response) {
      product.value = response?.data
    }
  } catch (err) {
    console.error(err)
    error.value = err.response?.data?.error || err.message || "Didn't find this product"
  }
}
//========================================================================================================================================================
const addedToCart = (id) => {
  cartStore.addToCartItem({ id_product: id })
}
//========================================================================================================================================================
const toCheckOut = () => {
  cartStore.products = [
    {
      ...toRaw(product.value),
      quantity: 1,
    },
  ]
  router.push({ name: 'checkout' })
}
//========================================================================================================================================================
import { useLanguageStore } from '../stores/languageStore'
const langStore = useLanguageStore()

const langDecrypt = computed(() => {
  if (!product.value) {
    return
  }
  switch (langStore.language) {
    case 'en':
      return product.value.description_en
    case 'ua':
      return product.value.description_ua
    case 'de':
      return product.value.description_de
    default:
      return product.value.description_en
  }
})

//========================================================================================================================================================

onMounted(() => {
  requestOfProduct()
})
</script>

<style lang="scss" scoped>
.product {
  display: flex;
  flex-direction: column;
  gap: 120px;
  margin-top: 120px;
}
.data {
  display: flex;
  gap: 20px;
}
.data__image,
.data__box {
  width: 50%;
}
.data__image {
  position: relative;
  padding-bottom: 700px;
  overflow: hidden;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.box {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 20px;
}
.box__title {
  font-weight: 400;
  font-size: 30px;
  line-height: 1.15;
  letter-spacing: 6%;
  text-transform: uppercase;
}
.box__rating {
  display: flex;
  align-items: center;
  gap: 7px;
  font-family: 'Lato';
  font-weight: 400;
  line-height: 1.4;
}
.box__price {
  font-family: 'Lato';
  font-weight: 700;
  font-size: 40px;
  line-height: 1.9;
  color: rgb(114, 174, 200);
}
.box__counter,
.box__id,
.box__category {
  font-family: 'Lato';
  font-weight: 400;
  font-size: 16px;
  line-height: 1.4;
  text-transform: capitalize;
}
.box__buy-count {
  display: flex;
  align-items: center;
  gap: 6px;
  span {
    padding: 11px 40px;
    box-shadow: 2px 2px 2px 2px #ccc;
  }
}
.counter {
  padding: 11px 19px;
  box-shadow: 2px 2px 2px 2px #ccc;
  transition: all 0.3s ease;
  &:hover {
    transition: all 0.3s ease;
    transform: scale(1.05);
  }
}
.counter:disabled {
  background-color: rgba(204, 204, 204, 0.286);
  &:hover {
    transform: scale(1);
  }
}
.box__btn-block {
  display: flex;
  align-items: center;
  gap: 15px;
}
.btn-buy {
  padding: 16px 50px;
  background-color: rgb(114, 174, 200);
  color: rgb(255, 255, 255);
  font-family: 'Lato';
  font-weight: 500;
  font-size: 14px;
  line-height: 1.5;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.3s ease;
  &:hover {
    transition: all 0.3s ease;
    transform: scale(1.03);
    box-shadow: 2px 5px 5px rgb(39, 39, 39);
  }
}
.cart {
  background-color: rgb(39, 39, 39);
}
.product__description {
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
  h3 {
    font-weight: 400;
    font-size: 30px;
    line-height: 1.1;
    letter-spacing: 6%;
  }
}
.text {
  font-family: 'Lato';
  font-weight: 300;
  font-size: 16px;
  line-height: 1.38;
  color: rgb(58, 58, 58);
}
@media (max-width: 768px) {
  .product {
    gap: 60px;
    margin-top: 60px;
  }
  .product__description {
    gap: 25px;
  }
  .data__image {
    padding-bottom: 350px;
  }
  .box {
    gap: 15px;
  }
  .box__title {
    font-size: 20px;
  }
  .box__price {
    font-size: 20px;
  }
  .box__buy-count {
    gap: 6px;
    span {
      padding: 6px 20px;
    }
  }
  .counter {
    padding: 6px 10px;
  }
  .box__btn-block {
    gap: 15px;
  }
  .btn-buy {
    padding: 8px 20px;
  }
}
@media (max-width: 555px) {
  .data {
    flex-direction: column;
  }
  .data__image,
  .data__box {
    width: 100%;
  }
  .box__btn-block {
    width: 100%;
    flex-direction: column;
  }
  .btn-buy {
    width: 100%;
  }
  .box__title {
    font-size: 16px;
  }
}
</style>
