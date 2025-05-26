<template>
  <div class="cart">
    <div class="cart__cards">
      <div class="card">
        <div class="card__name">
          <h2>{{ $t('cart.product') }}</h2>
          <div class="product card__item" v-for="product in products" :key="product.id_product">
            <div class="product__image">
              <img :src="fullImagePath(product)" alt="" />
            </div>
            <div class="product__title">
              <h5>{{ product.title }}</h5>
              <p>€ {{ product.price }}</p>
            </div>
          </div>
        </div>
        <div class="card__name">
          <h2>{{ $t('cart.quantity') }}</h2>
          <div class="quantity card__item" v-for="product in products" :key="product.id_product">
            <div class="box__buy-count">
              <button class="counter" @click="increment(product)">+</button>
              <span>{{ product.quantity }}</span>
              <button class="counter" @click="decrement(product)">-</button>
            </div>
          </div>
        </div>
        <div class="card__name subtitle-card-name">
          <h2>{{ $t('cart.subtitle') }}</h2>
          <div class="subtotal card__item" v-for="product in products" :key="product.id_product">
            <h1>€ {{ product.price * product.quantity }}</h1>
          </div>
        </div>
        <div class="card__name">
          <h2>{{ $t('cart.delete') }}</h2>
          <div class="delete card__item" v-for="product in products" :key="product.id_product">
            <button class="delete" @click="onDelete(product.id_product)">X</button>
          </div>
        </div>
      </div>
    </div>
    <total-price-comp />
    <div class="price__block-btn">
      <router-link :to="{ name: 'shop' }" class="btn"
        ><span>{{ $t('cart.shaping') }}</span></router-link
      >
      <router-link :to="{ name: 'checkout' }" class="btn"
        ><span>{{ $t('cart.checkout') }}</span></router-link
      >
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useProductsStore } from '../stores/productStore'
import { useCartStore } from '../stores/cartStore'
import TotalPriceComp from '../components/GlobalBox/TotalPriceComp.vue'

//===CONST=====================================================================================================================================================

const prodStore = useProductsStore()
const cartStore = useCartStore()
const products = ref([])

//===image=====================================================================================================================================================

const fullImagePath = (product) => {
  return `${prodStore.baseURL}${product.image_path}`
}
//========================================================================================================================================================
watch(
  () => cartStore.cart,
  async (newCart) => {
    await productData(newCart)
  },
  { deep: true, immediate: true },
)

//========================================================================================================================================================
async function productData(IDs) {
  if (!Array.isArray(IDs) || !IDs.length) {
    products.value = []
    return []
  }
  try {
    const arrIdProd = IDs.filter((item) => item.id_product)
    const res = await prodStore.getByIdItemS('cart/products', arrIdProd)
    products.value = res?.data?.products.map((item) => ({
      ...item,
      quantity: 1,
      max: item.counter || 1,
    }))

    cartStore.products = products.value
  } catch (err) {
    console.error('Error retrieving product data:', err)
    return []
  }
}

//===counter===product==================================================================================================================================================
const increment = (product) => {
  if (product.quantity < product.max) {
    product.quantity++
    cartStore.products = cartStore.products.map((item) =>
      item.id_product === product.id_product ? { ...item, quantity: product.quantity } : item,
    )
  } else {
    alert('This product is out of stock')
  }
}

const decrement = (product) => {
  if (product.quantity > 1) {
    product.quantity--
    cartStore.products = cartStore.products.map((item) =>
      item.id_product === product.id_product ? { ...item, quantity: product.quantity } : item,
    )
  } else {
    cartStore.deleteItemFromCart(product.id_product)
  }
}

// ========================================================================================================================================================
const onDelete = async (id) => {
  try {
    cartStore.deleteItemFromCart(id)
  } catch (error) {
    console.error('Error id from delete cart', error)
  }
}

//========================================================================================================================================================
onMounted(async () => {
  cartStore.initCart()
})
</script>

<style lang="scss" scoped>
.cart__cards {
  &:not(:last-child) {
    margin-bottom: 80px;
  }
}
.cards__product {
  display: flex;
  justify-content: space-between;
}
.card {
  display: grid;
  grid-template-columns: 50% 20% 20% 10%;
  grid-template-rows: auto;
}
.card__name {
  h2 {
    font-weight: 400;
    font-size: 20px;
    line-height: 1.5;
    letter-spacing: 6%;
    text-align: left;
    text-transform: uppercase;
    padding-bottom: 30px;
    border-bottom: 1px solid rgb(205, 205, 205);
  }
}
.card__item {
  padding: 20px 0;
  border-bottom: 1px solid rgb(205, 205, 205);
  height: 208px;
}
.product {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 25px;
}
.product__image {
  position: relative;
  width: 150px;
  padding-bottom: 188px;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.product__title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-right: 15px;
  h5 {
    font-weight: 400;
    font-size: 20px;
    line-height: 1.5;
    letter-spacing: 6%;
    text-align: left;
    text-transform: uppercase;
  }
  p {
    font-family: 'Lato';
    font-weight: 400;
    font-size: 20px;
    line-height: 1.5;
    letter-spacing: 3%;
    text-align: left;
    text-transform: uppercase;
    color: rgb(114, 174, 200);
  }
}

.quantity,
.subtotal {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.subtotal {
  h1 {
    font-family: 'Lato';
    font-weight: 500;
    font-size: 40px;
    line-height: 1.1;
    color: rgb(114, 174, 200);
  }
}
.delete {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 15px;
  button {
    font-size: 38px;
    font-weight: 500;
    color: rgb(39, 39, 39);
  }
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
.delete {
  cursor: pointer;
}
.price__block-btn {
  display: flex;
  gap: 20px;
}
.btn {
  padding: 16px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(39, 39, 39);
  text-decoration: none;
  transition: all 0.3s ease;

  span {
    font-family: 'Lato';
    font-weight: 500;
    font-size: 14px;
    letter-spacing: 10%;
    color: rgb(255, 255, 255);
  }

  &:hover {
    transition: all 0.3s ease;
    transform: scale(1.03);
    box-shadow: 2px 2px 5px black;
  }
}

@media (max-width: 1100px) {
  .card {
    grid-template-columns: 31% 25% 25% 10%;
  }
}
@media (max-width: 860px) {
  .card__name {
    h2 {
      font-size: 16px;
    }
  }
  .product__title {
    h5,
    p {
      font-size: 16px;
    }
  }
  .subtotal {
    h1 {
      font-size: 20px;
    }
  }
  .delete {
    button {
      font-size: 18px;
    }
  }
  .box__buy-count {
    span {
      padding: 6px 20px;
      box-shadow: 2px 2px 2px 2px #ccc;
    }
  }
  .counter {
    padding: 6px 10px;
  }
  .price__title {
    h1 {
      font-size: 18px;
    }
  }
  .item__title,
  .item__price {
    font-size: 16px;
  }
  .btn {
    padding: 8px 20px;
  }
}
@media (max-width: 768px) {
  .card {
    grid-template-columns: 40% 35% 15% 5%;
  }
  .card__item {
    padding: 10px 0;

    height: 140px;
  }
  .product {
    gap: 10px;
  }
  .product__image {
    width: 90px;
    padding-bottom: 90px;
  }
  .card__name {
    padding-bottom: 15px;
    h2 {
      font-size: 10px;
      line-height: 1;
    }
  }
  .product__title {
    max-width: 40%;
    h5,
    p {
      font-size: 10px;
    }
  }
  .subtotal {
    h1 {
      font-size: 14px;
    }
  }
  .delete {
    button {
      font-size: 14px;
    }
  }
  .box__buy-count {
    span {
      padding: 6px 10px;
    }
  }
  .counter {
    padding: 6px 10px;
  }
  .price__title {
    h1 {
      font-size: 14px;
    }
  }
  .item__title,
  .item__price {
    font-size: 12px;
  }
  .btn {
    padding: 8px 10px;
  }
}
@media (max-width: 460px) {
  .subtitle-card-name {
    display: none;
  }
  .card {
    grid-template-columns: 55% 35% 10%;
  }
  .box__buy-count {
    span {
      padding: 3px 5px;
    }
  }
  .counter {
    padding: 3px 5px;
  }
  .price__block-btn {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>
