import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'index',
      component: () => import('../views/index.vue'),
    },
    //enter
    {
      path: '/enter',
      name: 'enter',
      component: () => import('../views/enter/index.vue'),
      children: [
        //产品
        {
          path: '/enter',
          name: 'HomeProduct',
          component: () => import('../views/enter/HomeProduct.vue')
        },
        //媒体
        {
          path: '/enter/HomeMedia',
          name: 'HomeMedia',
          component: () => import('../views/enter/HomeMedia.vue')
        },
        //政务
        {
          path: '/enter/HomeGover',
          name: 'HomeGover',
          component: () => import('../views/enter/HomeGover.vue')
        },
        //达人 
        {
          path: '/enter/HomeExpert',
          name: 'HomeExpert',
          component: () => import('../views/enter/HomeExpert.vue')
        }
      ]

    },
    //movie
    // {
    //   path: '/movie',
    //   name: 'movie',
    //   component: () => import('../views/movie/index.vue'),
    //   children: []
    // }
  ]
})

export default router
