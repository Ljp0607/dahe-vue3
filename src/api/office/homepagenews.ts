import request from "../request";
import { API } from "../servicePort";
/**
 * @name 获取用户邀请记录
 */
// * 用户邀请记录
const homepagenews = (data: any) => request.post(API.homepagenews, data, '')

export default homepagenews

