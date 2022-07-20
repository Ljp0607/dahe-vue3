import request from "../request";
import { API } from "../servicePort";
/**
 * @name 获取用户邀请记录
 */
// * 用户邀请记录
// const loginApi = (data: any) => request.post(API.getUser, data, "")
const loginApi = (data: any, datas: any) => request.post(API.getUser + datas, data, '')
export default loginApi

