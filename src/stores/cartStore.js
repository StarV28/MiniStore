import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { toRaw } from 'vue'
import { useHandlerItem } from './handlerItem'
//========================================================================================================================================================

const LOCAL_CART_KEY = 'cart'
const CART_EXPIRY_MS = 24 * 60 * 60 * 1000
const handlerItem = useHandlerItem()
const user = computed(() => JSON.parse(localStorage.getItem('user')))
const products = ref([])
//========================================================================================================================================================

export const useCartStore = defineStore('cart', () => {
  const cart = ref([])

  const saveToLocal = () => {
    const data = {
      timestamp: Date.now(),
      items: toRaw(cart.value),
    }
    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(data))
  }
  //-------------------------------------------------//
  const loadFromLocal = () => {
    try {
      const data = JSON.parse(localStorage.getItem(LOCAL_CART_KEY))
      if (!data || !Array.isArray(data.items)) return []

      if (Date.now() - data.timestamp > CART_EXPIRY_MS) {
        localStorage.removeItem(LOCAL_CART_KEY)
        return []
      }

      return data.items
    } catch {
      return []
    }
  }
  //-------------------------------------------------//
  const productsInCartDetails = async (cartItems) => {
    const promises = cartItems.map((item) => handlerItem.getByIdItem('product', item.id_product))
    const productResponses = await Promise.all(promises)
    return productResponses.map((res) => res.data)
  }
  //-------------------------------------------------//

  const initCart = async () => {
    if (!user.value) {
      cart.value = loadFromLocal()
    } else {
      cart.value = await syncWithBackendOnLogin()
    }
    const detailsProd = await productsInCartDetails(cart.value)
    products.value = detailsProd
  }
  //-------------------------------------------------//

  const addToCartItem = async (item) => {
    if (!item.id_product) return

    const exists = cart.value.some((p) => p.id_product === item.id_product)
    if (exists) return

    cart.value.push(item)

    if (!user.value) {
      saveToLocal()
    } else {
      const data = [{ id_user: user.value.id }, item]
      await handlerItem.create('cart/create', data)
    }
  }

  //-------------------------------------------------//

  const deleteItemFromCart = async (id_product) => {
    cart.value = cart.value.filter((item) => item.id_product !== id_product)
    if (!user.value) {
      saveToLocal()
    } else {
      await handlerItem.deleteByID('cart/delete', id_product)
    }
  }
  //-------------------------------------------------//

  const syncWithBackendOnLogin = async () => {
    if (!user.value) return
    const local = loadFromLocal()
    const backend = await handlerItem.getByIdItem('cart', user.value.id)
    if (!backend.data.length && !local.length) return []
    const merged = [
      ...backend.data,
      ...local.filter(
        (localItem) => !backend.data.some((item) => item.id_product === localItem.id_product),
      ),
    ]
    const userId = { id_user: user.value.id }

    const mergedAll = [...merged, userId]

    await handlerItem.create('cart/create', mergedAll)
    localStorage.removeItem(LOCAL_CART_KEY)
    return (cart.value = merged)
  }
  //-------------------------------------------------//

  const clearCart = async (id) => {
    cart.value = []
    await handlerItem.deleteByID('cart/delete-cart', id)
    localStorage.removeItem(LOCAL_CART_KEY)
  }
  //-------------------------------------------------//

  const isEmpty = computed(() => cart.value.length === 0)
  //-------------------------------------------------//

  const cartCounter = computed(() => cart.value.length)
  //-------------------------------------------------//

  return {
    cart,
    user,
    isEmpty,
    products,
    cartCounter,
    initCart,
    addToCartItem,
    deleteItemFromCart,
    syncWithBackendOnLogin,
    clearCart,
  }
})
