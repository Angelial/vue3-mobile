import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)',
    component: () => import('../views/404.vue')
  },
  {
    path: '/',
    redirect: '/mall'
  },
  {
    path: '/share',
    name: 'Share',
    meta: {
      isHasUser: false
    },
    component: () => import('../views/Share.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      isHasUser: false
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/privacy',
    name: 'Privacy',
    meta: {
      isHasUser: false
    },
    component: () => import('../views/Privacy.vue')
  },
  {
    path: '/pay',
    name: 'Pay',
    meta: {
      isHasUser: false
    },
    component: () => import('../views/PayAgree.vue')
  },
  {
    path: '/serve',
    name: 'Serve',
    meta: {
      isHasUser: false
    },
    component: () => import('../views/ServeAgree.vue')
  },
  {
    path: '/faq',
    name: 'Faq',
    meta: {
      isHasUser: false
    },
    component: () => import('../views/Faq.vue')
  },
  {
    path: '/feedback',
    name: 'Feedback',
    meta: {
      isHasUser: false
    },
    component: () => import('../views/Feedback.vue')
  },
  {
    path: '/feedbacklist',
    name: 'FeedbackList',
    meta: {
      isHasUser: false
    },
    component: () => import('../views/FeedbackList.vue')
  },
  {
    path: '/offline',
    name: 'Offline',
    meta: {
      isHasUser: false
    },
    component: () => import('../views/credit/OfflineCode.vue')
  },
  {
    path: '/credit',
    name: 'Credit',
    meta: {
      isHasUser: false
    },
    component: () => import('../views/credit/CreditCard.vue')
  },
  {
    path: '/direct',
    name: 'DirectDebit',
    meta: {
      isHasUser: false
    },
    component: () => import('../views/credit/DirectDebit.vue')
  },
  {
    path: '/direct/result/:status',
    name: 'DirectPaymentResult',
    meta: {
      isHasUser: false
    },
    component: () => import('../views/credit/PayResult.vue')
  },
  {
    path: '/result',
    name: 'PayResult',
    meta: {
      isHasUser: false
    },
    component: () => import('../views/PayResult.vue')
  },
  {
    path: '/mojo_login',
    name: 'MojoLogin',
    meta: {
      isHasUser: false
    },
    component: () => import('../views/MojoLogin.vue')
  },
  // 盲盒
  {
    path: '/boxes',
    name: 'BlindBox',
    meta: {
      isHasUser: true
    },
    component: () => import('../views/Boxes/BlindBox.vue')
  },
  {
    path: '/boxes/detail/:id',
    name: 'BoxDetail',
    meta: {
      isHasUser: true
    },
    component: () => import('../views/Boxes/BoxDetail.vue')
  },
  {
    path: '/boxes/pay/:id/:type',
    name: 'BoxPay',
    meta: {
      isHasUser: true,
      isAuth: true
    },
    component: () => import('../views/Boxes/BoxPay.vue')
  },
  {
    path: '/boxes/open/:orderNo/:id',
    name: 'BoxOpen',
    meta: {
      isHasUser: true
    },
    component: () => import('../views/Boxes/OpenBox.vue')
  },
  // 商城
  {
    path: '/mall',
    name: 'Mall',
    meta: {
      isHasUser: true
    },
    component: () => import('../views/Mall/Mall.vue')
  },
  {
    path: '/mall/detail/:id',
    name: 'GoodsDetail',
    meta: {
      isHasUser: true
    },
    component: () => import('../views/Mall/GoodsDetail.vue')
  },
  {
    path: '/mall/pay/:id/:type?/:number?',
    name: 'GoodsPay',
    meta: {
      isHasUser: true,
      isAuth: true
    },
    component: () => import('../views/Mall/GoodsPay.vue')
  },
  {
    path: '/mall/paySuccess/:id',
    name: 'PaySuccess',
    meta: {
      isHasUser: true,
      isAuth: true
    },
    component: () => import('../views/Mall/PaySuccess.vue')
  },
  // 个人中心
  {
    path: '/h5/result',
    name: 'ResultH5pay',
    meta: {
      isHasUser: true
    },
    component: () => import('../views/PayResultH5.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    meta: {
      isHasUser: true,
      isAuth: true
    },
    component: () => import('../views/mine/Mine.vue')
  },
  // 仓库
  {
    path: '/inventory',
    name: 'Inventory',
    meta: {
      isHasUser: false
    },
    component: () => import('../views/mine/Inventory.vue')
  },
  {
    path: '/setting',
    name: 'Setting',
    meta: {
      isHasUser: true,
      isAuth: true
    },
    component: () => import('../views/mine/Setting.vue')
  },
  {
    path: '/address',
    name: 'Address',
    meta: {
      isHasUser: true,
      isAuth: true
    },
    component: () => import('../views/mine/Address.vue')
  },
  {
    path: '/terms',
    name: 'Terms',
    meta: {
      isHasUser: false
    },
    component: () => import('../views/mine/Terms.vue')
  },
  {
    path: '/order/:type',
    name: 'Order',
    meta: {
      isHasUser: true,
      isAuth: true
    },
    component: () => import('../views/mine/Order.vue')
  },
  {
    path: '/order/pay/:id/:boxId?',
    name: 'OrderPay',
    meta: {
      isHasUser: true,
      isAuth: true
    },
    component: () => import('../views/mine/Pay.vue')
  },
  {
    path: '/iframe',
    name: 'Iframe',
    meta: {
      isHasUser: true,
      isAuth: true
    },
    component: () => import('../views/Iframe.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // 用户信息获取
  const token = store.getters['user/tokenVal']
  const userId = store.getters['user/userId']
  if (to.meta.isHasUser && token && !userId) {
    store.dispatch('user/getUser')
  }
  // 路由重置
  const list = ['/#/login?userId', '/#/share?userId=', '#/privacy', '#/serve']
  if (to.fullPath.indexOf(list[0]) > -1) {
    next({ name: 'Login', query: to.query })
    return
  } else if (to.fullPath.indexOf(list[1]) > -1) {
    next({ name: 'Share', query: to.query })
    return
  } else if (to.fullPath.indexOf(list[2]) > -1) {
    next({ name: 'Privacy' })
    return
  } else if (to.fullPath.indexOf(list[3]) > -1) {
    next({ name: 'Serve' })
    return
  } else {
    // 我的页面处理
    if (to.meta.isAuth) {
      if (!token) {
        if (from.fullPath === '/mojo_login' || from.meta.isAuth) {
          next({ name: 'Mall' })
        } else {
          router.push({ name: 'MojoLogin' })
        }
      }
    }

    store.dispatch('user/setConfig').then(() => {
      next()
    })
  }
})
router.afterEach(() => {
  window.scrollTo(0, 0)
})

export default router
