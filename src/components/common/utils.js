import Vue from 'vue'
import Storage from 'vue-ls';
Vue.use(Storage);

let util = {
  sessionSave(key, value) {  //存储数据 浏览器关闭数据删除
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  sessionFetch(key) {  //获取数据
    return JSON.parse(sessionStorage.getItem(key)) || {}
  },
  localSave(key, value) { //存储数据  
    var curTime = new Date().getTime();
    localStorage.setItem(key, JSON.stringify({ data: value, time: curTime }));
  },
  localFetch(key) {  //获取数据 周期:一个月
    var data = localStorage.getItem(key);
    var dataObj = JSON.parse(data);

    if (data) {
      if (new Date().getTime() - dataObj.time > 2592000000) {  //1000*60*60*24*30 一个月
        return overdue;
      } else {
        return dataObj.data;
      }
    } else {
      return false;
    }

  },
  filterObj(obj1, obj2) {  //数据过滤 obj1原始数据  obj2待筛选数据
    for (let i in obj1) {
      if (obj2[i] != undefined) {
        obj1[i] = obj2[i];
      }
    }
    return obj1;
  },
  getDate(data) {  //时间戳转化为时间

    var date = new Date(data);
    const y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    let d = date.getDate();
    d = d < 10 ? "0" + d : d;
    if (data == "" || data == null) {
      return "";
    } else {
      return y + "-" + m + "-" + d;
    }
  },
  getDateFormat(date, format) {  //时间戳转化为时间
    var o = {
      "M+": date.getMonth() + 1,                 //月份   
      "d+": date.getDate(),                    //日   
      "h+": date.getHours(),                   //小时   
      "m+": date.getMinutes(),                 //分   
      "s+": date.getSeconds(),                 //秒   
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
      "S": date.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(format))
      format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return format;
  },
  getDateString(str) { //时间转化为时间戳
    let timestamp2 = Date.parse(new Date(str));
    timestamp2 = timestamp2 / 1000;
    return timestamp2;
  },
  getTree(dataClient, rootId) { //生成tree
    let treeData = [], leftData = dataClient.sort(function (a, b) { return a.pid > b.pid ? 1 : -1; });
    function getNodeArr(pid, pLeftData) {
      var retArr = [], leftDataTemp = [];
      for (var i in pLeftData) {
        var item = pLeftData[i];
        if (item.pid == pid) {
          retArr.push(item);
        } else {
          leftDataTemp.push(item);
        }
      }
      leftData = leftDataTemp;
      return retArr;
    }
    function genNodeArr(nodeArr) {
      function findNode(children, id) {
        for (var i in children) {
          var item = children[i];
          if (item.id == id) {
            return item;
          }
          if (item.children != undefined && item.children.length > 0) {
            let pNode = findNode(item.children, id);
            if (pNode != null) {
              return pNode;
            }
          }
        };
        return null;
      }
      let nodeCArr = [];
      nodeArr.forEach(item => {
        let node = {};
        node.id = item.id;
        node.pid = item.pid;
        node.title = item.menuName;
        node.expand = true;
        node.selected = false;
        node.checked = false;
        if (item.pid == rootId) {
          treeData.push(node);
          // TODO:remove
        } else {
          let fNode = findNode(treeData, item.pid);
          // parent node add to children attr
          nodeCArr.push(node);
          fNode.children = nodeCArr;
        }
      });
      nodeArr.forEach(item => {
        let cArr = getNodeArr(item.id, leftData);
        if (cArr.length > 0) {
          genNodeArr(cArr);
        }
      });
    }
    var nodeArr = getNodeArr(rootId, leftData);
    if (nodeArr.length > 0) {
      genNodeArr(nodeArr);
    }
    return treeData;
  }
};
export default {
  install: function (vm) {
    vm.prototype.$util = util;
  }
}
