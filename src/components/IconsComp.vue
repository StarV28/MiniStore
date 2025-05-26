<template>
  <svg
    v-if="iconName"
    :width="size"
    :height="size"
    :style="{ color }"
    :stroke="strokeColor"
    :fill="fillColor"
    aria-hidden="true"
  >
    <use :xlink:href="`#icon-${iconName}`" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [String, Number], default: 24 },
  strokeColor: { type: String, default: 'currentColor' },
  fillColor: { type: String, default: 'currentColor' },
  color: { type: String, default: 'currentColor' },
})

const iconName = computed(() => props.name)
</script>
