<template>
  <div class="formcontent">
    <div>
      <van-image height="206" :src="logo" />
      <p class="tips descr"> 北京多宝力劳务派遣公司，为求职者和招聘方搭建就业供需平台。请认真填写应聘求职信息，保证所填信息真实有效，电话号码正确</p>
    </div>

    <van-form @submit="onSubmit" label-align="left" input-align="left" label-width="300px">
      <van-field v-model="name" label="1.姓名*" placeholder="请输入姓名" :rules="[{ required: true, message: '请输入姓名' }]" />
      <van-field name="radio" label="2.性别*">
        <template #input>
          <van-radio-group v-model="sex" direction="horizontal">
            <van-radio name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field name="radio" label="3.出生年月*">
        <template #input>
          <div @click="show=true">请选择日期</div>
          <van-calendar v-model="show" @confirm="onConfirm" />
        </template>
      </van-field>
      <van-field name="radio" label="4.身份证号*" placeholder="请输入身份证号" :rules="[{ required: true, message: '请输入身份证号' }]">
      </van-field>
      <van-field name="radio" label="5.学历*" class="sradio">
        <template #input>
          <van-radio-group v-model="xl">
            <van-radio name="初中及以下" shape="square">初中及以下</van-radio>
            <van-radio name="高中（中专、技校)" shape="square">高中（中专、技校)</van-radio>
            <van-radio name="大专" shape="square">大专</van-radio>
            <van-radio name="本科" shape="square">本科</van-radio>
            <van-radio name="硕士" shape="square">硕士</van-radio>
            <van-radio name="博士及以上" shape="square">博士及以上</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field name="radio" label="6.毕业院校*" placeholder="请输入毕业院校" :rules="[{ required: true, message: '请输入毕业院校' }]">
      </van-field>
      <van-field name="radio" label="7.所学专业*" placeholder="请输入所学专业" :rules="[{ required: true, message: '请输入所学专业' }]">
      </van-field>
      <van-field name="radio" label="8.是否应届毕业生*">
        <template #input>
          <van-radio-group v-model="sex" direction="horizontal">
            <van-radio name="1">是</van-radio>
            <van-radio name="2">否</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field name="radio" label="9.户籍性质*" class="sradio">
        <template #input>
          <van-radio-group v-model="hjxz">
            <van-radio name="本区城镇" shape="square">本区城镇</van-radio>
            <van-radio name="本区农村" shape="square">本区农村</van-radio>
            <van-radio name="本市城镇" shape="square">本市城镇</van-radio>
            <van-radio name="本市农村" shape="square">本市农村</van-radio>
            <van-radio name="外省城镇" shape="square">外省城镇</van-radio>
            <van-radio name="外省农村" shape="square">外省农村</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field name="radio" label="10.居住地址（街/镇即可）*" rows="3" autosize type="textarea" placeholder="请输入居住地址"
        :rules="[{ required: true, message: '请输入居住地址' }]">
      </van-field>
      <van-field name="radio" label="11.联系方式*" placeholder="请输入联系方式" :rules="[{ required: true, message: '请输入联系方式' }]">
      </van-field>
      <van-field name="radio" label="12.工作经历（格式：时间+地点+岗位）*" rows="5" autosize type="textarea" placeholder="请输入工作经历"
        :rules="[{ required: true, message: '请输入工作经历' }]">
      </van-field>
      <van-field name="radio" label="12.工作技能（例：证书或者驾照本）*" rows="3" autosize type="textarea" placeholder="请输入工作经历"
        :rules="[{ required: true, message: '请输入工作技能' }]">
      </van-field>
      <van-field name="radio" label="13.应聘岗位名称*" class="sradio">
        <template #input>
          <van-radio-group v-model="hjxz">
            <van-radio name="本区城镇" shape="square">顺丰快递员</van-radio>
            <van-radio name="本区农村" shape="square">顺丰货运司机</van-radio>
            <van-radio name="本市城镇" shape="square">汽车配件 普工</van-radio>
            <van-radio name="本市农村" shape="square">医院/幼儿园 保洁员</van-radio>
            <van-radio name="外省城镇" shape="square">机关单位/幼儿园 厨师</van-radio>
            <van-radio name="外省农村" shape="square">幼师</van-radio>
            <van-radio name="外省农村" shape="square">
              <template>
                其他：<input type="text">
              </template>
            </van-radio>
          </van-radio-group>
        </template>
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
  .formcontent /deep/ .van-field__control::placeholder{
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