import request from "../index/request";
import { useCounterStore } from "@/stores/counter";
import { cityType } from "./resType";
const store = useCounterStore();

//获取城市接口
export const cityList = () => request.post("app/selectionActivity/cityList", {}, '')
//获取所有信息
// export const selectCitys = () => request.post("app/selectionActivity/video/list", { "currentPage": "1", "pageSize": "100", "activityNo": "shtdhr" }, '')
//获取某一省份信息
export const selectCity = (userId: string, creatorType: string, currentPage: number) => request.post("app/selectionActivity/video/list", { "userId": userId, "currentPage": currentPage, "pageSize": "4", "activityNo": store.$state.activityNo, "creatorType": creatorType }, '')

//提交投稿
export const saveCity = (data: any) => request.post("app/selectionActivity/video/save", data, '')
