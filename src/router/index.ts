import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    //首页
    // {
    //   path: '/',
    //   name: 'home',
    //   component: () => import('@/views/index.vue'),
    //   meta: {
    //     title: '豫视频'
    //   }
    // },
    // // 车展
    // {
    //   path: '/carShow',
    //   name: 'carShow',
    //   component: () => import('@/views/car/carShow.vue'),
    //   meta: {
    //     title: '大河国际车展'
    //   }
    // },
    // {
    //   path: '/carUpload',
    //   name: 'carUpload',
    //   component: () => import('@/views/car/carUpload.vue'),
    //   meta: {
    //     title: '大河国际车展'
    //   }
    // }, {
    //   path: '/car',
    //   name: 'car',
    //   component: () => import('@/views/car/index.vue'),
    //   meta: {
    //     title: '大河国际车展'
    //   }
    // },
    // // 工具
    // {
    //   path: '/tool',
    //   name: 'tool',
    //   component: () => import('@/views/tool.vue'),
    //   meta: {
    //     title: '工具'
    //   }
    // },
    // // 收纳月
    // {
    //   path: '/autoShow',
    //   name: 'autoShow',
    //   component: () => import('@/views/car/index.vue'),
    //   meta: {
    //     title: '大河收纳月'
    //   }
    // },
    // // 新地标
    // {
    //   path: '/vote',
    //   name: 'vote',
    //   component: () => import('@/views/vote/index.vue'),
    //   meta: {
    //     title: '河南新地标'
    //   }
    // },
    // {
    //   path: '/uploading',
    //   name: 'uploading',
    //   component: () => import('@/views/vote/uploading.vue'),
    //   meta: {
    //     title: '河南新地标'
    //   }
    // },
    // // enter 产品入驻页
    // {
    //   path: '/enter',
    //   name: 'enter',
    //   component: () => import('../views/enter/index.vue'),
    //   children: [
    //     //产品
    //     {
    //       path: '/enter',
    //       name: 'HomeProduct',
    //       component: () => import('../views/enter/HomeProduct.vue')
    //     },
    //     //媒体
    //     {
    //       path: '/enter/HomeMedia',
    //       name: 'HomeMedia',
    //       component: () => import('../views/enter/HomeMedia.vue')
    //     },
    //     //政务
    //     {
    //       path: '/enter/HomeGover',
    //       name: 'HomeGover',
    //       component: () => import('../views/enter/HomeGover.vue')
    //     },
    //     //达人
    //     {
    //       path: '/enter/HomeExpert',
    //       name: 'HomeExpert',
    //       component: () => import('../views/enter/HomeExpert.vue')
    //     }
    //   ]
    // },
    // // office 豫视频办事处
    // {
    //   path: '/office',
    //   name: 'office',
    //   component: () => import('../views/office/index.vue'),
    //   meta: {
    //     title: '办事处'
    //   }
    // },
    // // interest 兴趣小组召集令
    // {
    //   path: '/interest',
    //   name: 'index',
    //   component: () => import('@/views/interest/index.vue'),
    //   meta: {
    //     title: '兴趣召集令'
    //   }
    // },
    // // 达人
    // {
    //   path: '/Info',
    //   name: 'Info',
    //   component: () => import('@/views/interest/Info.vue'),
    //   meta: {
    //     title: '组长招募'
    //   }
    // },
    // 抽奖 
    {
      path: '/Lottery',
      name: 'Lottery',
      component: () => import('@/views/Lottery/index.vue'),
      meta: {
        title: '抽奖'
      }
    },
    // {
    //   path: '/showUpload',
    //   name: 'showUpload',
    //   component: () => import('@/views/autoShow/showUpload.vue'),
    //   meta: {
    //     title: '上传作品'
    //   }
    // },
    // //电影
    // {
    //   path: '/movie',
    //   name: 'movie',
    //   component: () => import('@/views/movie/index.vue'),
    //   meta: {
    //     title: '领取奖品'
    //   }
    // },
    // {
    //   path: '/invite',
    //   name: 'invite',
    //   component: () => import('@/views/movie/invite.vue'),
    //   meta: {
    //     title: '邀请好友'
    //   }
    // },
    // // 二十大
    // {
    //   path: '/Congress',
    //   name: 'Congress',
    //   component: () => import('@/views/Congress/index.vue'),
    //   meta: {
    //     title: '喜迎二十大'
    //   }
    // },
    // // 新闻页
    // {
    //   path: '/news',
    //   name: 'news',
    //   component: () => import('@/views/news/index.vue'),
    //   meta: {
    //     title: '大河新闻'
    //   }
    // },
    // // 大河温暖
    // {
    //   path: '/heating',
    //   name: 'heating',
    //   component: () => import('@/views/heating/index.vue'),
    //   meta: {
    //     title: '大河问暖'
    //   }
    // },
    // {
    //   path: '/medicineHelp',
    //   name: 'medicineHelp',
    //   component: () => import('@/views/medicineHelp/index.vue'),
    //   meta: {
    //     title: '你需药,这里有'
    //   }
    // },
    // // 送药
    // {
    //   path: '/uploadingHelp',
    //   name: 'uploadingHelp',
    //   component: () => import('@/views/medicineHelp/uploadingHelp.vue'),
    //   meta: {
    //     title: '你需药,这里有'
    //   }
    // },
    // // 红旗渠
    // {
    //   path: '/HongqiCanal',
    //   name: 'construct',
    //   component: () => import('@/views/HongqiCanal/construct.vue'),
    //   meta: {
    //     title: '信不信?咱们用锤子砸出一条天河!'
    //   },
    //   children: [
    //     {
    //       path: '/HongqiCanal',
    //       name: 'HongqiCanal',
    //       component: () => import('@/views/HongqiCanal/index.vue'),
    //       meta: {
    //         title: '信不信?咱们用锤子砸出一条天河!'
    //       }
    //     },
    //     {
    //       path: '/action',
    //       name: 'action',
    //       component: () => import('../views/HongqiCanal/action.vue'),
    //       meta: {
    //         title: '信不信?咱们用锤子砸出一条天河!'
    //       }
    //     },
    //     {
    //       path: '/share/index',
    //       name: 'share',
    //       component: () => import('../views/HongqiCanal/share/index.vue'),
    //       meta: {
    //         title: '信不信?咱们用锤子砸出一条天河!'
    //       }
    //     },
    //   ]
    // },
    // // 家居榜
    // {
    //   path: '/house',
    //   name: 'house',
    //   component: () => import('@/views/house/index.vue'),
    //   meta: {
    //     title: '中原家居超凡品牌榜'
    //   }
    // },
    // // 新春活动
    // {
    //   path: '/spring',
    //   name: 'spring',
    //   component: () => import('@/views/spring/index.vue'),
    //   meta: {
    //     title: '新春活动'
    //   }
    // },
    // {
    //   path: '/uploadingSpring',
    //   name: 'uploadingSpring',
    //   component: () => import('@/views/spring/uploading.vue'),
    //   meta: {
    //     title: '新春活动'
    //   }
    // },
    // // 阅读推荐官
    // {
    //   path: '/read',
    //   name: 'read',
    //   // component: () => import('@/views/read/index.vue'),
    //   redirect: { name: 'readIndex' },
    //   meta: {
    //     title: '我是阅读推荐官'
    //   },
    //   children: [
    //     {
    //       path: '/read/index',
    //       name: 'readIndex',
    //       component: () => import('@/views/read/index.vue'),
    //       meta: {
    //         title: '我是阅读推荐官'
    //       }
    //     },
    //     {
    //       path: '/read/video',
    //       name: 'readVideo',
    //       component: () => import('@/views/read/components/video.vue'),
    //       meta: {
    //         title: '我是阅读推荐官'
    //       }
    //     },
    //     {
    //       path: '/read/upload',
    //       name: 'readUpload',
    //       component: () => import('@/views/read/components/upload.vue'),
    //       meta: {
    //         title: '我是阅读推荐官'
    //       }
    //     },],

    // },
    // // 阅读推荐官-洛阳新安县
    // {
    //   path: '/readBook',
    //   name: 'readBook',
    //   // component: () => import('@/views/read/index.vue'),
    //   redirect: { name: 'readBookIndex' },
    //   meta: {
    //     title: '我是阅读推荐官'
    //   },
    //   children: [
    //     {
    //       path: '/readBook/index',
    //       name: 'readBookIndex',
    //       component: () => import('@/views/readBook/index.vue'),
    //       meta: {
    //         title: '我是阅读推荐官'
    //       }
    //     },
    //     {
    //       path: '/readBook/video',
    //       name: 'readBookVideo',
    //       component: () => import('@/views/readBook/components/video.vue'),
    //       meta: {
    //         title: '我是阅读推荐官'
    //       }
    //     },
    //     {
    //       path: '/readBook/upload',
    //       name: 'readBookUpload',
    //       component: () => import('@/views/readBook/components/upload.vue'),
    //       meta: {
    //         title: '我是阅读推荐官'
    //       }
    //     },],

    // },
  ]
})

export default router
