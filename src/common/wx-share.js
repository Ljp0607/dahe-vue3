import jWeixin from "weixin-js-sdk";
function wxShareInit(shareData) {
  if (!shareData) return;
  let debug = false;
  let wx = jWeixin;
  console.log(jWeixin)
  wx.config({
    debug: debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: shareData.appid, // 必填，公众号的唯一标识
    timestamp: shareData.timestamp, // 必填，生成签名的时间戳
    nonceStr: shareData.nonceStr, // 必填，生成签名的随机串
    signature: shareData.signature, // 必填，签名，见附录1
    jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });
  wx.ready(function () {
    console.log("ready");
    console.log("wx ready ok");
    wx.checkJsApi({
      jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
      success: function (res) {
        console.log("checkJsApi success : " + res);
      },
    });
    //自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
    wx.updateAppMessageShareData({
      title: shareData.title, // 分享标题
      desc: shareData.description, // 分享描述
      link: shareData.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: shareData.img, // 分享图标
      success: function () {
        console.log("----- 分享给朋友成功-----------");
      },
      cancel: function () {
        console.log("----- 分享给朋友取消 ： ");
      },
    });
    // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
    wx.updateTimelineShareData({
      title: shareData.title, // 分享标题
      link: shareData.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: shareData.img, // 分享图标
      success: function () {
        console.log("分享到朋友圈成功");
      },
      cancel: function () { },
    });
  });

  wx.error(function (res) {
    console.error("wx error:", res);
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
  });
}

export default wxShareInit;
