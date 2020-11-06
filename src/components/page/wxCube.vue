<template>
    <div>
        <van-grid :column-num="3" :border="false">
            <van-grid-item v-for="(item,index) in cubeData" :key="index" :text="item.name" :url="item.url">
                <div slot="icon">
                    <van-image radius="30" width="60" height="60" :src="item.logo"
                        style="box-shadow: 1px 1px 9px 0px #333;" />
                </div>
            </van-grid-item>
        </van-grid>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
                cubeData: [{
                    logo: require('../../assets/img/zgzfw.jpg'),
                    url: 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA4MDA0MzcwMA==#wechat_redirect',
                    name: '中国政府网'
                }, {
                    logo: require('../../assets/img/rlzy.jpg'),
                    url: 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI2NTQzNjc2MA==#wechat_redirect',
                    name: '中国人社'
                }, {
                    logo: require('../../assets/img/czb.jpg'),
                    url: 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA3ODI0NTIyNA==#wechat_redirect',
                    name: '财政部'
                }, {
                    logo: require('../../assets/img/bjfb.jpg'),
                    url: 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA4NTIyMjMyMw==#wechat_redirect',
                    name: '北京发布'
                }, {
                    logo: require('../../assets/img/bjrs.jpg'),
                    url: 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MjM5ODI2MDgwNQ==#wechat_redirect',
                    name: '北京人社'
                }, {
                    logo: require('../../assets/img/sygz.jpg'),
                    url: 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU4MzM0NDYyMQ==#wechat_redirect',
                    name: '顺义国资'
                }, {
                    logo: require('../../assets/img/syrc.jpg'),
                    url: 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI4MzA2OTk5MQ==#wechat_redirect',
                    name: '顺义人才'
                }, {
                    logo: require('../../assets/img/syrs.jpg'),
                    url: 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzUzMDc2MTY2Ng==#wechat_redirect',
                    name: '顺义人社'
                }, {
                    logo: require('../../assets/img/sywc.jpg'),
                    url: 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAwNDgxMzY4Mw==#wechat_redirect',
                    name: '顺义区信息中心'
                }, {
                    logo: require('../../assets/img/sf.jpg'),
                    url: 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MjM5Njc2NDEwMA==#wechat_redirect',
                    name: '顺丰速运'
                }, {
                    logo: require('../../assets/img/301.jpg'),
                    url: 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzIyNzk3Mjg3NA==#wechat_redirect',
                    name: '301医院'
                }, {
                    logo: require('../../assets/img/krjl.jpg'),
                    url: 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI3OTMwOTk5NA==#wechat_redirect',
                    name: '抗日战争纪念馆'
                }, {
                    logo: require('../../assets/img/gh.jpg'),
                    url: 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MjM5MTU4MzM4MQ==#wechat_redirect',
                    name: '中国国际航空'
                }]
            }
        }
    }
</script>

<style>

</style>