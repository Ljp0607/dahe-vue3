
var browser = {
  versions: (function () {
    var u = navigator.userAgent,
      app = navigator.appVersion
    return {
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
    }
  })(),
  language: (navigator.browserLanguage || navigator.language).toLowerCase(),
}

const u = navigator.userAgent
const isAndroid = browser.versions.android //android终端
const isiOS = browser.versions.ios || browser.versions.iPhone || browser.versions.iPad //ios终端

var ua = navigator.userAgent.toLowerCase()
const isWX = ua.match(/MicroMessenger/i) == 'micromessenger'
/**
 * 创建<a /> 标签并触发点击事件
 * @param {String} param a标签的href值
 */
function _creatA(param) {
  const a = document.createElement('a')
  a.setAttribute('href', param)
  a.click()
}
/**
 * 彩铃
 * 跳转到短视频详情
 * @param {*} data 彩铃数据某个选项的data
 * @returns
 */
function cailingaction(data) {
  if (isAndroid) {
    // alert(window.cailingaction)
    if (window.android.claction) {
      window.android.claction(data)
    } else {
      window.cailingaction.claction(data)
    }
  }
  if (isiOS) {
    // console.log('isiOS')
    data = encodeURIComponent(data)
    // console.log(data)
    window.location.href = '/ios://cailingaction@?' + data
  }
}
/**
 * 新闻详情页广告
 * @param {string} action 1.外链、2.新闻、3.投票、4.报名、5.订阅号、6.社区、7.直播、8.短视频、9.帖子详情页、11.专题、28.视频新闻
 * @param {string} actionType 默认为空， 当为5 是订阅号id， 为6是社区的url
 * @param {string} other
 * @param {string} id
 */
function newsadaction(action, actiontype, other, id) {
  if (isAndroid) {
    window.android.newsadaction(action, actiontype, other, id)
  }
  if (isiOS) {
    if (action == 6) {
      window.location.href = `/ios://community@?${action}**${actiontype}**${actiontype}**${actiontype}`
    } else {
      window.location.href = `/ios://newsadaction@?${action}**${actiontype}**${other}**${id}`
    }
  }
}
/**
 * 新闻详情页
 * @param {*} action 1.微信好友,2.微信朋友圈,3.微博,4.新闻 5.订阅号  6.社区 7.查看更多评论 8.订阅号关注交互 10.专题
 * @param {*} url 默认为空 当为5是是订阅号id,为6时社区的url,
 * @param {*} id
 */
function newsaction(action, url, id) {
  if (isAndroid) {
    window.android.newsaction(action, url, id)
  }
  if (isiOS) {
    if (action == 6) {
      window.location.href = `/ios://community@?${url}**${action}**${action}**${action}`
    } else {
      window.location.href = `/ios://newsaction@?${action}**${url}**${id}`
    }
  }
}

/**
 * 唤端
 * @param {string} openUrl 外链地址
 * @param {string} shareAction 外链地址 分享时取这个地址赋值到分享link上
 * @param {number} isNeedUserId 是否需要userID  0 不需要 1 需要
 * @param {number} isNeedShare 是否需要分享外链  0 不需要 1需要
 *
 * action 保持不变，还是外链地址，新增一个shareAction  也是外链地址。
 * action 最终在客户端会拼接成带userid的链接，而shareAction  在客户端不做任何操作，只是在分享时取这个地址赋值到分享link上去。
 * shareAction： https://news.dahebao.cn/appdownload/index.html?type=41&openUrl=' + openUrl + '#/'
 */
function tryOpenApp(openUrl, shareAction, isNeedUserId = 1, isNeedShare = 1) {
  const openOptions = {
    isNeedUserId: isNeedUserId,
    isNeedShare: isNeedShare,
    action: openUrl + '#/', // 需要注意处理hash
    shareAction: shareAction,
  }
  let SCHEMA_PATH = 'yspscheme://cn.dahelive.live/XDWkWebViewController?data=' + JSON.stringify(openOptions)
  if (isAndroid) {
    SCHEMA_PATH = 'yspscheme://dahe.cn.dahelive/NewsWailianDetailActivity?data=' + JSON.stringify(openOptions)
  }

  if (openUrl) {
    _creatA(SCHEMA_PATH)
  }
}
/**
 * 换端
 * 随意唤醒客户端到随便的地方，如果打开过客户端则到打开过的页面 ，如果没有打开过到首页
 */
function openApp() {
  let openLink = 'yspscheme://dahe.cn.dahelive/IndexActivity'
  if (isiOS) {
    openLink = 'yspscheme://cn.dahelive.live'
  }
  _creatA(openLink)
}

/**
 * 到身边/帮忙  发帖
 * @param {string} selectType 0 身边  2 帮忙
 * @param {string} selectTopic 话题内容(不用拼接#啥的，客户端有一套自己的规则)
 * selectType == 2 帮忙
 * @param {string} relectReporterId 求助记者ID
 * @param {string} selectReporterName 求助记者名字
 */
function creatConversation(selectType, selectTopic, relectReporterId, selectReporterName) {
  const options = {
    selectType: selectType,
    selectTopic: selectTopic,
    relectReporterId: relectReporterId,
    selectReporterName: selectReporterName,
  }

  if (window.android) {
    window.android.sendPosts(JSON.stringify(options))
  }
  let path = '/ios://sendPosts@?data=' + JSON.stringify(options)
  if (isiOS) {
    _creatA(path)
  }
}

/**
 * 积分活动（创造营）
 * @param {Object} data 后端返回值 每一天的对应item
 */
function creatCamp(data) {
  if (isAndroid) {
    if (window.android) {
      window.android.integralactivities(JSON.stringify(data))
    }
  }
  if (isiOS) {
    _creatA('/ios://integralactivities@?data=' + JSON.stringify(data))
  }
}

// type:  1 关闭界面操作  2 分享操作 3分享海报
// shareType:  1 微信 2 朋友圈 3 保存图片
// shareTitle: 分享标题
// shareContent: 分享内容
// shareImg: 分享图片
/**
 * 数字藏品调用原生方法    关闭webview or 分享  (通用方法)
 * @param {string} type 1 关闭界面操作  2 分享操作 3 分享海报
 * @param {string} shareType 1 微信 2 朋友圈 3 保存图片
 * @param {string} shareTitle 分享标题
 * @param {string} shareContent 分享内容
 * @param {string} shareImg 分享图片
 * @param {string} shareLink 分享链接
 */
function closeOrShare({ type, shareTitle, shareType, shareContent, shareImg, shareLink }) {
  const options = {
    type,
    shareTitle,
    shareType,
    shareContent,
    shareImg,
    shareLink,
  }
  if (isAndroid) {
    if (window.android) {
      window.android.generalMethod(options)
    }
  }

  if (isiOS) {
    _creatA('/ios://generalMethod@?data=' + JSON.stringify(options))
  }
}

/**
 * 去原生帖子详情页
 * @param {string} postId 帖子id
 */
function goPosts(postId) {
  if (isAndroid) {
    if (window.android) {
      window.android.postDetails(JSON.stringify(postId))
    }
  }
  if (isiOS) {
    _creatA('/ios://postDetails@?data=' + JSON.stringify(postId))
  }
}
/**
 *  跳转登录页
 *  原生通过抓取方法传回userId
 *  getAppUserId(e) {
      if (this.userId == '') {
        this.userId = e
      }
    },
    window.getAppUserId = this.getAppUserId  把方法暴露给原生 mounted
 */
function goLogin() {
  if (isAndroid) {
    if (window.android) {
      window.android.userLogin()
    }
  }
  if (isiOS) {
    _creatA('/ios://userLogin@?data=')
  }
}

/**
 * 去订阅号主页
 * @param {string} userId 订阅号的id
 */
function goSubscription(userId) {
  if (isAndroid) {
    if (window.android) {
      window.android.subscription(JSON.stringify(userId))
    }
  }

  if (isiOS) {
    _creatA('/ios://subscription@?data=' + JSON.stringify(userId))
  }
}

export {
  cailingaction,
  newsadaction,
  newsaction,
  tryOpenApp,
  openApp,
  creatConversation,
  creatCamp,
  closeOrShare,
  goPosts,
  goLogin,
  goSubscription,
}
