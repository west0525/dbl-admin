/**
 * 时间面板设置
 */

export const pickerOptions = [{
        text: "今天",
        onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime());
            picker.$emit('pick', [start, end]);
        }
    },
    {
        text: "昨天",
        onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setDate(start.getDate() - 1);
            end.setDate(end.getDate() - 1);
            picker.$emit('pick', [start, end]);
        }
    },
    {
        text: "最近七天",
        onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
        }
    },
    {
        text: "最近30天",
        onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
        }
    },
    {
        text: "本月",
        onClick(picker) {
            const start = new Date();
            const end = new Date(start);
            end.setMonth(start.getMonth() + 1);
            end.setDate(0);
            start.setDate(1);
            picker.$emit('pick', [start, end]);
        }
    },
    {
        text: "上个月",
        onClick(picker) {
            const start = new Date();
            const end = new Date(start);
            end.setMonth(start.getMonth());
            start.setMonth(start.getMonth() - 1);
            end.setDate(0);
            start.setDate(1);
            picker.$emit('pick', [start, end]);
        }
    },
    {
        text: "去年",
        onClick(picker) {
            const endYear = new Date().getFullYear() - 1;
            const startYear = new Date().getFullYear() - 1;
            const start = new Date(startYear, 0, 1);
            const end = new Date(endYear, 11, 31);
            picker.$emit('pick', [start, end]);
        }
    },
    {
        text: "今年",
        onClick(picker) {
            const endYear = new Date().getFullYear();
            const startYear = new Date().getFullYear();
            const start = new Date(startYear, 0, 1);
            const end = new Date(endYear, 11, 31);
            picker.$emit('pick', [start, end]);
        }
    },
    {
        text: "最近一年",
        onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setFullYear(start.getFullYear() - 1);
            picker.$emit('pick', [start, end]);
        }
    },
];

/**
 * tree 形结构格式化
 * @param {any} data 
 */
export const initTree = {

}

/**
 * 判断是否是数组
 * @param {Array} arr 
 */
export const isArray = (arr) => {
    return Object.prototype.toString.call(arr) == '[object Array]'
}

/**
 * 手机号屏蔽
 */
export const hidePhone = (num) => {
    if (num) {
        let newNum = String(num);
        return newNum.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');
    }
}
/**
 * 时间格式转化
 * @param {Array} arr 
 */
export const dateReturn1 = (date1) => {
    date1.toLocaleString("en-US", {
        hour12: false
    }).replace(/\b\d\b/g, '0><').replace(new RegExp('/', 'gm'), '-');
}
/**
 * 十五分钟倒计时
 * @param {Array}string
 */
export const fiftyDate = () => {
    let now = new Date();
    var hour = now.getHours();
    var minu = now.getMinutes();
    var sec = now.getSeconds();
    if (hour < 10) hour = "0" + hour;

    if (minu < 10) minu = "0" + minu;

    if (sec < 10) sec = "0" + sec;
    var time = "";
    time = hour + ":" + minu + ":" + sec
    console.info('倒计时--->', time);
}

/**
 * 输入框单字节计算
 * @param string
 */
export const strSubleng = (str) => {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) { //单字节加1
            len++;
        } else {
            len += 2;
        }
    }
    return len;
}
/**
 * 截取路由参数
 * @param string
 */
export const subparams = (str) => {
    //let search = location.search;
    let params = {};
    if (str != "") {
        str.slice(1).split("&").forEach((v) => {
            let arr = v.split("=");
            params[arr[0]] = arr[1];
        })
    }
    return params;
}

/**
 * get url 对象序列化
 * @param string
 */
export const http_builder_url = (url, data) => {
    if (typeof (url) == 'undefined' || url == null) {
        return '';
    }
    if (typeof (data) == 'undefined' || data == null || typeof (data) != 'object') {
        return '';
    }
    url += (url.indexOf("?") != -1) ? "" : "?";
    for (var k in data) {
        url += ((url.indexOf("=") != -1) ? "&" : "") + k + "=" + encodeURI(data[k]);
    }
    return url;
}

/**
 * 存储localStorage
 * @param {any} data 
 */
export const setStore = (name, content) => {
    if (!name) return
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}
/**
 * 获取localStorage
 * @param {any} data 
 */
export const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
}
/**
 *删除localStorage
 * @param {any} data 
 */
export const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
}

/**
 *去除字符串中逗号
 * @param {any} data 
 */
export const clear = str => {
    str = str.replace(/,/g, '')
    return str;
}

/**
 * 全屏显示
 * @param {any} data 
 */
export const requestFullScreen = () => {
    let elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen()
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen()
    } else if (elem.webkitRequestFullScreen) {
        elem.webkitRequestFullScreen()
    } else if (elem.msRequestFullscreen) {
        document.body.msRequestFullscreen()
    }
}
/**
 * 退出全屏
 * @param {any} data 
 */
export const exitFullscreen = () => {
    let doc = document
    if (doc.exitFullscreen) {
        doc.exitFullscreen()
    } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen()
    } else if (doc.webkitCancelFullScreen) {
        doc.webkitCancelFullScreen()
    } else if (doc.msExitFullscreen) {
        document.msExitFullscreen()
    }
}


/**
 * 获取号码前缀
 * @param {Number} phoneNum 
 */
export const queryByPhoneNum = (phoneNum) => {
    return new Promise((resolve, reject) => {
        let params = {
            phone_number: phoneNum
        }
        resolve();
    })

}

/**
 * 将简单数据格式转换成嵌套的数据格式
 * @param {Object} setting 
 * @param {Array} sNodes 
 */
export const transformTozTreeFormat = (sNodes, setting = {}) => {
    var i, l,
        key = setting.idKey || 'id',
        parentKey = setting.parentKey || 'parentId',
        childKey = setting.childKey || 'children';
    if (!key || key == "" || !sNodes) return [];

    if (Array.isArray(sNodes)) {
        var r = [];
        var tmpMap = {};
        for (i = 0, l = sNodes.length; i < l; i++) {
            tmpMap[sNodes[i][key]] = sNodes[i];
        }
        for (i = 0, l = sNodes.length; i < l; i++) {
            if (tmpMap[sNodes[i][parentKey]] && sNodes[i][key] != sNodes[i][parentKey]) {
                if (!tmpMap[sNodes[i][parentKey]][childKey])
                    tmpMap[sNodes[i][parentKey]][childKey] = [];
                tmpMap[sNodes[i][parentKey]][childKey].push(sNodes[i]);
            } else {
                r.push(sNodes[i]);
            }
        }
        return r;
    } else {
        return [sNodes];
    }
}

/**
 * 将嵌套的数据格式转换成简单数据格式
 * @param {Object} setting 
 * @param {Array} nodes 
 */
export const transformToArrayFormat = (nodes, setting = {}) => {
    if (!nodes) return [];
    var childKey = setting.childKey || 'children',
        r = [];
    if (isArray(nodes)) {
        for (var i = 0, l = nodes.length; i < l; i++) {
            r.push(nodes[i]);
            if (nodes[i][childKey])
                r = r.concat(transformToArrayFormat(nodes[i][childKey], setting));
        }
    } else {
        r.push(nodes);
        if (nodes[childKey])
            r = r.concat(transformToArrayFormat(nodes[childKey], setting));
    }
    return r;
}

/**将对象转换成url查询格式
 * 
 * @param {} url 
 * @param {*} data 
 */
export const changeParam = (url, data) => {
    if (typeof (url) == 'undefined' || url == null) {
        return '';
    }
    if (typeof (data) == 'undefined' || data == null || typeof (data) != 'object') {
        return '';
    }
    url += (url.indexOf("?") != -1) ? "" : "?";
    for (var k in data) {
        url += ((url.indexOf("=") != -1) ? "&" : "") + k + "=" + encodeURI(data[k]);
    }
    return url;
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'deepClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach(keys => {
        if (source[keys] && typeof source[keys] === 'object') {
            targetObj[keys] = deepClone(source[keys])
        } else {
            targetObj[keys] = source[keys]
        }
    })
    return targetObj
}

/**
 * 生成随机图片
 */
export function randomImage(width = 200, height = 200) {
    return `https://picsum.photos/${width}/${height}?random=${new Date().getTime()}`
}