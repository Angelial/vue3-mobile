<template>
  <nav-bar
    left-text="Terms"
    left-arrow
    fixed
    placeholder
    safe-area-inset-top
    @click-left="onClickLeft"
  />
  <cell-group>
    <cell
      v-for="(item, index) in list"
      :key="index"
      :title="item.name"
      is-link
      :to="item.to"
    />
  </cell-group>
</template>

<script lang="ts" setup>
import { NavBar, Cell, CellGroup } from 'vant'
import { useRouter } from 'vue-router'

const router = useRouter()
const list = [
  {
    name: 'Payment Agreement',
    to: { name: 'Pay', query: { type: 'h5' } }
  },
  {
    name: 'Privacy Policy',
    to: { name: 'Privacy', query: { type: 'h5' } }
  },
  {
    name: 'Terms of Service',
    to: { name: 'Serve', query: { type: 'h5' } }
  }
]

const onClickLeft = () => {
  router.back()
}
</script>
