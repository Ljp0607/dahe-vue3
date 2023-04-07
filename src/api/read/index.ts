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

export const selectRead =
    (creatorType: string, current: number) => request.post
        ("app/selectionActivity/video/list",
            {
                "userId": store.$state.userId,
                "pageSize": "10",
                "activityNo": "4eba1b68cb7f4eb188b66ac4b68a17d4",
                "creatorType": creatorType,
                "currentPage": current,
            }, '')

//提交读书信息
export const saveBook = async (options?: { [key: string]: string | number }) => {
    return request.post("app/selectionActivity/video/save", {
        posts_content: "#阅读看见更大的世界# ", //详细介绍
        user_id: store.$state.userId, //用户
        source: "0",
        activityNo: "4eba1b68cb7f4eb188b66ac4b68a17d4", //评选活动编码 必传
        ...(options || {})
    }, '')
}