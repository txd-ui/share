// pages/message/index.js
const api = require("../../service/http.js");
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:false,
    messageVal: '', // 输入框的值
    imgSrc: ''
  },
  //输入框的值//
  changVal(e) {
    this.setData({
      messageVal: e.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  // 发布接口
  release() {
    if (this.data.messageVal && !this.data.imgSrc) {
      this.setData({
        flag:true
      })
    this.upLodeFont()
   
    } else if (!this.data.messageVal && !this.data.imgSrc) {
      Notify({ type: 'warning', message: '不能为空，请填写后继续！' });

    }
    else {
      this.setData({
        flag:true
      })
      // 调用上传图片接口
      this.upLopdeImg()
    }


  },

  // 上传内容方法
  upLodeFont() {
    wx.showLoading({
      title: '提交中...',
    })
    api.request('POST', '/volunteer/uploadInformationNoPIC', {
      position: wx.getStorageSync('userLocation'), userID: wx.getStorageSync('userID'), userName: wx.getStorageSync('nickName'), headPath: wx.getStorageSync('userImg'), information: this.data.messageVal
    }).then(res => {
      if (res.statusCode == 200) {
        wx.hideLoading()
        Notify({ type: 'success', message: '发布成功,已提交审核！' });
        wx.hideLoading()
        setTimeout(() => {
          wx.navigateBack({
            detail: 1
          })

        },2000)

      }
    })
  },
  // 上传图片方法
  upLopdeImg() {
    var that = this
    wx.showLoading({
      title: '发布中...',
    })
    // if (this.data.messageVal) {
    wx.uploadFile({
      url: 'https://179l13s642.51mypc.cn/volunteer/uploadInformation', // 仅为示例，非真实的接口地址
      filePath: this.data.imgSrc,
      name: 'file',
      header: {

        "Content-Type": "multipart/form-data",

      },
      formData: { position: wx.getStorageSync('userLocation'), userID: wx.getStorageSync('userID'), userName: wx.getStorageSync('nickName'), headPath: wx.getStorageSync('userImg'), information: this.data.messageVal },
      success(res) {
        if (res.statusCode == 200) {
          Notify({ type: 'success', message: '发布成功,已提交审核！' });
          wx.hideLoading()
          setTimeout(() => {
          
            wx.navigateBack({
              detail: 1
            })

          }, 2000)
          that.setData({ img: '' })
        }
      },
    })
    // } else {
    //   Notify({ type: 'warning', message: '请输入留言！' });
    //   wx.hideLoading()
    // }


  },

  // 选择照片的方式
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
  chooseWxImage: function (type) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: [type], // 可以指定来源是相册还是相机，默认二者都有
      success: function (photo) {
        if (photo.errMsg == "chooseImage:ok") {
          that.setData({
            imgSrc: photo.tempFilePaths[0]
          })
        }
      },
      error: function (res) {
        console.log(res);
      }
    })
  },
  // 清空照片时间
  delImg() {
    this.setData({ imgSrc: '' })
  },
  // 发布按钮
  submit() {

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