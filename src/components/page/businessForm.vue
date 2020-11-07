<template>
    <div class="formcontent">
        <div>
            <van-image height="206" :src="logo" />
            <p class="tips descr"> 北京多宝力劳务派遣公司，为求职者和招聘方搭建就业供需平台。请企业HR按照要求将招聘公告的各项内容逐一填到置顶栏</p>
        </div>
        <van-form @submit="onSubmit" label-align="left" input-align="left" label-width="300px">
            <van-field v-model="form.compName" name="compName" label="公司名称" required placeholder="请输入公司名称"
                :rules="[{ required: true, message: '请输入公司名称' }]" />
            <van-field name="compDescr" v-model="form.compDescr" label="公司简介" required rows="3" autosize type="textarea"
                placeholder="请输入公司简介" :rules="[{ required: true, message: '请输入公司简介' }]">
            </van-field>
            <van-field name="workName" v-model="form.workName" label="经办人姓名" required placeholder="请输入经办人姓名"
                :rules="[{ required: true, message: '请输入经办人姓名' }]" />
            <van-field name="workPhone" type="tel" v-model="form.workPhone" label="经办人联系方式" placeholder="经办人联系方式"
                :rules="[{ required: true, message: '请输入经办人联系方式' },{ validator: validatorPhone, message: '手机号格式错误' }]"
                required />
            <van-field name="job" v-model="form.job" label="招聘岗位" rows="3" autosize type="textarea"
                placeholder="请输入招聘岗位" :rules="[{ required: true, message: '请输入招聘岗位' }]" required>
            </van-field>
            <van-field name="workDuty" v-model="form.workDuty" label="岗位职责" rows="3" autosize type="textarea"
                placeholder="请输入岗位职责" :rules="[{ required: true, message: '请输入岗位职责' }]" required>
            </van-field>
            <van-field name="workRequest" v-model="form.workRequest" label="任职要求" rows="3" autosize type="textarea"
                placeholder="请输入任职要求" :rules="[{ required: true, message: '请输入任职要求' }]" required>
            </van-field>
            <van-field name="salary" v-model="form.salary" label="薪酬福利" rows="3" autosize type="textarea"
                placeholder="请输入薪酬福利" :rules="[{ required: true, message: '请输入薪酬福利' }]" required>
            </van-field>
            <van-field name="contactPhone" v-model="form.contactPhone" type="tel" label="联系方式" placeholder="请输入联系方式"
                :rules="[{ required: true, message: '请输入联系方式' },{ validator: validatorPhone, message: '手机号格式错误' }]"
                required>
            </van-field>
            <van-field name="workAddress" v-model="form.workAddress" label="工作地址" rows="2" autosize type="textarea"
                placeholder="请输入工作地址" :rules="[{ required: true, message: '请输入工作地址' }]" required>
            </van-field>
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
    import {
        Dialog
    } from 'vant';
    export default {
        data() {
            return {
                show: false,
                logo: require('../../assets/img/loginbg.png'),
                form: {
                    id: '',
                    compName: '',
                    compDescr: '',
                    workName: '',
                    workPhone: '',
                    job: '',
                    workDuty: '',
                    workRequest: '',
                    salary: '',
                    contactPhone: '',
                    workAddress: '',
                }
            };
        },
        methods: {
            validatorPhone(val) {
                return /^1[3-9]\d{9}$/.test(val);
            },
            onSubmit(values) {
                Dialog.confirm({
                    title: '提示',
                    message: '是否提交招聘登记，请认真填写信息，保证所填信息真实有效，电话号码正确。后续会有专业人士与您洽谈合作，请保持手机号畅通',
                }).then(() => {
                    console.log('submit', values);
                });

            },
        },
    };
</script>

<style>
    .descr {
        text-indent: 20px;
        padding: 10px;
    }

    .formcontent {
        overflow: auto;
        height: 100%;
    }

    .formcontent .van-cell {
        -webkit-box-orient: vertical;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
    }

    .formcontent .van-field__control::placeholder {
        color: #ccc;
    }

    .formcontent .van-field__label {
        font-size: 18px;
        font-weight: bold;
        padding-bottom: 10px;
        color: #333;
    }

    .sradio .van-radio {
        margin-bottom: 10px;
    }
</style>