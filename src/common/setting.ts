function setting() {
    const ua: any = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
        //微信浏览器
    } else {
        return false;
        //其他的浏览器
    }
}
export default setting