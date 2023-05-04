import request from "../index/request";

/**
 * 二次分享
 * @param data
 * @param sign 标识符
 * @param data JSON.stringify({ type: '23', share_url: location.href })
 * @returns
 */
// export function getShareInfo(data: { sign: string; data: JSON | string }): {
//     return request.get('/appshare/getshareinfo', { params: data })
// }
export const getShareInfo = () => request.get('/appshare/getshareinfo', {
    sign: '637586292ebf2c5fabab863734fc6a12',
    data: JSON.stringify({ type: '23', share_url: location.href }),
}, '')

export const clickAndDown = () => request.get('noLoginApi/downloadChannel/clickAndDownloadCountListAll.do?typeNo=100002', {}, '')