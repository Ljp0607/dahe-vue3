import request from "../index/request";


//根据活动编码获取抽奖配置  
const findDraw = (data: any) => request.get("app/daheDrawActivityConfig/findDrawActivityConfigByAactivityNo", data, '')
//抽奖人员名单
const drawRecordList = (data: any) => request.get("app/daheDrawActivityConfig/drawRecordList", data, '')
//获取邀请码和邀请记录
const getUserCode = (data: any) => request.get("app/daheDrawActivityConfig/getUserCodeAndinvitationList", data, '')
//抽奖
const toDraw = (data: any) => request.get("app/daheDrawActivityConfig/toDraw", data, '')
//获取抽奖次数
const findDrawCount = (data: any) => request.get("app/daheDrawActivityConfig/findDrawCount", data, '')

//领奖 http://localhost:8080/dahe/app/daheDrawActivityConfig/saveAddress?userId=a26db8f34b1c48a0bfbd307243fef4eb&activityNo=d70429d8e6c14157ab19386047c00324

const saveAddress = (datas: any, data: any) => request.post("app/daheDrawActivityConfig/saveAddress" + datas, data, '')

export default { findDraw, drawRecordList, getUserCode, toDraw, findDrawCount, saveAddress }
