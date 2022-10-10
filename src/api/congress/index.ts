import request from "../index/request"

//获取二十大相关信息 
// const getHouseInfo = (data: any) => request.get("app/houseInfo/getHouseInfo", data, '')
// const findDraw = (data: any) => request.get("app/daheDrawActivityConfig/findDrawActivityConfigByAactivityNo", data, '')
const getNewsInfo = (data: any) => request.get("appActivityNews/getNewsInfo", data, '')
const drawRecordList = (data: any) => request.get("app/daheDrawActivityConfig/drawRecordList", data, '')

export default { getNewsInfo,drawRecordList }