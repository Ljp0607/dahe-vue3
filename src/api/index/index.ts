import axios, { AxiosError } from 'axios';
import { checkStatus } from './checkStatus'
import "vant/es/toast/style";
import { Toast } from "vant";
// 默认请求连接
// axios.defaults.baseURL = "http://152.136.144.141/dahe";//测试环境路径
axios.defaults.baseURL = "https://news.dahebao.cn/dahe";  //正式环境路径
// 超时时间（ms）
axios.defaults.timeout = 5 * 1000;
axios.defaults.headers.post['Content-Type'] = 'application/json'
// 响应拦截
axios.interceptors.response.use((result) => {
    // return result.data;
    if (result.status == 200) {
        return result.data;
    } else {
        return result
    }
}, (err: AxiosError) => {
    const { response } = err;
    if (response) return checkStatus(response.status);

})
export default axios
