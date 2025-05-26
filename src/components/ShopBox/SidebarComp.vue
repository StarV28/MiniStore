<template>
  <div class="sidebar" v-if="!searchStore.isActive">
    <div class="sidebar__category">
      <h3>{{ $t('shopPage.categories') }}</h3>
      <div class="check-box">
        <ul class="check-box__list">
          <li :class="['check-box__item', { active: isAllActive }]" @click="clearCategories">
            All
          </li>
          <li
            class="check-box__item"
            v-for="category in category"
            :key="category.id_category"
            @click="toggleCategory(category)"
            :class="[{ active: isSelected(category), disabled: isAllActive }]"
          >
            {{ category.title }}
          </li>
        </ul>
      </div>
    </div>
    <div class="sidebar__brands">
      <h3>{{ $t('shopPage.brands') }}</h3>
      <div class="check-box">
        <ul class="check-box__list">
          <li
            class="check-box__item"
            v-for="brand in brand"
            :key="brand.id_brand"
            @click="toggleCategory(brand)"
            :class="[{ active: isSelected(brand) }]"
          >
            {{ brand.title }}
          </li>
        </ul>
      </div>
    </div>
    <div class="sidebar__price">
      <h3>{{ $t('shopPage.filter') }}</h3>
      <div class="box-price">
        <span>{{ range[0] }} €</span>
        <v-range-slider
          v-model="range"
          :min="min"
          :max="max"
          :step="10"
          strict
          thumb-label
          @mouseup="onPriceChange"
        ></v-range-slider>
        <span>{{ range[1] }} €</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useCategoryStore } from '@/stores/categoryStore'
import { useBrandsStore } from '@/stores/brandsStore'
import { useSearchStore } from '@/stores/searchStore'
//========================================================================================================================================================

const min = 0
const max = 2000
const defaultRange = [min, max]
const range = ref([min, max])
const filterPrice = ref({
  minPrice: min,
  maxPrice: max,
})
const onPriceChange = () => {
  isAllActive.value = false
  filterPrice.value = {
    minPrice: range.value[0],
    maxPrice: range.value[1],
  }
}
//========================================================================================================================================================
const categoryStore = useCategoryStore()
const brandsStore = useBrandsStore()
const searchStore = useSearchStore()

const category = ref([])
const brand = ref([])
const error = ref(null)
//============Category============================================================================================================================================
const selectedItems = ref([])
const categories = async () => {
  try {
    const response = await categoryStore.getItems('category')

    if (response?.data?.category) {
      category.value = response.data.category
    } else {
      error.value = categoryStore.error.value || 'No category data found'
    }
  } catch (err) {
    console.error(err)
    error.value = err.response?.data?.error || err.message || "Didn't manage to get categories"
  }
}

const getIdKey = (item) => {
  if ('id_category' in item) return 'id_category'
  if ('id_brand' in item) return 'id_brand'
  return 'id'
}

const toggleCategory = (item) => {
  const key = getIdKey(item)
  const index = selectedItems.value.findIndex((g) => g[key] === item[key])
  if (index === -1) {
    selectedItems.value.push(item)
  } else {
    selectedItems.value.splice(index, 1)
  }
  if (selectedItems.value.length > 0) {
    isAllActive.value = false
  }
}

const isSelected = (item) => {
  const key = getIdKey(item)
  return selectedItems.value.some((c) => c[key] === item[key])
}

const isAllActive = ref(true)
const clearCategories = () => {
  if (isAllActive.value) {
    isAllActive.value = false
  } else {
    isAllActive.value = true
    selectedItems.value = []
    range.value = [...defaultRange]
  }
}
//=====Emit Data========make Filter===========================================================================================================================================
const filterParams = computed(() => {
  if (isAllActive.value) {
    return {}
  }
  const categoryIds = selectedItems.value
    .filter((item) => 'id_category' in item)
    .map((item) => item.id_category)

  const brandIds = selectedItems.value
    .filter((item) => 'id_brand' in item)
    .map((item) => item.id_brand)

  return {
    ...(categoryIds.length ? { category: categoryIds } : {}),
    ...(brandIds.length ? { brand: brandIds } : {}),
    ...filterPrice.value,
  }
})

const emit = defineEmits(['update:filter'])

watch(
  filterParams,
  (newVal) => {
    emit('update:filter', newVal)
  },
  { deep: true },
)

//==========Brands==============================================================================================================================================
const brands = async () => {
  try {
    const response = await brandsStore.getItems('brand')

    if (response?.data?.brands) {
      brand.value = response.data.brands
    } else {
      error.value = brandsStore.error.value || 'No brands data found'
    }
  } catch (err) {
    console.error(err)
    error.value = err.response?.data?.error || err.message || "Didn't manage to get brands"
  }
}

//========================================================================================================================================================

onMounted(() => {
  categories()
  brands()
})
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 40px;
  width: 290px;

  h3 {
    font-weight: 400;
    font-size: 20px;
    line-height: 2.5;
    letter-spacing: 6%;
    text-transform: uppercase;
  }
}
.sidebar__category {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.sidebar__price {
  width: 100%;
}
.check-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.check-box__list {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 8px;
  list-style: none;
  padding-left: 10px;
}
.check-box__item {
  font-family: 'Lato';
  font-weight: 400;
  font-size: 16px;
  line-height: 1.4;
  letter-spacing: 3%;
  text-transform: capitalize;
  cursor: pointer;
}
.active {
  color: #72aec8;
  font-weight: 900;
}
.disabled {
  cursor: none;
  color: #999;
}
.box-price {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  span {
    font-family: 'Lato';
    font-weight: 400;
    font-size: 16px;
    line-height: 1.1;
    letter-spacing: 3%;
    text-transform: capitalize;
  }
}
.v-input {
  max-width: 250px;
  padding: 0 10px;
}
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    gap: 15px;
    h3 {
      font-size: 16px;
    }
  }
  .sidebar__category,
  .sidebar__brands {
    width: 100%;
  }
  .check-box__list {
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
  }
  .box-price {
    flex-direction: row;
  }
  .check-box__item {
    font-size: 14px;
  }
  .active {
    color: #72aec8;
    font-weight: 900;
  }
  .disabled {
    cursor: none;
    color: #999;
  }
  .box-price {
    span {
      font-size: 14px;
    }
  }
}
</style>
