<template>
  <div class="formcontent">
    <div>
      <van-image height="206" :src="logo" />
      <p class="tips descr"> 北京多宝力劳务派遣公司，为求职者和招聘方搭建就业供需平台。请认真填写应聘求职信息，保证所填信息真实有效，电话号码正确</p>
    </div>

    <van-form @submit="onSubmit" label-align="left" input-align="left" label-width="300px">
      <van-field required v-model="form.name" label="姓名" name="name" placeholder="请输入姓名"
        :rules="[{ required: true, message: '请输入姓名' }]" />
      <van-field required name="sex" label="性别">
        <template #input>
          <van-radio-group v-model="form.sex" direction="horizontal">
            <van-radio name="男">男</van-radio>
            <van-radio name="女">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field required name="birth" label="出生年月">
        <template #input>
          <div @click="show=true"><span class="tips" v-if="!form.birth">请选择日期</span><span>{{form.birth}}</span></div>
        </template>
      </van-field>
      <van-field v-model="form.idNumber" required name="idNumber" label="身份证号" placeholder="请输入身份证号"
        :rules="[{ required: true, message: '请输入身份证号' },{ validator: validatorId, message: '身份证号格式错误' }]">
      </van-field>
      <van-field required name="education" label="学历" class="sradio" :rules="[{ required: true, message: '请选择学历' }]">
        <template #input>
          <van-radio-group v-model="form.education">
            <van-radio name="初中及以下" shape="square">初中及以下</van-radio>
            <van-radio name="高中（中专、技校)" shape="square">高中（中专、技校)</van-radio>
            <van-radio name="大专" shape="square">大专</van-radio>
            <van-radio name="本科" shape="square">本科</van-radio>
            <van-radio name="硕士" shape="square">硕士</van-radio>
            <van-radio name="博士及以上" shape="square">博士及以上</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field v-model="form.school" name="school" label="毕业院校" placeholder="请输入毕业院校">
      </van-field>
      <van-field v-model="form.major" name="major" label="所学专业" placeholder="请输入所学专业">
      </van-field>
      <van-field name="isYear" label="是否应届毕业生">
        <template #input>
          <van-radio-group v-model="form.isYear" direction="horizontal">
            <van-radio name="是">是</van-radio>
            <van-radio name="否">否</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field required name="placeType" label="户籍性质" class="sradio"
        :rules="[{ required: true, message: '请选择户籍性质' }]">
        <template #input>
          <van-radio-group v-model="form.placeType">
            <van-radio name="本区城镇" shape="square">本区城镇</van-radio>
            <van-radio name="本区农村" shape="square">本区农村</van-radio>
            <van-radio name="本市城镇" shape="square">本市城镇</van-radio>
            <van-radio name="本市农村" shape="square">本市农村</van-radio>
            <van-radio name="外省城镇" shape="square">外省城镇</van-radio>
            <van-radio name="外省农村" shape="square">外省农村</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field required v-model="form.address" name="address" label="居住地址（街/镇即可）" rows="3" autosize type="textarea"
        placeholder="请输入居住地址" :rules="[{ required: true, message: '请输入居住地址' }]">
      </van-field>
      <van-field required v-model="form.phone" name="phone" label="联系方式" placeholder="请输入联系方式"
        :rules="[{ required: true, message: '请输入联系方式' },{ validator: validatorPhone, message: '手机号格式错误' }]">
      </van-field>
      <van-field v-model="form.experience" name="experience" label="工作经历（格式：时间+地点+岗位）" rows="5" autosize type="textarea"
        placeholder="请输入工作经历">
      </van-field>
      <van-field required v-model="form.skill" name="skill" label="工作技能（例：证书或者驾照本）" rows="3" autosize type="textarea"
        placeholder="请输入工作技能" :rules="[{ required: true, message: '请输入工作技能' }]">
      </van-field>
      <van-field required name="job" label="应聘岗位名称(必选一个，最多选择三个)" class="scheck"
        :rules="[{ required: true, message: '请选择应聘岗位' }]">
        <template #input>
          <van-checkbox-group v-model="form.job" :max="3">
            <van-checkbox name="顺丰快递员" shape="square">顺丰快递员</van-checkbox>
            <van-checkbox name="顺丰货运司机" shape="square">顺丰货运司机</van-checkbox>
            <van-checkbox name="国航行李运作员" shape="square">国航行李运作员</van-checkbox>
            <van-checkbox name="医院/幼儿园 保洁员" shape="square">医院/幼儿园 保洁员</van-checkbox>
            <van-checkbox name="机关单位/幼儿园 厨师" shape="square">机关单位/幼儿园 厨师</van-checkbox>
            <van-checkbox name="国航客舱运作员" shape="square">国航客舱运作员</van-checkbox>
            <van-checkbox name="其他" shape="square">
              <template>
                其他<input type="text" name="other" style="margin-left:10px" v-model="form.other">
              </template>
            </van-checkbox>
          </van-checkbox-group>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker v-model="datePicker" :max-date="maxDate" :formatter="formatter" type="date"
        @confirm="confirmDate" title="选择年月日" />
    </van-popup>

  </div>
</template>

<script>
  import {
    Dialog
  } from 'vant';
  import {
    Toast
  } from 'vant';
  export default {
    data() {
      return {
        maxDate: new Date(),
        datePicker: new Date(),
        show: false,
        isOther: true,
        logo: require('../../assets/img/loginbg.png'),
        form: {
          sex: '男'
        },

      };
    },
    methods: {
      confirmDate(val) {
        let date = this.formatDate(val)
        this.$set(this.form, 'birth', date)
        this.show = false
      },
      formatDate(time) {
        var time = new Date(time);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        return y + '-' + this.add0(m) + '-' + this.add0(d);
      },
      add0(m) {
        return m < 10 ? '0' + m : m
      },
      formatter(type, val) {
        if (type === 'year') {
          return `${val}年`;
        } else if (type === 'month') {
          return `${val}月`;
        } else if (type === 'day') {
          return `${val}日`;
        }
        return val;
      },
      validatorPhone(val) {
        return /^1[3-9]\d{9}$/.test(val);
      },
      validatorId(val) {
        return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val);
      },
      onSubmit(values) {
        if (this.form.job.indexOf('其他') > -1 && this.form.other == '') {
          Toast('请输入其他职业')
          return
        }
        Dialog.confirm({
          title: '提示',
          message: '是否提交求职登记，请认真填写信息，保证所填信息真实有效，电话号码正确',
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

  .scheck .van-checkbox {
    margin-bottom: 10px;
  }
</style>