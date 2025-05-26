<template>
  <div class="card">
    <div class="card__image">
      <router-link :to="`/product/${product.id_product}`" class="card__link">
        <img :src="fullImagePath" alt="Image Card" />
      </router-link>
      <button type="button" @click="addToCart(product.id_product)" class="card__btn">
        <span>Add to cart </span><icons-comp name="cart" size="14" color="ffffff" />
      </button>
    </div>
    <div class="card__price">
      <h4>{{ product.title }}</h4>
      <span>{{ product.price }} €</span>
    </div>
    <div class="card__rating">
      <v-rating
        v-model="userRating"
        @update:model-value="submitRating"
        :length="5"
        :size="22"
        :readonly="ratingReadonly"
        color="#cccccc"
        active-color="#72aec8"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useProductsStore } from '@/stores/productStore'
import { isAuthenticated } from '@/router/helper/authRouter'
import { useCartStore } from '@/stores/cartStore'

const prodStore = useProductsStore()
const error = ref(null)
const cartStore = useCartStore()

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})
const fullImagePath = computed(() => `${prodStore.baseURL}${props.product.image_path}`)
//======rating==================================================================================================================================================
const userRating = ref(props.product.rating)
const ratingReadonly = computed(() => !isAuthenticated())

const submitRating = async () => {
  try {
    const payload = {
      id: props.product.id_product,
      rating: userRating.value,
    }

    const response = await prodStore.getRating(payload)
    if (!response) return

    const updated = parseFloat(response.data.updatedRating)
    userRating.value = updated

    ratingReadonly.value = true
  } catch (err) {
    console.error(err)
    error.value = err.response?.data?.error || err.message || 'Error Rating'
  }
}
//========================================================================================================================================================
const addToCart = (id) => {
  if (id) {
    cartStore.addToCartItem({ id_product: id })
  }
}
//========================================================================================================================================================
onMounted(() => {
  // const user = localStorage.getItem('user')
  // console.log('user------', user)
})
</script>

<style lang="scss" scoped>
.card {
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 10px;
  padding: 10px;
  box-shadow: 2px 5px 5px 5px#999;
  transition: all 0.3s ease;
  text-decoration: none;
}
.card__image {
  position: relative;
  width: 100%;
  padding-bottom: 420px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  cursor: pointer;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
.card__link {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}
.card__btn {
  width: 70%;
  position: absolute;
  z-index: 2;
  bottom: 35px;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 8px;
  background-color: rgb(39, 39, 39);
  opacity: 0;
  text-decoration: none;
  transition: all 0.3s ease;

  span {
    text-transform: uppercase;
    font-family: 'Lato';
    font-size: 14px;
    font-weight: 700;
    line-height: 1.5;
    letter-spacing: 10%;
    color: #ffffff;
  }
  &:hover {
    transition: all 0.3s ease;
    box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.594);
  }
}
.card:hover {
  transition: all 0.3s ease;
  transform: scale(1.01);
  .card__btn {
    transition: all 0.3s ease;
    opacity: 1;
  }
}
.card__price {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-weight: 400;
  font-size: 20px;
  line-height: 2;
  letter-spacing: 6%;

  h4 {
    color: rgb(39, 39, 39);
  }
  span {
    color: #72aec8;
  }
}

@media (max-width: 768px) {
  .card__btn {
    opacity: 1;
  }
}
</style>
