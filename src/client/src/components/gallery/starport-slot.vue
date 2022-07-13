<template>
  <Starport
    :class="classList"
    :port="key"
    :key="key"
    :duration="duration"
  >
    <slot />
  </Starport>
</template>

<script setup lang="ts">
import { Starport } from "vue-starport"
import { computed } from 'vue'

const { type, index, duration } = defineProps<{
  type: string,
  index: number,
  duration: number
}>()
const key = computed(() => `${type}-${index}`)
const classList = computed(() => `${key.value} gallery-${type}`)

</script>
