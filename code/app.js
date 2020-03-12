//app.js
var nBmob = require('utils/Bmob-1.1.1.min.js');
var Bmob = require('utils/bmob');
var mta = require('utils/mta_analysis.js'); 
var myutils = require('/utils/myutils.js');
var context;

App({
  onLaunch: function() {
    //腾讯云统计
    mta.App.init({
      "appID": "500633411",
    });  
    context = this;
    nBmob.initialize("d0f06d155ae1c832a19783c7d6bdd0a7", "1e723a4b5b7ece3a955120a5ea915781");
    Bmob.initialize("d0f06d155ae1c832a19783c7d6bdd0a7", "1e723a4b5b7ece3a955120a5ea915781");
  },
  globalData: {
    userInfo: null,
    userOpenId: "",
    userOenIdObjectId: "",
    clipboardData:'',
    screenHeight: 1000,
    favorString:"",
    favorArray:"",
    titleJsonObj:null
  },
  onHide: function() {
    console.log("app onhide");

    //数据去重
    context.globalData.favorArray = myutils.formatArray(context.globalData.favorArray);
    context.globalData.favorString = context.globalData.favorArray.toString();
    console.log("onHide数据去重:" + context.globalData.favorString);
    wx.setStorage({ 
      key: "userFavor",
      data: context.globalData.favorString
    })
    //页面后台时上传收藏的信息
    //app.globalData.userOenIdObjectId
    let query1 = nBmob.Query("UserInfo");
    query1.get(context.globalData.userOenIdObjectId).then(res => {
      //console.log(res)
      res.set('favor_id', context.globalData.favorString)
      res.save()
    }).catch(err => { 
      console.log(err) 
    })
  }
})