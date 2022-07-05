<template>
  <div
    class="list-grid-toggle"
    :class="{ 'icon-grid': isGridFlag }"
    @click="switchBar"
  >
    <div class="icon">
      <div class="icon-bar"></div>
      <div class="icon-bar"></div>
      <div class="icon-bar"></div>
    </div>
  </div>  
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'change', isGridFlag: boolean): void
}>()

const isGridFlag = ref(true)
const switchBar = () => {
  isGridFlag.value = !isGridFlag.value
  emit('change', isGridFlag.value)
}
</script>

<style scoped lang="stylus">
.list-grid-toggle
  width: 40px
  height: 40px
  padding: 10px
  background: shade(#16a085, 8%)
  color: #fff
  cursor: pointer
  font-size: 12px
  font-weight: 200
  letter-spacing: 3px
  text-align: center
  text-transform: uppercase
  transition: all 0.15s ease
  user-select: none
  &:hover
    padding: 15px
    background: shade(#16a085, 10%)
.icon
  width: 40px
  margin-bottom: 10px
.icon-bar
  position: relative
  width: 40px
  height: 10px
  margin: 0 auto 5px auto
  background: #ecf0f1
  box-shadow: 2px 2px 4px shade(#16a085, 20%)
  transition: all 0.15s ease
  &:last-child
    margin-bottom: 0
  &:before,
  &:after
    position: absolute
    display: block
    width: 10px
    height: 10px
    background: #ecf0f1
    box-shadow: 2px 2px 4px (shade(#16a085, 20%))
    content: ''
    opacity: 0
    transition: all 0.15s ease
  &:before
    left: -15px
  &:after
    right: -15px
.icon-grid
  .icon-bar
    width: 10px
    &:before,
    &:after
      opacity: 1
    &:before
      left: 0
      transform: translateX(-15px)
    &:after
      right: 0
      transform: translateX(15px)
</style>