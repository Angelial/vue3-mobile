<template>
  <HeaderBar :isRight="false" />
  <section class="inventory">
    <GoApp />
  </section>
  <FooterBar />
</template>

<script lang="ts" setup>
import HeaderBar from '@/components/HeaderBar.vue'
import GoApp from '@/components/GoApp.vue'
import FooterBar from '@/components/FooterBar.vue'
</script>

<style lang="less" scoped>
.inventory {
  padding-top: 100px;
}
</style>
