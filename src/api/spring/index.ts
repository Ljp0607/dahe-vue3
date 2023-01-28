import request from "../index/request";
import { useCounterStore } from "@/stores/counter";
const store = useCounterStore();

//根据活动编码获取抽奖配置  
export const findDraw = (): any => request.get("app/daheDrawActivityConfig/findDrawActivityConfigByAactivityNo", { userId: store.$state.userId, activityNo: '9cccccfc547b43bd8595a39b3c0b3797' }, '')
//上传
export const saveCity = (data: any) => request.post("app/selectionActivity/video/save", data, '')
//投票
export const poststhumbup = (data: any) => request.get("appposts/poststhumbup", { data: data }, '')
//获取tabs
export const getTypeNo = (TypeNo: string) => request.get('app/dict/listByParentTypeNo', { parentTypeNo: TypeNo }, '')
//获取每一页下的详情
export const selectHouse =
    (creatorType: string, current: number) => request.post
        ("app/selectionActivity/video/list",
            {
                "userId": store.$state.userId,
                "pageSize": "4",
                "activityNo": "9cccccfc547b43bd8595a39b3c0b3797",
                "creatorType": creatorType,
                "currentPage": current,
            }, '')

// 6a80562a1e79447683ba6af00c00fa7d
export const drawRecordList = () => request.get("app/daheDrawActivityConfig/drawRecordList", {
    userId: store.$state.userId,
    activityNo: '2e21e3218dee479b9b51094eaec7877c',
    awardFlag: "1",
    page_index: 0,
    page_count: 200,
}, '')
export const weekList = () => request.get("app/daheDrawActivityConfig/drawRecordList", {
    userId: store.$state.userId,
    activityNo: '6a80562a1e79447683ba6af00c00fa7d',
    awardFlag: "1",
    page_index: 0,
    page_count: 200,
}, '')
