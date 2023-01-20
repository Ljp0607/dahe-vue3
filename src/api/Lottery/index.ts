import request from "../index/request";


//根据活动编码获取抽奖配置  
const findDraw = (data: any) => request.get("app/daheDrawActivityConfig/findDrawActivityConfigByAactivityNo", data, '')
//  中奖人员名单
const drawRecordList = (data: any) => request.get("app/daheDrawActivityConfig/drawRecordList", data, '')
//获取邀请码和邀请记录
const getUserCode = (data: any) => request.get("app/daheDrawActivityConfig/getUserCodeAndinvitationList", data, '')
//抽奖
const toDraw = (data: any) => request.get("app/daheDrawActivityConfig/toDraw", data, '')
//获取抽奖次数
const findDrawCount = (data: any) => request.get("app/daheDrawActivityConfig/findDrawCount", data, '')

const saveAddress = (datas: any, data: any) => request.post("app/daheDrawActivityConfig/saveAddress" + datas, data, '')

export default { findDraw, drawRecordList, getUserCode, toDraw, findDrawCount, saveAddress }
