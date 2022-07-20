import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/index.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
    {
      path: '/movie',
      name: 'movie',
      component: () => import('../views/movie/index.vue'),
      children: [
        {
          path: '/movie',
          name: 'index',
          component: () => import('../views/movie/index.vue')
        },
        //达人 
        {
          path: '/movie/invite',
          name: 'invite',
          component: () => import('../views/movie/invite.vue')
        }
      ],
      meta: {
        title: '功能授权'
      }
    },
    //office
    {
      path: '/office',
      name: 'office',
      component: () => import('../views/office/index.vue'),
      meta: {
        title: '办事处'
      }
    }
  ]
})

export default router
