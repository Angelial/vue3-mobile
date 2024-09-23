<template>
  <router-view :key="route.fullPath" />
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { onBeforeMount } from 'vue'
const route = useRoute()
const imgs = require('@/assets/images/opening.gif')

onBeforeMount(() => {
  let count = 0
  let image = new Image()
  image.src = imgs
  image.onload = () => {
    count = count + 1
  }
})
</script>
