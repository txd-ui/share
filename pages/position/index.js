import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog.js';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
const api = require("../../service/http.js");
Page({
  data: {
    img: ''
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '打卡',
    })

  },
  yincang() {
    this.setData({ img: '' })
  },

  // 提交按钮
  sumbit() {
    var that = this
    // 获取用户位置信息
    const _this = this
    if (_this.data.img) {
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          const latitude = res.latitude
          const longitude = res.longitude
          console.log(latitude, longitude)
          wx.uploadFile({
            url: 'https://179l13s642.51mypc.cn/volunteer/uploadPunchTheClock', // 仅为示例，非真实的接口地址
            filePath: _this.data.img,
            name: 'file',
            header: {

              "Content-Type": "multipart/form-data",

            },
            formData: { position: longitude + ',' + latitude, userID: wx.getStorageSync('userID'), userName: wx.getStorageSync('nickName'), residentialAreas: wx.getStorageSync('residentialAreas'), headPath: wx.getStorageSync('userImg') },
            success(res) {
              if (res.statusCode == 200) {
                Toast.success('打卡成功！')
                that.setData({ img: '' })
              }
            },
          })
        }
      })
    } else {
      Dialog.alert({
        title: '温馨提示',
        message: '请先拍照！',
      }).then(() => {
        // on close
      });
    }

  },


  chooseWxImage: function (type) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res);
        that.setData({
          // tempFilePath可以作为img标签的src属性显示图片
          img: res.tempFilePaths[0],
        })
      }
    })
  },

  chooseimage: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#333",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })

  },

})