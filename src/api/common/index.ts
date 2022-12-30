
import request from "../index/request";
export const getshareinfo = (data: any) => request.post(`appshare/getshareinfo`, data, '')

export const getBase64 = (url?: string) => request.get(`/app/nft/other/getImgBase64?imgUrl=${url}`, url, '')


