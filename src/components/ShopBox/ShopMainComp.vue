<template>
  <div>
    <div class="page">
      <div class="page__main-box">
        <p>
          {{ $t('pagination.showing') }} {{ startItem }} - {{ endItem }} {{ $t('pagination.of') }}
          {{ totalItems }} {{ $t('pagination.results') }}
        </p>
        <div class="page__cards">
          <template v-if="isSearchMode">
            <card-prod-comp
              v-for="product in searchResults"
              :key="product.id_product"
              :product="product"
            />
            <p v-if="searchResults.length === 0">Нет результатов</p>
          </template>
          <template v-else>
            <card-prod-comp
              v-for="product in products"
              :key="product.id_product"
              :product="product"
            />
          </template>
        </div>
      </div>
      <div class="page__sidebar">
        <sidebar-comp class="sidebar" v-model:filter="filterParams" />
        <div class="sidebar" v-if="isSearchMode">
          <h3>Result search</h3>
          <button type="button" class="sidebar__btn" @click="clearSearch">
            <span>Clear Search</span>
          </button>
        </div>
      </div>
    </div>
    <div class="pagination" v-if="!isSearchMode">
      <button
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
        class="pagination__btn"
      >
        <icons-comp name="arrow-big" :size="size" color="#72aec8" class="pagination__arrow-left" />
      </button>
      <span class="pagination__number"
        >{{ $t('pagination.page') }} {{ currentPage }} {{ $t('pagination.of') }}
        {{ totalPages }}</span
      >
      <button
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
        class="pagination__btn"
      >
        <icons-comp name="arrow-big" :size="size" color="#72aec8" class="pagination__arrow-right" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import CardProdComp from './CardProdComp.vue'
import SidebarComp from './SidebarComp.vue'
import { useProductsStore } from '@/stores/productStore'
import { useRoute, useRouter } from 'vue-router'
import { useSearchStore } from '../../stores/searchStore'
import { useWidthScreen } from '../../CompositionFunk/dynamicScreenWidth'

//========================================================================================================================================================

const prodStore = useProductsStore()
const searchStore = useSearchStore()
const route = useRoute()
const router = useRouter()
const products = ref([])
const error = ref(null)
const currentPage = ref(1)
const itemsPerPage = ref(6)
const totalItems = ref(0)
const { windowWidth } = useWidthScreen()
const size = ref()

const filterParams = ref({})
watch(filterParams, () => {
  currentPage.value = 1
  allProducts()
})
//========================================================================================================================================================
const isSearchMode = computed(() => searchStore.isActive)
const searchResults = computed(() => searchStore.resSearch)

const clearSearch = () => {
  searchStore.resSearch = []
  searchStore.isActive = false
  allProducts()
}

//===========pagination=============================================================================================================================================
const totalPages = computed(() => {
  return Math.ceil(totalItems.value / itemsPerPage.value)
})

const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  allProducts()
}

//========================================================================================================================================================

const startItem = computed(() => {
  return (currentPage.value - 1) * itemsPerPage.value + 1
})
//========================================================================================================================================================

const endItem = computed(() => {
  const end = currentPage.value * itemsPerPage.value
  return end > totalItems.value ? totalItems.value : end
})
//========================================================================================================================================================

const allProducts = async () => {
  if (isSearchMode.value) return
  try {
    const response = await prodStore.getProductsPagination('product', {
      ...filterParams.value,
      page: currentPage.value,
      limit: itemsPerPage.value,
    })
    products.value = response.data.products.products
    totalItems.value = response.data.products.total
  } catch (err) {
    console.error(err)
    error.value = err.response?.data?.error || err.message || "Didn't manage to get products"
  }
}
watch(currentPage, () => {
  allProducts()
})
//=========Watch query===============================================================================================================================================
watch(
  () => route.query,
  (query) => {
    if (query.page) currentPage.value = parseInt(query.page)

    if (query.category) {
      filterParams.value.category = Array.isArray(query.category)
        ? query.category.map(Number)
        : [Number(query.category)]
    } else {
      delete filterParams.value.category
    }

    if (query.brand) {
      filterParams.value.brand = Array.isArray(query.brand)
        ? query.brand.map(Number)
        : [Number(query.brand)]
    } else {
      delete filterParams.value.brand
    }

    if (query.minPrice) {
      filterParams.value.minPrice = Number(query.minPrice)
    } else {
      delete filterParams.value.minPrice
    }

    if (query.maxPrice) {
      filterParams.value.maxPrice = Number(query.maxPrice)
    } else {
      delete filterParams.value.maxPrice
    }

    allProducts()
  },
  { immediate: true },
)
//========================================================================================================================================================

watch(
  [filterParams, currentPage],
  () => {
    const query = {
      ...(filterParams.value.category && { category: filterParams.value.category }),
      ...(filterParams.value.brand && { brand: filterParams.value.brand }),
      ...(filterParams.value.minPrice && { minPrice: filterParams.value.minPrice }),
      ...(filterParams.value.maxPrice && { maxPrice: filterParams.value.maxPrice }),
      page: currentPage.value,
    }

    router.replace({ query })
  },
  { deep: true },
)
//========================================================================================================================================================

watch(windowWidth, (newWidth) => {
  if (newWidth < 768) {
    size.value = 25
  } else {
    size.value = 45
  }
})

//========================================================================================================================================================

onMounted(async () => {
  allProducts()
})
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  gap: 40px;
}
.page__sidebar {
  display: flex;
  flex-direction: column;
  align-items: start;
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
.sidebar__btn {
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
.page__main-box {
  width: 76%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  p {
    font-family: 'Lato';
    font-weight: 300;
    font-size: 16px;
    letter-spacing: 3%;
  }
}
.page__cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
  grid-template-rows: auto;
  row-gap: 40px;
  column-gap: 20px;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    row-gap: 20px;
    margin-bottom: 30px;
  }
}
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
}
.pagination__arrow-right {
  transform: rotate(180deg);
}
.pagination__btn:disabled {
  opacity: 0.3;
}
.pagination__number {
  font-weight: 400;
  font-size: 20px;
  line-height: 2.9;
  letter-spacing: 6%;
  color: rgb(114, 174, 200);
}
@media (max-width: 768px) {
  .page {
    flex-direction: column;
    gap: 0;
  }
  .page__main-box {
    width: 100%;
  }
  .page__cards {
    width: 100%;
  }
  .sidebar {
    width: 100%;
  }
  .sidebar__btn {
    width: 100%;
    padding: 8px 20px;
  }
  .pagination__number {
    font-size: 16px;
    line-height: 1.5;
  }
}
</style>
