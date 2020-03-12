  //index.js
  var Bmob = require('../../utils/bmob.js');
  var nBmob = require('../../utils/Bmob-1.1.1.min.js');
  var mta = require('../../utils/mta_analysis.js');
  var myutils = require('../../utils/myutils.js');
  var fsm = wx.getFileSystemManager();
  let context;
  let onlineVersion;

let versionUrl ="https://leezm.coding.net/p/MH/d/MH/git/raw/master/version";
let titleFileUrl = "https://leezm.coding.net/p/MH/d/MH/git/raw/master/allTitleList.json";

  var oldMsg = "";

  //获取应用实例
  const app = getApp()


  Page({
    data: {

      list: []
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
      //console.log(this.data.list[0].isFavor);
      //return;

      if (this.data.list[sid].isFavor == false) {
        console.log("点击收藏的ID索引:" + sid);

        //更新某个数据
        this.setData({
          [index]: true
        })

        if (app.globalData.favorArray.indexOf(context.data.list[sid].id) == -1) {
          app.globalData.favorArray.push(context.data.list[sid].id);
        }
        console.log(app.globalData.favorArray.toString());
      } else {
        console.log("点击取消收藏的ID:" + sid);

        //更新某个数据 
        this.setData({
          [index]: false
        })

        if (app.globalData.favorArray.indexOf(context.data.list[sid].id) > -1) {
          app.globalData.favorArray.splice(app.globalData.favorArray.indexOf(context.data.list[sid].id), 1);
        }
        console.log(app.globalData.favorArray.toString());
      }
    },
    btItem: function(e) {
      //console.log("选择了item");
    },
    showInput: function() {
      console.log("弹出输入");
      this.setData({
        inputShowed: true
      });
    },
    hideInput: function() {
      console.log("取消了");
      this.setData({
        inputVal: "",
        inputShowed: false
      });
    },
    clearInput: function() {
      console.log("点X清空了");
      this.setData({
        inputVal: ""
      });
    },

    inputTyping: function(e) {
      //console.log("输入了:" + e.detail.value);
      this.setData({
        inputVal: e.detail.value
      });

      oldMsg = e.detail.value;

      //1秒内无变化再搜索
      setTimeout(function() {
        var newMsg = e.detail.value;
        if (newMsg == oldMsg) {
          //console.log("1秒内无变化");
          //myutils.fuzzySearch(e.detail.value,titleJsonObj,app.globalData.favorArray);
          context.setData({
            list: myutils.fuzzySearch(e.detail.value, app.globalData.titleJsonObj, app.globalData.favorArray)
          });
        }
      }, 1000)


    },

    onShow: function() {

    },

    /**  
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      //wx.showLoading("正在加载");
      wx.showToast({
        title: '正在加载',
        icon: 'loading',
        duration: 10000
      })
      context = this;
      mta.Page.init();
      nBmob.User.auth().then(res => {
        //获取openid
        let currentUser = nBmob.User.current();
        console.log("一键登陆成功,openid:" + currentUser["authData"]["weapp"]["openid"])
        app.globalData.userOpenId = currentUser["authData"]["weapp"]["openid"];
        this.getUserInfo();
        //用户画像统计
        mta.Data.userInfo = {
          'open_id': app.globalData.userOpenId,
          'phone': app.globalData.userOpenId
        };
      }).catch(err => {
        console.log(err)
      });

      //检查线上版本  
      //查询云数据库方式
      // wx.cloud.init();
      // const db = wx.cloud.database();
      // db.collection('version').doc('1').get({
      //   success: function (res) {
      //     // res.data 包含该记录的数据
      //     console.log("版本号:"+res.data.date)
      //     onlineVersion = res.data.date;
      //     try {
      //       let localVersion = wx.getStorageSync('version')
      //       if (onlineVersion == localVersion) {
      //         //线上跟本地版本一致
      //         console.log("线上跟本地版本一致");
      //         context.onlineEqLocalVersion(true);
      //       } else {
      //         //线上跟本地版本不一致
      //         console.log("线上跟本地版本不一致");
      //         context.onlineEqLocalVersion(false);
      //       }
      //     } catch (e) {
      //       // Do something when catch error
      //     }
      //   }
      // });
      //检查线上版本  
      wx.request({
        url: versionUrl,
        success: function (res) {
          console.log(res.data)
          onlineVersion = res.data;
          try {
            let localVersion = wx.getStorageSync('version')
            if (onlineVersion == localVersion) {
              //线上跟本地版本一致
              console.log("线上跟本地版本一致");
              context.onlineEqLocalVersion(true);
            } else {
              //线上跟本地版本不一致
              console.log("线上跟本地版本不一致");
              context.onlineEqLocalVersion(false);
            }
          } catch (e) {
            // Do something when catch error
          }
        }
      })

    },

    // /**
    //  * 线上版本跟本地版本是否一致
    //  */
    // onlineEqLocalVersion: function(isEq) {
    //   //获取已经下载的文件
    //   wx.getSavedFileList({
    //     success: function(fileres) {
    //       console.log("fileList:" + fileres.fileList.length);
    //       //如果缓存文件列表长度为0则下载
    //       if (fileres.fileList.length == 0) {
    //         //下载数据库
    //         context.downloadSJK();
    //       } else {
    //         //如果版本一致就读取文件内容 
    //         if (isEq) {
    //           console.log("读取文件内容:" + fileres.fileList[0].filePath);
    //           fsm.readFile({
    //             filePath: fileres.fileList[0].filePath,
    //             encoding: "utf8",
    //             success: function(res) {
    //               //console.log(res.data);
    //               //string 转 json
    //               app.globalData.titleJsonObj = JSON.parse(res.data); //转换为json对象
    //               //wx.hideLoading();
    //               wx.hideToast();
    //             },
    //             fail: function(res) {
    //               console.log(res.errMsg);
    //             }
    //           });
    //         } else {
    //           //版本不一致 删除再下载
    //           wx.removeSavedFile({
    //             filePath: fileres.fileList[0].filePath,
    //             complete: function(res) {
    //               console.log("删除结果:" + res)
    //               //重新下载
    //               context.downloadSJK();
    //             }
    //           })
    //         }
    //       }
    //     }
    //   })
    // },

    /**
         * 线上版本跟本地版本是否一致
         */
    onlineEqLocalVersion: function (isEq) {
      //获取已经下载的文件
      wx.getSavedFileList({
        success: function (fileres) {
          console.log("fileList:" + fileres.fileList.length);
          //如果缓存文件列表长度为0则下载
          if (fileres.fileList.length == 0) {
            //下载数据库
            context.downloadSJK();
          } else {
            //如果版本一致就读取文件内容 
            if (isEq) {
              console.log("读取文件内容:" + fileres.fileList[0].filePath);
              fsm.readFile({
                filePath: fileres.fileList[0].filePath,
                encoding: "utf8",
                success: function (res) {
                  //console.log(res.data);
                  //string 转 json
                  app.globalData.titleJsonObj = JSON.parse(res.data); //转换为json对象
                  //wx.hideLoading();
                  wx.hideToast();
                },
                fail: function (res) {
                  console.log(res.errMsg);
                }
              });
            } else {
              //版本不一致 删除再下载
              wx.removeSavedFile({
                filePath: fileres.fileList[0].filePath,
                complete: function (res) {
                  console.log("删除结果:" + res)
                  //重新下载
                  context.downloadSJK();
                }
              })
            }
          }
        }
      })
    },

    // /**
    //  * 下载数据库
    //  */
    // downloadSJK: function() {
    //   wx.cloud.init();
    //   wx.cloud.downloadFile({
    //     fileID: 'cloud://data-499b0a.8aaf-data-499b0a-1257594318/allTitleList.json', // 文件 ID
    //     success: function(res) {
    //       fsm.readFile({
    //         filePath: res.tempFilePath,
    //         encoding: "utf8",
    //         success: function(res) {
    //           //console.log(res.data);
    //           //string 转 json
    //           app.globalData.titleJsonObj = JSON.parse(res.data); //转换为json对象
    //           //wx.hideLoading();
    //           wx.hideToast();
    //         },
    //         fail: function(res) {
    //           console.log(res.errMsg);
    //         }
    //       });

    //       wx.saveFile({
    //         tempFilePath: res.tempFilePath,
    //         success: function(res) {
    //           console.log("savedFilePath:" + res.savedFilePath);
    //         }
    //       })

    //       wx.setStorage({
    //         key: 'version',
    //         data: onlineVersion,
    //       })

    //     },fail: function (res) {
    //       console.log(res.errMsg);
    //     }
    //   })
    // },

    /**
     * 下载数据库
     */
    downloadSJK: function () {
      wx.downloadFile({
        url: titleFileUrl,
        success: function (res) {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {

            fsm.readFile({
              filePath: res.tempFilePath,
              encoding: "utf8",
              success: function (res) {
                //console.log(res.data);
                //string 转 json
                app.globalData.titleJsonObj = JSON.parse(res.data); //转换为json对象
                //wx.hideLoading();
                wx.hideToast();
              },
              fail: function (res) {
                console.log(res.errMsg);
              }
            });

            wx.saveFile({
              tempFilePath: res.tempFilePath,
              success: function (res) {
                console.log("savedFilePath:" + res.savedFilePath);
              }
            })

            wx.setStorage({
              key: 'version',
              data: onlineVersion,
            })
          }
        }
      })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    /**
     * 生命周期函数--监听页面隐藏 
     */
    onHide: function() {

    },


    getUserInfo: function() {
      //console.log("调用了getUserInfo:" + app.globalData.userOpenId);
      //查询是否是新用户
      var UserInfo = Bmob.Object.extend("UserInfo");
      var query = new Bmob.Query(UserInfo);
      query.equalTo("wx_openid", app.globalData.userOpenId);
      query.find({
        success: function(results) {
          console.log("results:" + results.length);
          if (results.length == 0) {
            //新用户，提交用户信息
            wx.getSystemInfo({
              success: function(res) {
                context.addUserInfo(res);
              },
            })
          } else {
            console.log("已注册用户");
            //获取已注册用户的收藏头衔ID
            for (var i = 0; i < results.length; i++) {
              var object = results[i];
              app.globalData.userOenIdObjectId = object.id;
              //console.log("用户的objectid：" + app.globalData.userOenIdObjectId);
              console.log("用户的收藏ID：" + object.get("favor_id"));
              app.globalData.favorArray = myutils.stringToArray(object.get("favor_id"), ",")
              if (app.globalData.favorArray == "") {
                console.log("获取不到用户收藏的ID");
                wx.getStorage({
                  key: 'userFavor',
                  success: function(res) {
                    console.log("缓存ID：" + res.data)
                  }
                })
              }

              context.setData({
                list: myutils.fuzzySearch("", app.globalData.titleJsonObj, app.globalData.favorArray)
              });

              // console.log("app.globalData.favorArray:" + app.globalData.favorArray);
            }
          }
        },
        error: function(error) {
          console.log("查询失败: " + error.code + " " + error.message);
          context.getUserInfo();
        }
      });
    },
    addUserInfo: function(wxres) {
      //新增用户 

      var UserInfo = Bmob.Object.extend("UserInfo");
      var query = new UserInfo;
      query.set("brand", wxres.brand);
      query.set("model", wxres.model);
      query.set("pixelRatio", wxres.pixelRatio);
      query.set("screenWidth", wxres.screenWidth);
      query.set("screenHeight", wxres.screenHeight);
      query.set("windowWidth", wxres.windowWidth);
      query.set("windowHeight", wxres.windowHeight);
      query.set("statusBarHeight", wxres.statusBarHeight);
      query.set("language", wxres.language);
      query.set("version", wxres.version);
      query.set("system", wxres.system);
      query.set("platform", wxres.platform);
      query.set("fontSizeSetting", wxres.fontSizeSetting);
      query.set("SDKVersion", wxres.SDKVersion);
      query.set("wx_openid", app.globalData.userOpenId);
      query.set("favor_id", "");
      query.save(null, {
        success: function(query) {
          console.log("新用户注册成功");
          console.log("设置新用户的objectid:" + query.id);
          app.globalData.userOenIdObjectId = query.id;
        },
        error: function(query, error) {}
      });
    }
  })