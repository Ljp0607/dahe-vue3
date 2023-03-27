import request from "../index/request";
import { useCounterStore } from "@/stores/counter";
const store = useCounterStore();
//获取城市接口
// export const cityList = () => request.post("app/selectionActivity/cityList", {}, '')
//获取
export const selectCity =
    (creatorType: string, current: number) => request.post
        ("app/selectionActivity/video/list",
            {
                "userId": store.$state.userId,
                "pageSize": "6",
                "activityNo": "2a83900fbb174fe59980d56a238d01a2",
                "creatorType": creatorType,
                "currentPage": current,
            }, '')

//获取排行
export const selectTask =
    (creatorType: string) => request.post
        ("app/selectionActivity/video/list",
            {
                "userId": store.$state.userId,
                "pageSize": "300",
                "activityNo": "2a83900fbb174fe59980d56a238d01a2",
                "creatorType": creatorType,
                "currentPage": 1,
            }, '')
//上传
export const saveCity = (data: any) => request.post("app/selectionActivity/video/save", data, '')

//上传信息

export const saveCar = (data: any) => request.post("app/selectionActivity/video/save", data, '')


//投票
export const poststhumbup = (data: any) => request.get("appposts/poststhumbup", { data: data }, '')
//获取tabs
export const getTypeNo = (TypeNo: string) => request.get('app/dict/listByParentTypeNo', { parentTypeNo: TypeNo }, '')

export const selectHouse =
    (creatorType: string, current: number) => request.post
        ("app/selectionActivity/video/list",
            {
                "userId": store.$state.userId,
                "pageSize": "10",
                "activityNo": "3b4642431dfc43fcb581069037ee73be",
                "creatorType": creatorType,
                "currentPage": current,
            }, '')

export const saveAddress = (datas: any, data: any) => request.post("app/daheDrawActivityConfig/saveAddress" + datas, data, '')
