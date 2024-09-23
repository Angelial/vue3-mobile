<template>
  <Empty image-size="170" description="No data">
    <template #image>
      <img width="170" src="@/assets/images/is-empty.png" />
    </template>
  </Empty>
</template>

<script lang="ts" setup>
import { Empty } from 'vant'
</script>
