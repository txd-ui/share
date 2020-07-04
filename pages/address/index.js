const api = require("../../service/http.js");
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: '',
    address: '',
    postalCode: '',
    cneePhone: '',
    cneeName: ''
  },
  aaaaaaa() {
    var that = this
    wx.getSetting({
      success(res) {
        console.log(res)
        console.log("vres.authSetting['scope.address']：", res.authSetting['scope.address'])
        if (res.authSetting['scope.address']) {
          wx.chooseAddress({
            success(res) {
              wx.setStorageSync('data', {
                cneeName: res.userName,
                postalCode: res.postalCode,
                provinceName: res.provinceName,
                region: res.provinceName + '-' + res.cityName + '-' + res.countyName,
                nationalCode: res.nationalCode,
                address: res.detailInfo,
                cneePhone: res.telNumber
              })
              var data = wx.getStorageSync('data')
              that.setData({
                cneeName: data.cneeName,
                postalCode: data.postalCode,
                provinceName: data.provinceName,
                region: data.region,
                nationalCode: data.nationalCode,
                address: data.address,
                cneePhone: data.cneePhone,
              })
            }
          })
          // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问

        } else {
          if (res.authSetting['scope.address'] == false) {
            wx.openSetting({
              success(res) {}
            })
          } else {

            wx.chooseAddress({
              success(res) {
                wx.setStorageSync('data', {
                  cneeName: res.userName,
                  postalCode: res.postalCode,
                  provinceName: res.provinceName,
                  region: res.provinceName + '-' + res.cityName + '-' + res.countyName,
                  nationalCode: res.nationalCode,
                  address: res.detailInfo,
                  cneePhone: res.telNumber
                })
                var data = wx.getStorageSync('data')
                that.setData({
                  cneeName: data.cneeName,
                  postalCode: data.postalCode,
                  provinceName: data.provinceName,
                  region: data.region,
                  nationalCode: data.nationalCode,
                  address: data.address,
                  cneePhone: data.cneePhone,
                })
              }
            })
          }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log()
    if (wx.getStorageSync('data')) {
      var data = wx.getStorageSync('data')
      console.log(data)
      this.setData({
        cneeName: data.cneeName,
        postalCode: data.postalCode,
        provinceName: data.provinceName,
        region: data.region,
        nationalCode: data.nationalCode,
        address: data.address,
        cneePhone: data.cneePhone,
      })

    }
  },

  // 提交地址事件/voluteer/insertMailAddress
  sureBtn() {
    if (this.data.region !== '北京市-北京市-石景山区') {
      Notify({
        type: 'danger',
        message: '地址必须为 "北京市-北京市-石景山区"'
      });
    } else if (!(/^1[34578]\d{9}$/.test(this.data.cneePhone))) {
      Notify({
        type: 'danger',
        message: '手机号格式错误！'
      });
    } else {
      api.request('POST', '/voluteer/insertMailAddress', {
        userID: wx.getStorageSync('userID'),
        seqNo: '1',
        region: this.data.region,
        address: this.data.address,
        postalCode: this.data.postalCode,
        cneePhone: this.data.cneePhone,
        cneeName: this.data.cneeName
      }).then(res => {

        if (res.data.msg == "新增成功") {
          Notify({
            type: 'success',
            message: '提交成功'
          });
          wx.setStorageSync('data', {
            cneeName: this.data.cneeName,
            postalCode: this.data.postalCode,
            provinceName: this.data.provinceName,
            region: this.data.region,
            nationalCode: this.data.nationalCode,
            address: this.data.address,
            cneePhone: this.data.cneePhone
          })


        } else if (res.data.msg == "新增失败, 已保存的地址") {
          api.request('POST', '/voluteer/updateMailAddress', {
            userID: wx.getStorageSync('userID'),
            seqNo: '1',
            region: this.data.region,
            address: this.data.address,
            postalCode: this.data.postalCode,
            cneePhone: this.data.cneePhone,
            cneeName: this.data.cneeName

          }).then(res => {
            if (res.data.msg == "更新成功") {
              Notify({
                type: 'success',
                message: '更新地址成功！'
              });
            }
            wx.setStorageSync('data', {
              cneeName: this.data.cneeName,
              postalCode: this.data.postalCode,
              provinceName: this.data.provinceName,
              region: this.data.region,
              nationalCode: this.data.nationalCode,
              address: this.data.address,
              cneePhone: this.data.cneePhone
            })
          })
        } else {
          Notify({
            type: 'warning',
            message: '提交失败！'
          });
        }
      })
    }

  },


  oncneeName(event) {
    this.setData({
      cneeName: event.detail
    })
  },
  oncneePhone(event) {
    this.setData({
      cneePhone: event.detail
    })
  },
  onregion(event) {
    this.setData({
      region: event.detail
    })
  },
  onaddress(event) {
    this.setData({
      address: event.detail
    })
  },
  onpostalCode(event) {
    this.setData({
      postalCode: event.detail
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})