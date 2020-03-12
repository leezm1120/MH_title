// pages/favor/favor.js
var mta = require('../../utils/mta_analysis.js');
var myutils = require('../../utils/myutils.js');
let context;
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    context = this;
    console.log("favor onLoad");
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
    //每次切换到收藏页面都重新加载一次收藏列表
    context.setData({
      list: myutils.favorSearch(app.globalData.titleJsonObj, app.globalData.favorArray)
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

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
})