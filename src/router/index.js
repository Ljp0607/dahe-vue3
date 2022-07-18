import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    //产品

    {
      path: '/',
      name: 'HomeProduct',
      component: () => import('../views/HomeRouter/HomeProduct.vue')
    },
    //媒体
    {
      path: '/HomeMedia',
      name: 'HomeMedia',
      component: () => import('../views/HomeRouter/HomeMedia.vue')
    },
    //政务

    {
      path: '/HomeGover',
      name: 'HomeGover',
      component: () => import('../views/HomeRouter/HomeGover.vue')
    },
    //达人 
    {
      path: '/HomeExpert',
      name: 'HomeExpert',
      component: () => import('../views/HomeRouter/HomeExpert.vue')
    }
  ]
})

export default router
