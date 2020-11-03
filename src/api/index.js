import request from '../utils/request';

//登录接口
export const login = query => {
    return request({
        url: '/login',
        method: 'post',
        params: query
    });
};

//商务合作接口分页列表
export const bussinessList = query => {
    return request({
        url: '/bussiness',
        method: 'post',
        params: query
    });
};

//简历列表分页列表
export const resumeList = query => {
    return request({
        url: '/resume',
        method: 'post',
        params: query
    });
};

//用户管理分页列表
export const userList = query => {
    return request({
        url: '/user',
        method: 'post',
        params: query
    });
};
//用户管理保存
export const saveuser = query => {
    return request({
        url: '/user/saveOrUpdate',
        method: 'post',
        params: query
    });
};
//用户管理删除
export const deleteuser = query => {
    return request({
        url: '/user/deleteByIds',
        method: 'post',
        params: query
    });
};