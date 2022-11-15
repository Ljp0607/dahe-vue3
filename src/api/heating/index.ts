import request from "../index/request"

//获取二十大相关信息 
const getNewsInfo = (data: any) => request.post("appActivityNews/getNewsInfo", data, '') //新闻详情
const getconsultation = (data: any) => request.post("appActivityNews/getconsultation", data, '') //供暖问答

export default { getNewsInfo, getconsultation }