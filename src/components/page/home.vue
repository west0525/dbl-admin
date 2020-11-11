<template>
    <div class="contant">
        <div class="milky">欢迎使用多宝力后台管理系统</div>
        <el-image :src="homeUrl" fit="contain" style="margin:0 auto"></el-image>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                homeUrl: require('../../assets/img/home.png')
            }
        }
    }
</script>

<style>
    .contant {
        display: flex;
        background: #fff;
        height: 100%;
        text-align: center;
        position: relative;
    }

    .milky {
        font-family: "Arial Rounded MT Bold", "Helvetica Rounded", Arial, sans-serif;
        text-transform: uppercase;
        display: block;
        font-size: 40px;
        color: #e9f0ff;
        text-shadow:0 8px 8px #75757599, 0px 2px 1px #f2e8e8;
        font-weight: bold;
        letter-spacing: 4px;
        text-align: center;
        position: absolute;
        top: 50px;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 20px;
        z-index: 999;
    }
</style>