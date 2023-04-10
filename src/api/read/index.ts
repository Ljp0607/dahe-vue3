import request from "../index/request";
import { useCounterStore } from "@/stores/counter";
const store = useCounterStore();
//上传
export const saveCity = (data: any) => request.post("app/selectionActivity/video/save", data, '')
//上传信息
export const saveCar = (data: any) => request.post("app/selectionActivity/video/save", data, '')
//投票
export const poststhumbup = (data: any) => request.get("appposts/poststhumbup", { data: data }, '')
//获取tabs
export const getTypeNo = (TypeNo: string) => request.get('app/dict/listByParentTypeNo', { parentTypeNo: TypeNo }, '')
//查找读书内容
export const selectRead =
    (creatorType: string, current: number, options?: { [key: string]: string | number }) => request.post
        ("app/selectionActivity/video/list",
            {
                "userId": store.$state.userId,
                "pageSize": "10",
                "activityNo": store.$state.activityNo ? store.$state.activityNo : "12bcba64f0f844cd8a9330460f1def18",
                "creatorType": creatorType,
                "currentPage": current,
                ...(options || {})
            }, '')
//提交读书信息
export const saveBook = async (options?: { [key: string]: string | number }) => {
    return request.post("app/selectionActivity/video/save", {
        // posts_content: "#阅读看见更大的世界# ", //详细介绍
        user_id: store.$state.userId, //用户
        source: "0",
        activityNo: store.$state.activityNo ? store.$state.activityNo : "12bcba64f0f844cd8a9330460f1def18", //评选活动编码 必传
        ...(options || {})
    }, '')
}
//获取视频地址
export const getNewsInfo = async () => { return request.post("appActivityNews/getNewsInfo", { type: 110, page_index: 0, page_count: 100 }, '') }
