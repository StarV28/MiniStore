<template>
  <div class="language">
    <div class="language__select" @click="toggleDropdown">
      <icons-comp :name="selected.icon" />
      <span class="language__text">{{ selected.label }}</span>
      <icons-comp name="down-chevron" size="14" />
    </div>

    <div class="language__dropdown" v-if="isOpen">
      <div
        class="language__option"
        v-for="(option, index) in options"
        :key="index"
        @click="selectLanguage(option)"
      >
        <icons-comp :name="option.icon" />
        <span class="language__text">{{ option.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import { useLocales } from '@/modulesHelper/i18n'
import { useLanguageStore } from '@/stores/languageStore'

const { setLocale, checkLocale } = useLocales()
const langStore = useLanguageStore()

const options = ref([
  { value: 'en', label: 'En', icon: 'uk-flag' },
  { value: 'de', label: 'De', icon: 'de-flag' },
  { value: 'ua', label: 'Ua', icon: 'ua-flag' },
])

const selected = ref(options.value[0])
const isOpen = ref(false)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectLanguage = (option) => {
  setLocale(option.value)
  langStore.setLanguage(option.value)
  selected.value = option
  isOpen.value = false
}

onMounted(() => {
  checkLocale()
  const lastLocale = localStorage.getItem('lastLocale')
  if (lastLocale) {
    const found = options.value.find((opt) => opt.value === lastLocale)
    if (found) selected.value = found
  }
})
</script>

<style lang="scss" scoped>
.language {
  position: relative;
  width: 100px;
}

.language__select {
  display: flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;
  padding: 8px;
}

.language__dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid #ccc;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  z-index: 1000;
}

.language__option {
  padding: 8px;
  display: flex;
  align-items: center;
  background-color: #fff;
  color: rgb(39, 39, 39);
  cursor: pointer;
  &:hover {
    color: rgb(114, 174, 200);
  }
}

.language__text {
  margin-left: 10px;
}
</style>
