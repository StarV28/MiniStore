<template>
  <div class="cart__price price">
    <div class="price__block">
      <div class="price__title">
        <h1>{{ $t('cart.totalTitle') }}</h1>
      </div>
      <div class="price__item">
        <div class="item__title">{{ $t('cart.subtotal') }}</div>
        <div class="item__price">€ {{ totalPrice }}</div>
      </div>
      <div class="price__item">
        <div class="item__title">{{ $t('cart.total') }}</div>
        <div class="item__price">€ {{ totalPrice }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '../../stores/cartStore'
//========================================================================================================================================================
const cartStore = useCartStore()
const products = computed({
  get: () => cartStore.products,
  set: (val) => (cartStore.products = val),
})

//========================================================================================================================================================

const cleanNumber = (val, fallback = 0) => {
  let valNumber = null
  if (typeof val === 'string') {
    valNumber = Number(val.replace(/[^\d.,]/g, '').replace(',', '.')) || fallback
    return valNumber
  }
  return Number(val) || fallback
}

const totalPrice = computed(() => {
  if (!Array.isArray(products.value || !products.value.length)) return 0
  return products.value.reduce((sum, product) => {
    const price = cleanNumber(product.price)
    const quantity = cleanNumber(product.quantity, 1)
    const total = sum + quantity * price

    return total
  }, 0)
})
</script>

<style lang="scss" scoped>
.price {
  display: flex;
  flex-direction: column;
  gap: 30px;
  &:not(:last-child) {
    margin-bottom: 30px;
  }
}
.price__block {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.price__title {
  width: 100%;
  border-bottom: 1px solid rgb(205, 205, 205);
  h1 {
    font-weight: 400;
    font-size: 30px;
    line-height: 1.14;
    letter-spacing: 6%;
    text-transform: uppercase;
  }
}
.price__item {
  width: 100%;
  border-bottom: 1px solid rgb(205, 205, 205);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-template-rows: auto;
  text-align: left;
}
.item__title {
  font-weight: 400;
  font-size: 20px;
  line-height: 1.4;
  text-transform: uppercase;
  text-decoration: underline;
}
.item__price {
  font-family: 'Lato';
  font-weight: 400;
  font-size: 20px;
  color: rgb(114, 174, 200);
}
@media (max-width: 860px) {
  .price__title {
    h1 {
      font-size: 18px;
    }
  }
  .item__title,
  .item__price {
    font-size: 16px;
  }
}
@media (max-width: 768px) {
  .price__title {
    h1 {
      font-size: 14px;
    }
  }
  .item__title,
  .item__price {
    font-size: 12px;
  }
}
</style>
