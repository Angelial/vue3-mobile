<template>
  <div class="box"></div>
  <div class="footer-bar">
    <tabbar
      route
      v-model="active"
      placeholder
      :fixed="false"
      active-color="#000000"
      inactive-color="#000000"
    >
      <template v-for="(tab, index) in tobias" :key="index">
        <tabbar-item
          v-if="
            ((tab.name === 'Boxes' || tab.name === 'Inventory') &&
              h5_box_list === 1) ||
            (tab.name !== 'Boxes' && tab.name !== 'Inventory')
          "
          replace
          :to="tab.path"
        >
          <span>{{ tab.name }}</span>
          <template #icon="props">
            <img
              class="tab-icon"
              :src="props.active ? tab.icon.active : tab.icon.inactive"
            />
          </template>
        </tabbar-item>
      </template>
    </tabbar>
    <AppInfo />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Tabbar, TabbarItem } from 'vant'
import { useStore } from 'vuex'
import AppInfo from '@/components/AppInfo.vue'

const store = useStore()

const h5_box_list = computed(() => {
  return Number(store.state.user.sysConfig.h5_box_list)
})

const active = ref(0)
const tobias = [
  {
    path: '/boxes',
    name: 'Boxes',
    icon: {
      active: require('@/assets/images/boxes-fill.png'),
      inactive: require('@/assets/images/boxes.png')
    }
  },
  {
    path: '/mall',
    name: 'Mall',
    icon: {
      active: require('@/assets/images/mall-fill.png'),
      inactive: require('@/assets/images/mall.png')
    }
  },
  // {
  //   path: '/inventory',
  //   name: 'Inventory',
  //   icon: {
  //     active: require('@/assets/images/inventory-fill.png'),
  //     inactive: require('@/assets/images/inventory.png')
  //   }
  // },
  {
    path: '/mine',
    name: 'Me',
    icon: {
      active: require('@/assets/images/mine-fill.png'),
      inactive: require('@/assets/images/mine.png')
    }
  }
]
</script>

<style lang="less" scoped>
.tab-icon {
  width: 30px;
  height: 30px;
}
.footer-bar {
  position: fixed;
  bottom: 0;
  left: 50%;
  width: 100%;
  max-width: 750PX;
  height: 100px;
  background-color: #fff;
  transform: translateX(-50%);
}
.box {
  position: relative;
  bottom: 0;
  width: 100%;
  height: 100px;
}
</style>
