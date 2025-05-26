<template>
  <v-dialog v-model="localModelValue" max-width="500">
    <div class="search">
      <form @submit="onSubmit" class="search__form">
        <label>
          <Field name="search" type="text" class="search__inp" placeholder="Type and press enter" />
          <ErrorMessage name="search" class="error" />
        </label>
        <button type="submit" :disabled="!meta.valid">{{ $t('menu.search.btnSearch') }}</button>
        <div class="search__title">
          <ul class="search__list">
            <li
              v-for="cat in category"
              :key="cat.id_category"
              @click="choiceCategory(cat.id_category)"
              :class="['search__item', { active: isChoiceCategory.includes(cat.id_category) }]"
            >
              {{ cat.title }}
              <span>/</span>
            </li>
          </ul>
        </div>
      </form>
    </div>
  </v-dialog>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue'
const searchDialog = inject('searchDialog')
const localModelValue = ref(searchDialog.value)
//========Validate search================================================================================================================================================
import { Field, ErrorMessage, useForm } from 'vee-validate'
import { searchSchema } from '@/validate/searchValid'
import { useCategoryStore } from '@/stores/categoryStore'
import { sanitizeInput } from '@/util/sanitizeFunc'
import { useSearchStore } from '@/stores/searchStore'
import { useRouter } from 'vue-router'

//========================================================================================================================================================
const categoryStore = useCategoryStore()
const searchStore = useSearchStore()
const error = ref(null)
const category = ref([])
const router = useRouter()
//========================================================================================================================================================
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
//========================================================================================================================================================
const isChoiceCategory = ref([])

const choiceCategory = (id) => {
  if (isChoiceCategory.value.includes(id)) {
    isChoiceCategory.value = isChoiceCategory.value.filter((c) => c !== id)
  } else {
    isChoiceCategory.value.push(id)
  }
}

//========================================================================================================================================================

const { handleSubmit, resetForm, meta } = useForm({
  validationSchema: searchSchema,
})
const onSubmit = handleSubmit(async (value) => {
  try {
    const sanitizedValues = {}
    for (const key in value) {
      const val = value[key]
      sanitizedValues[key] = typeof val === 'string' ? sanitizeInput(val) : val
    }
    sanitizedValues.id_category = isChoiceCategory.value

    const response = await searchStore.getByIdItemS('search', sanitizedValues)
    if (response.data.length > 0) {
      resetForm()
      searchStore.resSearch = response.data
      searchStore.isActive = true
      router.push({ name: 'shop' })
    } else {
      resetForm()
      alert('No matches found')
    }
    isChoiceCategory.value = []
    searchDialog.value = false
  } catch (error) {
    console.error('Error search', error)
  }
})
//========================================================================================================================================================
onMounted(() => {
  categories()
})
</script>

<style lang="scss" scoped>
ƒ .error {
  font-size: 14px;
  font-style: italic;
  color: red;
}
.v-overlay--scroll-blocked {
  background-color: rgba(114, 174, 200, 0.705);
}
.search {
  background-color: #fff;
  padding: 15px;
}
.search__form {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  button {
    width: 100%;
    padding: 5px 15px;
    background-color: black;
    font-size: 14px;
    font-family: 'Lato';
    font-weight: 500;
    color: #fff;
    transition: all 0.3s ease;
    &:hover {
      transition: all 0.3s ease;
      transform: scale(1.03);
      box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.2);
    }
  }
  label {
    width: 100%;
  }
}
.search__inp {
  padding: 20px;
  width: 100%;
  background-color: rgba(128, 128, 128, 0.1);
  font-size: 14px;
  font-weight: 500;
  color: rgb(39, 39, 39);
  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(114, 174, 200, 0.5);
    border: 1px solid rgb(114, 174, 200);
  }
}
.search__titles {
  width: 100%;
  padding: 30px;
}
.search__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  list-style: none;
  gap: 7px;
}
.search__item {
  font-size: 18px;
  font-family: 'Lato';
  font-weight: 500;
  text-transform: capitalize;
  color: rgb(39, 39, 39);
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: rgb(114, 174, 200);
  }
}
.active {
  color: rgb(114, 174, 200);
  font-weight: 700;
}
</style>
