function getMsg() {
  return "aaa";
}


//获取收藏列表搜索
function favorSearch(titleJsonObj, favorArray) {
  let sy = -1;
  let temp = []
  let isFavorit = true;
  for (let i = 0; i < titleJsonObj.length; i++) {
    if (favorArray.indexOf(titleJsonObj[i].title_id) > -1) {
      sy++;

      objectPutTemp(temp, titleJsonObj, i, sy, isFavorit);

    }
  }
  console.log("temp.length:" + temp.length);
  wx.showToast({
    title: '已更新' + temp.length + "条收藏",
    icon: 'none',
    duration: 1000
  })
  return temp;
}

//筛选搜索
function selectSearch(select_role, select_type, select_shuxing, titleJsonObj, favorArray) {
  let sy = -1;
  let temp = []
  let isFavorit = false;

  //全部全选
  if (select_role == "全部" && select_type == "全部" && select_shuxing == "全部") {
    console.log("selectSearch 1");
    for (let i = 0; i < titleJsonObj.length; i++) {
      sy++;
      isFavorit = false;
      //console.log("object.id:" + FavorArray.indexOf(object.id));
      if (favorArray.indexOf(titleJsonObj[i].title_id) > -1) {
        isFavorit = true
      }
      if (sy >= 500) {
        break;
      }
      objectPutTemp(temp, titleJsonObj, i, sy, isFavorit);
    }

  }
  //全部角色 类型条件 属性全部
  if (select_role == "全部" && select_type != "全部" && select_shuxing == "全部") {
    console.log("selectSearch 2");
    for (let i = 0; i < titleJsonObj.length; i++) {
      if (select_type == titleJsonObj[i].type) {
        sy++;
        isFavorit = false;
        //console.log("object.id:" + FavorArray.indexOf(object.id));
        if (favorArray.indexOf(titleJsonObj[i].title_id) > -1) {
          isFavorit = true
        }
        if (sy >= 500) {
          break;
        }
        objectPutTemp(temp, titleJsonObj, i, sy, isFavorit);
      }
    }
  }

  //全部角色 全部条件 属性条件
  if (select_role == "全部" && select_type == "全部" && select_shuxing != "全部") {
    console.log("selectSearch 3");
    for (let i = 0; i < titleJsonObj.length; i++) {
      if (shuxingReturn(select_shuxing, titleJsonObj[i]) != null && shuxingReturn(select_shuxing, titleJsonObj[i]) != "") {
        sy++;
        isFavorit = false;
        //console.log("object.id:" + FavorArray.indexOf(object.id));
        if (favorArray.indexOf(titleJsonObj[i].title_id) > -1) {
          isFavorit = true
        }
        if (sy >= 500) {
          break;
        }
        objectPutTemp(temp, titleJsonObj, i, sy, isFavorit);
      }
    }
  }

  //全部角色 类型条件 属性条件
  if (select_role == "全部" && select_type != "全部" && select_shuxing != "全部") {
    console.log("selectSearch 4");
    for (let i = 0; i < titleJsonObj.length; i++) {
      if (shuxingReturn(select_shuxing, titleJsonObj[i]) != null && shuxingReturn(select_shuxing, titleJsonObj[i]) != "" && select_type == titleJsonObj[i].type) {
        sy++;
        isFavorit = false;
        //console.log("object.id:" + FavorArray.indexOf(object.id));
        if (favorArray.indexOf(titleJsonObj[i].title_id) > -1) {
          isFavorit = true
        }
        if (sy >= 500) {
          break;
        }
        objectPutTemp(temp, titleJsonObj, i, sy, isFavorit);
      }
    }
  }

  //角色部分 其他全部
  if (select_role != "全部" && select_type == "全部" && select_shuxing == "全部") {
    console.log("selectSearch 5");
    for (let i = 0; i < titleJsonObj.length; i++) {
      if (titleJsonObj[i].role == "无" || select_role == titleJsonObj[i].role) {
        sy++;
        isFavorit = false;
        //console.log("object.id:" + FavorArray.indexOf(object.id));
        if (favorArray.indexOf(titleJsonObj[i].title_id) > -1) {
          isFavorit = true
        }
        if (sy >= 500) {
          break;
        }
        objectPutTemp(temp, titleJsonObj, i, sy, isFavorit);
      }
    }
  }

  //角色部分 类型全部  属性部分
  if (select_role != "全部" && select_type == "全部" && select_shuxing != "全部") {
    console.log("selectSearch 6");
    for (let i = 0; i < titleJsonObj.length; i++) {
      if ((titleJsonObj[i].role == "无" || select_role == titleJsonObj[i].role) && shuxingReturn(select_shuxing, titleJsonObj[i]) != null && shuxingReturn(select_shuxing, titleJsonObj[i]) != "") {
        sy++;
        isFavorit = false;
        //console.log("object.id:" + FavorArray.indexOf(object.id));
        if (favorArray.indexOf(titleJsonObj[i].title_id) > -1) {
          isFavorit = true
        }
        if (sy >= 500) {
          break;
        }
        objectPutTemp(temp, titleJsonObj, i, sy, isFavorit);
      }
    }
  }

  //角色部分 类型部分  属性部分
  if (select_role != "全部" && select_type != "全部" && select_shuxing != "全部") {
    console.log("selectSearch 7");
    for (let i = 0; i < titleJsonObj.length; i++) {
      if ((titleJsonObj[i].role == "无" || select_role == titleJsonObj[i].role) && shuxingReturn(select_shuxing, titleJsonObj[i]) != null && shuxingReturn(select_shuxing, titleJsonObj[i]) != "" && select_type == titleJsonObj[i].type) {
        sy++;
        isFavorit = false;
        //console.log("object.id:" + FavorArray.indexOf(object.id));
        if (favorArray.indexOf(titleJsonObj[i].title_id) > -1) {
          isFavorit = true
        }
        if (sy >= 500) {
          break;
        }
        objectPutTemp(temp, titleJsonObj, i, sy, isFavorit);
      }
    }
  }

  //角色部分 类型部分  属性全部
  if (select_role != "全部" && select_type != "全部" && select_shuxing == "全部") {
    console.log("selectSearch 8");
    for (let i = 0; i < titleJsonObj.length; i++) {
      if ((titleJsonObj[i].role == "无" || select_role == titleJsonObj[i].role) && select_type == titleJsonObj[i].type) {
        sy++;
        isFavorit = false;
        //console.log("object.id:" + FavorArray.indexOf(object.id));
        if (favorArray.indexOf(titleJsonObj[i].title_id) > -1) {
          isFavorit = true
        }
        if (sy >= 500) {
          break;
        }
        objectPutTemp(temp, titleJsonObj, i, sy, isFavorit);
      }
    }
  }

  console.log("temp.length:" + temp.length);

  wx.showToast({
    title: '共筛选到' + temp.length + "条结果",
    icon: 'none',
    duration: 1000
  })
  return temp;
}

//属性中文返回英文
function shuxingReturn(str, shuxingObject) {
  if (str == "力量") {
    return shuxingObject.liliang;
  }
  if (str == "智力") {
    return shuxingObject.zhili;
  }
  if (str == "敏捷") {
    return shuxingObject.minjie;
  }
  if (str == "意志") {
    return shuxingObject.yizhi;
  }
  if (str == "平衡") {
    return shuxingObject.pingheng;
  }
  if (str == "暴击") {
    return shuxingObject.baoji;
  }
  if (str == "物攻") {
    return shuxingObject.wugong;
  }
  if (str == "魔攻") {
    return shuxingObject.mogong;
  }
  if (str == "生命值") {
    return shuxingObject.shengmingzhi;
  }
}

//模糊搜索
function fuzzySearch(str, titleJsonObj, favorArray) {
  let titleLength = 0;
  if (str == "") {
    titleLength = 50 ;
  }else{
    titleLength = titleJsonObj.length;
  }
  let sy = -1;
  let temp = []
  let isFavorit = false;

  for (let i = 0; i < titleLength; i++) {
    if (titleJsonObj[i].title.indexOf(str) >= 0) {
      console.log("模糊搜索匹配成功:" + i + " " + titleJsonObj[i].title);
      sy++;
      isFavorit = false;
      //console.log("object.id:" + FavorArray.indexOf(object.id));
      if (favorArray.indexOf(titleJsonObj[i].title_id) > -1) {
        isFavorit = true
      }
      objectPutTemp(temp, titleJsonObj, i, sy, isFavorit);
    }
  }
  console.log("temp.length:" + temp.length);
  if (str!=""){
  wx.showToast({
    title: '共搜索到' + temp.length + "条结果",
    icon: 'none',
    duration: 1000
  })
  }
  return temp;
}

//object put temp
function objectPutTemp(temp, titleJsonObj, i, sy, isFavorit) {
  //console.log("object put temp");
  temp.push({
    id: titleJsonObj[i].title_id,
    name: titleJsonObj[i].title,
    suoyin: sy,
    open: false,
    isFavor: isFavorit,
    title: ['头衔属性:', '获取方法:', '职业限定:', '头衔类型:'],
    desc: [formatShuxing(titleJsonObj[i].liliang, titleJsonObj[i].zhili, titleJsonObj[i].minjie, titleJsonObj[i].yizhi, titleJsonObj[i].baoji, titleJsonObj[i].pingheng, titleJsonObj[i].shengmingzhi, titleJsonObj[i].wugong, titleJsonObj[i].mogong), titleJsonObj[i].channel, titleJsonObj[i].role, titleJsonObj[i].type]
  })
}

//字符串转数组
function stringToArray(str, substr) {
  var arrTmp = new Array();
  if (substr == "") {
    arrTmp.push(str);
    return arrTmp;
  }
  var i = 0,
    j = 0,
    k = str.length;
  while (i < k) {
    j = str.indexOf(substr, i);
    if (j != -1) {
      if (str.substring(i, j) != "") {
        arrTmp.push(str.substring(i, j));
      }
      i = j + 1;
    } else {
      if (str.substring(i, k) != "") {
        arrTmp.push(str.substring(i, k));
      }
      i = k;
    }
  }
  return arrTmp;
}

//数据递归去重
function formatArray(arrTmp) {
  let arr = arrTmp,
    len = arr.length;
  arr.sort(function(a, b) { //对数组进行排序才能方便比较
    return a - b;
  })

  function loop(index) {
    if (index >= 1) {
      if (arr[index] === arr[index - 1]) {
        arr.splice(index, 1);
      }
      loop(index - 1); //递归loop函数进行去重
    }
  }
  loop(len - 1);
  return arr;
}

//格式化属性显示
function formatShuxing(liliang, zhili, minjie, yizhi, baoji, pingheng, shengmingzhi, wugong, mogong) {
  let msg = "";
  if (liliang != null && liliang != "") {
    msg = msg + "力量+" + liliang + "　"
  }
  if (zhili != null && zhili != "") {
    msg = msg + "智力+" + zhili + "　"
  }
  if (minjie != null && minjie != "") {
    msg = msg + "敏捷+" + minjie + "　"
  }
  if (yizhi != null && yizhi != "") {
    msg = msg + "意志+" + yizhi + "　"
  }
  if (baoji != null && baoji != "") {
    msg = msg + "暴击+" + baoji + "　"
  }
  if (pingheng != null && pingheng != "") {
    msg = msg + "平衡+" + pingheng + "　"
  }
  if (shengmingzhi != null && shengmingzhi != "") {
    msg = msg + "生命值+" + shengmingzhi + "　"
  }
  if (wugong != null && wugong != "") {
    msg = msg + "物攻+" + wugong + "　"
  }
  if (mogong != null && mogong != "") {
    msg = msg + "魔攻+" + mogong + "　"
  }
  //console.log(msg); 
  if (msg == "" || msg == "　") {
    msg = "无"
  }
  return msg;
}


module.exports = {
  getMsg: getMsg,
  formatShuxing: formatShuxing,
  formatArray: formatArray,
  stringToArray: stringToArray,
  fuzzySearch: fuzzySearch,
  selectSearch: selectSearch,
  favorSearch: favorSearch
}