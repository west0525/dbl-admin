<template>
    <div class="formcontent">
        <div>
            <van-image height="206" :src="logo" />
            <p class="tips descr"> 北京多宝力劳务派遣公司，为求职者和招聘方搭建就业供需平台。请企业HR按照要求将招聘公告的各项内容逐一填到置顶栏</p>
        </div>

        <van-form @submit="onSubmit" label-align="left" input-align="left" label-width="300px">
            <van-field v-model="name" label="1.企业名称 *" placeholder="请输入企业名称"
                :rules="[{ required: true, message: '请输入企业名称' }]" />
            <van-field v-model="name" label="2.经办人姓名*" placeholder="请输入经办人姓名"
                :rules="[{ required: true, message: '请输入经办人姓名' }]" />
            <van-field v-model="name" label="3.经办人联系方式*" placeholder="经办人联系方式"
                :rules="[{ required: true, message: '请输入经办人联系方式' }]" />

            <van-field name="radio" label="4.公司简介*" rows="3" autosize type="textarea" placeholder="请输入公司简介"
                :rules="[{ required: true, message: '请输入公司简介' }]">
            </van-field>
            <van-field name="radio" label="5.招聘岗位*" rows="3" autosize type="textarea" placeholder="请输入招聘岗位"
                :rules="[{ required: true, message: '请输入招聘岗位' }]">
            </van-field>
            <van-field name="radio" label="6.岗位职责*" rows="3" autosize type="textarea" placeholder="请输入岗位职责"
                :rules="[{ required: true, message: '请输入岗位职责' }]">
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
    export default {
        data() {
            return {
                show: false,
                logo: require('../../assets/img/loginbg.png'),
                name: '',
                sex: 1
            };
        },
        methods: {
            onSubmit(values) {
                console.log('submit', values);
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

    .formcontent /deep/ .van-cell {
        flex-direction: column;
    }

    .formcontent /deep/ .van-field__control::placeholder {
        color: #ccc;
    }

    .formcontent /deep/ .van-field__label {
        font-size: 15px;
        font-weight: bold;
        padding: 10px 0;
    }

    .sradio /deep/ .van-radio {
        margin-bottom: 10px;
    }
</style>