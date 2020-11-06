<template>
    <right-layout :title="title" :visible.sync="show" @closeLayout="closeLayout" :loading="loading2"
        class="layout-wrap">
        <el-form :model="form" :rules="rule" ref="form" label-width="160px" label-position="left" class="elform">
            <el-form-item label="姓名：" prop="name">
                <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="性别：" prop="sex">
                <el-radio-group v-model="form.sex">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="手机号：" prop="phone">
                <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
                <p class="tips">*手机号将作为系统登录账号使用</p>
            </el-form-item>
            <el-form-item label="所属部门：" prop="deptName">
                <el-input v-model="form.deptName" placeholder="请输入部门名称"></el-input>
            </el-form-item>
            <el-form-item label="登录密码：" prop="loginPwd">
                <el-input v-model="form.loginPwd" auto-complete="new-password" show-password placeholder="请输入密码">
                </el-input>
                <p class="tips">*建议使用英文字母加数字或符号的组合密码</p>
            </el-form-item>
            <el-form-item label="确认密码：" prop="loginPwd2">
                <el-input v-model="form.loginPwd2" auto-complete="new-password" show-password placeholder="请输入确认密码">
                </el-input>
            </el-form-item>
        </el-form>
        <div slot="foot">
            <div class="left">
                <el-button type="text" @click="closeLayout">关 闭</el-button>
            </div>
            <el-button type="primary" @click="submitFun" icon="el-icon-edit-outline" :loading="loading">保存</el-button>
            <el-button type="default" @click="resetForm" icon="el-icon-refresh-left
">重置</el-button>
        </div>
    </right-layout>
</template>

<script>
    import RightLayout from '@/components/common/dialogLayout';
    import {
        saveuser
    } from '../../api/index';
    export default {
        name: '',
        components: {
            RightLayout,
        },
        props: {

        },
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入密码"));
                } else {
                    if (this.form.loginPwd !== "") {
                        this.$refs.form.validateField("loginPwd2");
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请再次输入密码"));
                } else if (value !== this.form.loginPwd) {
                    callback(new Error("两次输入密码不一致!"));
                } else {
                    callback();
                }
            };
            return {
                show: false,
                title: '',
                loading: false,
                loading2: false,
                form: {
                    id: '',
                    name: '',
                    sex: 1,
                    deptName: '',
                    phone: '',
                    loginPwd: '',
                    loginPwd2: ''
                },
                rule: {
                    loginPwd: [{
                            required: true,
                            message: "密码必填",
                            trigger: "blur"
                        },
                        {
                            min: 6,
                            max: 30,
                            message: "长度限制6-30位",
                            trigger: "blur"
                        },
                        {
                            validator: validatePass,
                            trigger: "blur"
                        }
                    ],
                    loginPwd2: [{
                            required: true,
                            message: "确认密码必填",
                            trigger: "blur"
                        },
                        {
                            validator: validatePass2,
                            trigger: "blur"
                        }
                    ],
                    phone: [{
                            required: true,
                            message: "手机号必填",
                            trigger: "blur"
                        },
                        {
                            min: 0,
                            max: 13,
                            message: "长度限制13位数字",
                            trigger: "blur"
                        },
                        {
                            pattern: /^1[3456789]\d{9}$/,
                            message: "手机号错误",
                            trigger: "blur"
                        }
                    ],
                    name: [{
                            required: true,
                            message: '姓名必填',
                            trigger: 'blur'
                        },
                        {
                            min: 0,
                            max: 10,
                            message: '长度限制10位',
                            trigger: 'blur'
                        },
                    ],
                    deptName: [{
                            required: true,
                            message: "部门名称必填",
                            trigger: "blur"
                        },
                        {
                            min: 0,
                            max: 32,
                            message: "长度限制32位",
                            trigger: "blur"
                        }
                    ],


                },
            }
        },
        methods: {
            showLayout(data) {
                console.log(data);
                if (data) {
                    this.title = "修改角色";
                    this.oldForm = JSON.parse(JSON.stringify(data))
                    this.form.id = data.id
                    this.form.name = data.name
                    this.form.sex = data.sex
                    this.form.deptName = data.deptName
                    this.form.phone = data.phone
                    this.form.loginPwd = data.loginPwd
                    this.form.id = data.id
                } else {
                    this.title = "新增角色";
                    this.form.id = "";
                }
                this.show = true;
            },
            submitFun() { //保存
                this.$refs.form.validate(valid => {
                    if (valid) {
                        let params = {
                            id: this.form.id,
                            name: this.form.name,
                            sex: this.form.sex,
                            deptName: this.form.deptName,
                            phone: this.form.phone,
                            loginPwd: this.form.loginPwd,
                        }
                        this.loading = true;
                        saveuser(params).then(res => {
                            if (res.data.code == 1000) {
                                this.$notify({
                                    title: '提示',
                                    type: 'success',
                                    message: '保存成功！'
                                })
                                this.$emit('refresh');
                                this.closeLayout();
                            }
                            this.loading = false;
                        })
                    }
                })
            },
            
            resetForm() { //重置
                if (!this.form.id) {
                    this.$nextTick(() => {
                        this.$refs.form.resetFields();
                    })
                } else {
                    this.form = this.oldForm
                    this.form.loginPwd2 = ''
                }
            },
            closeLayout() {
                this.form.id = '';
                this.show = false;
                setTimeout(() => {
                    this.resetForm();
                }, 500)
            },
        }
    }
</script>