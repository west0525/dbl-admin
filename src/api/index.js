import request from '../utils/request';

//登录接口
export const login = data => {
    return request({
        url: '/inspect/user/login',
        method: 'post',
        data
    });
};

//商务合作导出
export const exportBusiness = data => {
    return request({
        url: '/inspect/business/exportData',
        method: 'post',
        data
    });
};
//商务合作接口分页列表
export const bussinessList = data => {
    return request({
        url: '/inspect/business/pageQuery',
        method: 'post',
        data
    });
};
//商务合作接口保存
export const savebusiness = data => {
    return request({
        url: '/inspect/business/saveOrUpdate',
        method: 'post',
        data
    });
};
//商务合作删除
export const deletebusiness = data => {
    return request({
        url: '/inspect/business/deleteByIds',
        method: 'post',
        data
    });
};

//简历导出
export const exportResume = data => {
    return request({
        url: '/inspect/resume/exportData',
        method: 'post',
        data
    });
};
//简历列表分页列表
export const resumeList = data => {
    return request({
        url: '/inspect/resume/pageQuery',
        method: 'post',
        data
    });
};
//简历列表删除
export const deleteresume = data => {
    return request({
        url: '/inspect/resume/deleteByIds',
        method: 'post',
        data
    });
};
//简历列表保存
export const saveresume = data => {
    return request({
        url: '/inspect/resume/saveOrUpdate',
        method: 'post',
        data
    });
};

//用户导出
export const exportUser = data => {
    return request({
        url: '/inspect/user/exportData',
        method: 'post',
        data
    });
};
//用户管理分页列表
export const userList = data => {
    return request({
        url: '/inspect/user/pageQuery',
        method: 'post',
        data
    });
};
//用户管理保存
export const saveuser = data => {
    return request({
        url: '/inspect/user/saveOrUpdate',
        method: 'post',
        data
    });
};

//用户管理详情
export const userinfo = data => {
    return request({
        url: '/inspect/user/getById',
        method: 'post',
        data
    });
};
//用户管理删除
export const deleteuser = data => {
    return request({
        url: '/inspect/user/deleteByIds',
        method: 'post',
        data
    });
};