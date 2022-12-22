import request from "../index/request"
import { useCounterStore } from "@/stores/counter"
const store = useCounterStore()
//获取二十大相关信息 
// export const getHelpTion = (data: any) => request.post("appActivityNews/getconsultation", data, '') //供暖问答
//  default { getHelpTion }
//获取帮助
export const selectHelp =
    (creatorType: string, current: number) => request.post
        ("app/selectionActivity/video/list",
            {
                "postsState": "0,1",
                "userId": store.$state.userId,
                "pageSize": "10",
                "sort": "posts_publish_time",
                "activityNo": "activity002",
                "creatorType": creatorType,
                "currentPage": current,
            }, '')
//存储
export const saveHelp = (data: any) => request.post("app/selectionActivity/video/save", data, '')

//获取自己的
export const selecMytHelp =
    (creatorType: string) => request.post
        ("app/selectionActivity/video/list",
            {
                "postsState": "0,1,2",
                "myUserId": store.$state.userId,
                "userId": store.$state.userId,
                "pageSize": "100",
                "sort": "posts_publish_time",
                "activityNo": "activity002",
                "creatorType": creatorType,
                "currentPage": 1,
            }, '')
{
}
