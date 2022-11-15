
import request from "../index/request";
const getshareinfo = (data: any) => request.post(`appshare/getshareinfo`, data, '')


export default { getshareinfo }
