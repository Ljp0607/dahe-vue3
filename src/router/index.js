import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    //首页
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/office/index.vue'),
      meta: {
        title: '办事处'
      }
    },
    //enter 产品入驻页
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
    // office 豫视频办事处
    {
      path: '/office',
      name: 'office',
      component: () => import('../views/office/index.vue'),
      meta: {
        title: '办事处'
      }
    },
    // interest 兴趣小组召集令
    {
      path: '/interest',
      name: 'index',
      component: () => import('@/views/interest/index.vue'),
      meta: {
        title: '豫视频兴趣小组组长招募'
      }
    },
    // 达人 
    {
      path: '/Info',
      name: 'Info',
      component: () => import('@/views/interest/Info.vue'),
      meta: {
        title: '豫视频兴趣小组组长招募'
      }
    }
    ,
    // 抽奖 
    {
      path: '/Lottery',
      name: 'Lottery',
      component: () => import('@/views/Lottery/index.vue'),
      meta: {
        title: '抽奖'
      }
    },
    //电影
    {
      path: '/movie',
      name: 'movie',
      component: () => import('@/views/movie/index.vue'),
      meta: {
        title: '电影票'
      }
    }

  ]
})

export default router
