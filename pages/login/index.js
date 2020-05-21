// pages/login/index.js
// 引入封装的api
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog.js';
const api = require("../../service/http.js");
Page({

  /**
   * 页面的初始数据
   */

  data: {
    show: false,
  },
  // 获取用户手机号码
  getPhoneNumber(e) {
    var that = this
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      // 登陆功能
      wx.login({
        success: res => {
          // 把拿到的数据传给后台获取手机号码
          api.request('GET', '/volunteer/PhoneNumber', {
            'encryptedData': e.detail.encryptedData,
            'iv': e.detail.iv,
            'codes': res.code
          }).then(res => {
            // 获取到的手机号再次发送后台判断权限
            if (res.data.phoneNumber) {
              wx.setStorageSync('phone', res.data.phoneNumber)
              api.request('POST', '/volunteer/getUserByWechatNumberPhone', {
                telephone: wx.getStorageSync('phone')
              }).then(res => {
                // 接口返回成功提示用户登陆成功
                if (res.errMsg == 'request:ok') {
                  var {
                    data: {
                      results
                    }
                  } = res
                  if (results == 1) {
                    wx.reLaunch({
                      url: '../index/index'
                    })
                  } else {
                    setTimeout(() => {
                      wx.reLaunch({
                        url: '../register/index'
                      })
                    }, 3000)
                    wx.setStorageSync('flags', false)
                    Dialog.alert({
                      title: '温馨提示',
                      message: '检测您未注册！正在前往注册页！',
                    }).then(() => {});
                  }
                }

              }).catch(err => {
                Toast.fail('服务器错误，请重试！');
              })
            }
          })
        },

      })
    } else {
      Toast.fail('请先登录！');
    }
  },

  // 获取用户头像信息
  getUserInfo: function (e) {
    let that = this;
    // console.log(e)
    // 获取用户信息
    wx.getSetting({
      success(res) {
        // console.log("res", res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
             Toast.success('授权成功');
              that.setData({
                show:false
              })
                wx.setStorageSync('userImg', res.userInfo.avatarUrl)
      
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            },
            fail(res) {
              console.log("获取用户信息失败", res)
            }
          })
        } else {
          console.log("未授权=====")
          that.showSettingToast("请授权")
        }
      }
    })
  },

  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.showPopup()

    if (wx.getStorageSync('userID')) {
      wx.reLaunch({
        url: '../index/index'
      })}

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    

  },
})