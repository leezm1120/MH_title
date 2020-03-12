// pages/screen/screen.js
var Bmob = require('../../utils/bmob.js');
var mta = require('../../utils/mta_analysis.js');
var myutils = require('../../utils/myutils.js');
var fsm = wx.getFileSystemManager();
var titleJsonObj;
let context;
var roleArray = ['全部', '利斯塔', '菲欧娜', '伊菲', '卡鲁', '凯伊', '维拉', '霍克', '琳', '艾莉莎', '海基', '黛莉娅', '芈璃', '格雷','缪尔','贝拉','蕾希'];
var typeArray = ['全部', 'PVP', 'YY', '道具', '副本', '功绩', '活动', '技能', '剧情', '破坏', '其他', '套装', '外传', '小怪', '远征团'];
var shuxingArray = ['全部', '力量', '智力', '敏捷', '意志', '平衡', '暴击', '物攻', '魔攻', '生命值'];
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    multiArray: [roleArray, typeArray, shuxingArray],
    multiIndex: [0, 0, 0],
    roleSelect: "",
    typeSelect: "",
    shuxingSelect: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    context = this;
    mta.Page.init();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //获取上次选择的值
    wx.getStorage({
      key: 'screenSelect',
      success: function(res) {
        console.log('screenSelect:' + res.data)
        if (res != null && res != "") {
          context.setData({
            multiIndex: res.data,
            roleSelect: roleArray[res.data[0]],
            typeSelect: typeArray[res.data[1]],
            shuxingSelect: shuxingArray[res.data[2]]
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    //保存上次选择的值
    wx.setStorage({
      key: "screenSelect",
      data: context.data.multiIndex
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  kindToggle: function(e) {
    var id = e.currentTarget.id,
      list = context.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    context.setData({
      list: list
    });
    console.log("选择了列表:" + id);
  },

  btItem: function(e) {
    //console.log("选择了item");
  },
  btFavor: function(e) {
    let sid = e.currentTarget.id;
    console.log("索引ID:" + sid);
    //console.log("索引：" + app.globalData.favorArray.indexOf(id));
    var index = "list[" + sid + "].isFavor";
    console.log(index);
    //console.log([index]);

    //index = "list[" + context.data.list.isFavor.indexOf(id) + "].isFavor";
    //console.log(context.data.list[0].isFavor);
    //return;

    if (context.data.list[sid].isFavor == false) {
      console.log("点击收藏的ID索引:" + sid);

      //更新某个数据
      context.setData({
        [index]: true
      })

      if (app.globalData.favorArray.indexOf(context.data.list[sid].id) == -1) {
        app.globalData.favorArray.push(context.data.list[sid].id);
      }
      console.log(app.globalData.favorArray.toString());
    } else {
      console.log("点击取消收藏的ID:" + sid);

      //更新某个数据 
      context.setData({
        [index]: false
      })

      if (app.globalData.favorArray.indexOf(context.data.list[sid].id) > -1) {
        app.globalData.favorArray.splice(app.globalData.favorArray.indexOf(context.data.list[sid].id), 1);
      }
      console.log(app.globalData.favorArray.toString());
    }
  },

  bindMultiPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log('选择的参数为:' + roleArray[e.detail.value[0]] + ',' + typeArray[e.detail.value[1]] + ',' + shuxingArray[e.detail.value[2]]);
    context.setData({
      multiIndex: e.detail.value,
      roleSelect: roleArray[e.detail.value[0]],
      typeSelect: typeArray[e.detail.value[1]],
      shuxingSelect: shuxingArray[e.detail.value[2]]
    })

    //根据选择值进行筛选
    // myutils.selectSearch(roleArray[e.detail.value[0]], typeArray[e.detail.value[1]], shuxingArray[e.detail.value[2]], app.globalData.titleJsonObj, app.globalData.favorArray);

    context.setData({
      list: myutils.selectSearch(roleArray[e.detail.value[0]], typeArray[e.detail.value[1]], shuxingArray[e.detail.value[2]], app.globalData.titleJsonObj, app.globalData.favorArray)
    });

    // context.setData({
    //   list: myutils.fuzzySearch("！", app.globalData.titleJsonObj, app.globalData.favorArray)
    // });

  },


})