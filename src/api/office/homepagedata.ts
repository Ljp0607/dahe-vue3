import request from "../index/request";
import { API } from "../index/servicePort";
/**
 * @name 获取用户邀请记录
 */
// * 用户邀请记录
const homepagedata = (data: any) => request.post(API.homepagedata, data, '')

export default homepagedata

