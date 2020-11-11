import axios from 'axios';
import {
    Notification
} from "element-ui";
import qs from "qs";

const service = axios.create({
    baseURL: '/api',
    // timeout: 60000, //响应时长可根据业务需求自行设置
    responseType: "json",
    withCredentials: false,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        'signature': '',
    }
})

//请求拦截器
service.interceptors.request.use(config => {
    let METHOD = config.method.toUpperCase();
    if (METHOD === "POST" || METHOD === "PUT" || METHOD === "DELETE") {
        if (!config.contentType) { // 若没有自定义contentType则用默认的
            config.data = {
                ...config.data,
            }
            config.data = qs.stringify(config.data);
        }
    }
    if (config.contentType) { // 设置自定义contentType
        config.headers['Content-Type'] = config.contentType;
    }
    return config
}, error => {
    return Promise.reject(error)
});

//响应拦截器
service.interceptors.response.use(response => {
    /** 以下可根据返回的code值来做用户权限操作*/
    if (response.data.code == 1000) {

    } else if (response.data.code == 9003) {
        // router.replace({ path: '/login' });
    } else if (response.data.code == 9999) {
        Notification({
            title: '提示',
            type: 'error',
            message: '系统错误，请重试或联系管理员！'
        })
    } else {
        Notification({
            title: '提示',
            type: 'error',
            message: response.data.msg
        })
    }
    return response
}, error => {
    Notification({
        title: '提示',
        type: 'error',
        message: '请求错误'
    })
    return Promise.reject(error)
})

export default service;