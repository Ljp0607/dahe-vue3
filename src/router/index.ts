import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    //首页
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/index.vue'),
      meta: {
        title: '豫视频'
      }
    },
    {
      path: '/carShow',
      name: 'carShow',
      component: () => import('@/views/car/carShow.vue'),
      meta: {
        title: '大河国际车展'
      }
    },
    {
      path: '/carUpload',
      name: 'carUpload',
      component: () => import('@/views/car/carUpload.vue'),
      meta: {
        title: '大河国际车展'
      }
    }, {
      path: '/car',
      name: 'car',
      component: () => import('@/views/car/index.vue'),
      meta: {
        title: '大河国际车展'
      }
    },
    {
      path: '/tool',
      name: 'tool',
      component: () => import('@/views/tool.vue'),
      meta: {
        title: '工具'
      }
    },
    {
      path: '/autoShow',
      name: 'autoShow',
      component: () => import('@/views/car/index.vue'),
      meta: {
        title: '大河收纳月'
      }
    },
    {
      path: '/vote',
      name: 'vote',
      component: () => import('@/views/vote/index.vue'),
      meta: {
        title: '河南新地标'
      }
    },
    {
      path: '/uploading',
      name: 'uploading',
      component: () => import('@/views/vote/uploading.vue'),
      meta: {
        title: '河南新地标'
      }
    },
    // enter 产品入驻页
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
        title: '兴趣召集令'
      }
    },
    // 达人
    {
      path: '/Info',
      name: 'Info',
      component: () => import('@/views/interest/Info.vue'),
      meta: {
        title: '组长招募'
      }
    },
    // 抽奖 
    {
      path: '/Lottery',
      name: 'Lottery',
      component: () => import('@/views/Lottery/index.vue'),
      meta: {
        title: '抽奖'
      }
    },
    {
      path: '/showUpload',
      name: 'showUpload',
      component: () => import('@/views/autoShow/showUpload.vue'),
      meta: {
        title: '上传作品'
      }
    },
    //电影
    {
      path: '/movie',
      name: 'movie',
      component: () => import('@/views/movie/index.vue'),
      meta: {
        title: '领取奖品'
      }
    },
    {
      path: '/invite',
      name: 'invite',
      component: () => import('@/views/movie/invite.vue'),
      meta: {
        title: '邀请好友'
      }
    },
    {
      path: '/Congress',
      name: 'Congress',
      component: () => import('@/views/Congress/index.vue'),
      meta: {
        title: '喜迎二十大'
      }
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('@/views/news/index.vue'),
      meta: {
        title: '大河新闻'
      }
    },
    {
      path: '/heating',
      name: 'heating',
      component: () => import('@/views/heating/index.vue'),
      meta: {
        title: '大河问暖'
      }
    },
    {
      path: '/medicineHelp',
      name: 'medicineHelp',
      component: () => import('@/views/medicineHelp/index.vue'),
      meta: {
        title: '你需药,这里有'
      }
    },
    {
      path: '/uploadingHelp',
      name: 'uploadingHelp',
      component: () => import('@/views/medicineHelp/uploadingHelp.vue'),
      meta: {
        title: '你需药,这里有'
      }
    },
    {
      path: '/HongqiCanal',
      name: 'HongqiCanal',
      component: () => import('@/views/HongqiCanal/index.vue'),
      meta: {
        title: '争做新时代红旗渠建设者'
      }
    },
    {
      path: '/action',
      name: 'action',
      component: () => import('../views/HongqiCanal/action.vue'),
      meta: {
        title: '争做新时代红旗渠建设者'
      }
    }, {
      path: '/share/index',
      name: 'share',
      component: () => import('../views/HongqiCanal/share/index.vue'),
      children: [
        {
          path: '/share/index',
          name: 'shareHome',
          component: () => import('../views/HongqiCanal/share/home.vue'),
        },
        // {
        //   path: '/share/credential',
        //   name: 'credential',
        //   component: () => import('../views/HongqiCanal/share/book.vue'),
        // },
        {
          path: '/share/profile',
          name: 'profile',
          component: () => import('../views/HongqiCanal/share/picker.vue')
        },
      ],
      meta: {
        title: '争做新时代红旗渠建设者'
      }
    },
    {
      path: '/house',
      name: 'house',
      component: () => import('@/views/house/index.vue'),
      meta: {
        title: '中原家居超凡品牌榜'
      }
    },
    {
      path: '/spring',
      name: 'spring',
      component: () => import('@/views/spring/index.vue'),
      meta: {
        title: '新春活动'
      }
    },
    {
      path: '/uploadingSpring',
      name: 'uploadingSpring',
      component: () => import('@/views/spring/uploading.vue'),
      meta: {
        title: '新春活动'
      }
    },
    // {uploading
    //   //   // 找不到路由重定向到404页面
    //   path: "/:pathMatch(.*)",
    //   redirect: { name: "404" }
    // },
  ]
})

export default router
