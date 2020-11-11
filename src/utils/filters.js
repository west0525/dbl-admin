
import moment from 'moment';

const filters = {
    /**
     * 字典项显示
     * @param {String} val
     * @param {Array} list
     */
    dic: (val, list) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i].value == val) {
                return list[i].label
            }
        }
        return val
    },
    // 日期格式化
    formatDt: (time) => {
        if (!time) return
        //if(time == null ) return
        return moment(Number(time)).format('YYYY-MM-DD')
    },

    // 时间格式化
    formatTm: (time) => {
        if (!time) return
        return moment(Number(time)).format('HH:mm:ss')
    },

    // 时间格式化
    formatHm: (time) => {
        if (!time) return
        return moment(Number(time)).format('HH:mm')
    },

    // 日期时间时间格式化
    formatDttm: (time) => {
        if (!time) return
        return moment(Number(time)).format('YYYY-MM-DD HH:mm:ss')
    },

    // 日期时间时间格式化
    formatDttmm: (time) => {
        if (!time) return
        return moment(Number(time)).format('YYYY-MM-DD HH:mm')
    },

    // 时间 转化成时分
    formatDthm: (time) => {
        if (!time) return
        return moment(Number(time)).format('YYYY-MM-DD HH:mm')
    },

    //秒转换为00:00:00
    formatSeconds: (value) => {
        if(!value) return 0;
        let secondTime = parseInt(value);// 秒
        let minuteTime = 0;             // 分
        let hourTime = 0;              // 小时
        if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
            //获取分钟，除以60取整数，得到整数分钟
            minuteTime = parseInt(secondTime / 60);
            //获取秒数，秒数取佘，得到整数秒数
            secondTime = parseInt(secondTime % 60);
            //如果分钟大于60，将分钟转换成小时
            if(minuteTime > 60) {
                //获取小时，获取分钟除以60，得到整数小时
                hourTime = parseInt(minuteTime / 60);
                //获取小时后取佘的分，获取分钟除以60取佘的分
                minuteTime = parseInt(minuteTime % 60);
            }
        }
        let result = "" + parseInt(secondTime) + "秒";

        if(minuteTime > 0) {
            result = "" + parseInt(minuteTime) + "分" + result;
        }
        if(hourTime > 0) {
            result = "" + parseInt(hourTime) + "小时" + result;
        }
        return result;
    },

    // 毫秒 转化为 时分秒 (39000 => 00:00:39)
    formatmmTomin: (time) => {
        if(!time && time != 0) return 0;
        let date = new Date(0, 0);
        date.setMilliseconds(time);
        let newTime = moment(date).format('HH:mm:ss');
        return newTime
    },

    // 秒 转化为 时分秒
    secondTohms: (time) => {
        if(!time && time != 0) return time;
        let date = new Date(0, 0);
        date.setMilliseconds(time*1000);
        let newTime = moment(date).format('HH:mm:ss');
        return newTime
    },

    //时分秒 转为秒
    makeDurationToSeconds: (time) => {
        let str = time;
        let arr = str.split(':');
        let hs = parseInt(arr[0]*3600);
        let ms = parseInt(arr[1]*60);
        let ss = parseInt(arr[2]);
        let seconds = hs + ms + ss;
        return seconds;
    },

    /**
     * 内容超长后显示指定的长度和省略号
     */
    strLength: (val, len) => {
        if (!val || !len) return val
        if (val.length <= len) {
            return val
        } else {
            let newStr = val.substring(0, len);
            return newStr + '...'
        }
    },

    // 金额格式化  123，234.00F
    numberFormat: (number, decimals=2, dec_point='.', thousands_sep=',') => {
        /*
        * 参数说明：
        * number：要格式化的数字
        * decimals：保留几位小数
        * dec_point：小数点符号
        * thousands_sep：千分位符号
        * */
        number = (number + '').replace(/[^0-9+-Ee.]/g, '');
        var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
            dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
            s = '',
            toFixedFix = function (n, prec) {
                var k = Math.pow(10, prec);
                return '' + Math.ceil(n * k) / k;
            };
    
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        var re = /(-?\d+)(\d{3})/;
        while (re.test(s[0])) {
            s[0] = s[0].replace(re, "$1" + sep + "$2");
        }
    
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    }
}

export default {
    install: function(Vue) {
        Object.keys(filters).forEach(key => {
            Vue.filter(key, filters[key])
        })
    }

}


