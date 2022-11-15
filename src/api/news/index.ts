
import request from "../index/request"

//获取二十大相关信息 
const findNewsDetail = (data: any) => request.get("appActivityNews/findNewsDetail", data, '') //新闻详情

export default { findNewsDetail }