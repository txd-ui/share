// pages/volunteer/index.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog.js';
const api = require("../../service/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    option: null,
    username: '',//姓名
    gender: '',//性别
    phone: '',//手机号
    ganmeVal: '',//街道选中数据
    communityVal: '', //社区选中数据
    residentialVal: '',//小区选中数据
    // 街道显示
    show: false,
    communityShow: false,// 社区显示
    residentialShow: false,//小区显示
    typeShow: false, //类型显示
    residential: '',
    community: '',
    // 街道数据

    columns: ['八角街道',
      '八宝山街道',
      '老山街道',
      '古城街道',
      '广宁街道',
      '五里坨街道',
      '苹果园街道',
      '鲁谷街道',
      '金顶街街道'],
    // 社区数据
    communityColumns: [],
    residentialColumns: []
  },

  // 用户名单选框
  genderChange(e) {
    console.log(e)
    this.setData({
      gender: e.detaild
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '注册',
    })
  },
  // 街道显示
  showPopup() {

    this.setData({ show: true });
  },
  //  街道弹框关闭
  onClose() {
    this.setData({ show: false });
  },
  //  街道弹框确定
  onConfirm(event) {
    const { value } = event.detail;
    this.setData({ ganmeVal: value, show: false })
    // 请求社区数据
    api.request('POST', '/volunteer/getCommunity', {
      gname: value
    }).then(res => {
      var { data: { results } } = res
      results.forEach(item => {
        this.data.communityColumns.push(item.community)
      })
      this.setData({
        communityColumns: this.data.communityColumns
      })
    })
  },

  // 社区显示
  showcommunity() {
    if (!this.data.ganmeVal) {
      Dialog.alert({
        title: '温馨提示',
        message: '请先选择街道！',
      }).then(() => {
        // on close
      });
    } else {
      this.setData({ communityShow: true })
    }

  },
  // 社区确定
  communityConfirm(e) {
    const { value } = e.detail;
    this.setData({ communityVal: value, communityShow: false })
    // 请求小区数据
    api.request('POST', '/volunteer/getResidentialAreas', {
      gname: this.data.ganmeVal,
      community: value
    }).then(res => {
      var { data: { results } } = res
      results.forEach(item => {
        this.data.residentialColumns.push(item.residentialAreas)
      })
      this.setData({ residentialColumns: this.data.residentialColumns })
    })
  },
  // 社区取消
  communityClose() {
    this.setData({ communityShow: false })
  },
  // 小区显示
  residential() {
    if (!this.data.communityVal) {
      Dialog.alert({
        title: '温馨提示',
        message: '请先选择街道和社区！',
      }).then(() => { });
    } else {
      this.setData({ residentialShow: true })
    }

  },
  // 小区确定
  residentialConfirm(event) {
    const { value } = event.detail;
    this.setData({ residentialVal: value, residentialShow: false })
  },
  // 小区隐藏
  residentialClose() {
    this.setData({ residentialShow: false })
  },
  // 获取姓名输入框的值
  getName(e) {
    this.setData({
      username: e.detail
    })
  },
  // 性别选择的值
  genderChange(e) {
    this.setData({
      gender: e.detail
    })
  },
  // 电话的值
  getPhone(e) {
    this.setData({
      phone: e.detail
    })
  },
  // 手机移出焦点时
  // value_blur() {
  //   var rules = /^1(3|4|5|6|7|8|9)\d{9}$/
  //   if (rules.test(this.data.phone)) {
  //   } else {
  //     Dialog.alert({
  //       title: '温馨提示',
  //       message: '电话格式错误，请重新输入',
  //     }).then(() => { });
  //   }

  // },
  submit() {
    var that = this
    if (!this.data.username || !this.data.gender  || !this.data.ganmeVal || !this.data.communityVal || !this.data.residentialVal) {
      Dialog.alert({
        title: '温馨提示',
        message: '检测到您有信息未完善',
      }).then(() => { });
    } else {
      api.request('POST', '/volunteer/registerUser', {
        nickName: this.data.username,
        gname: this.data.ganmeVal,
        telephone: wx.getStorageSync('phone'),
        residentialAreas: this.data.residentialVal,
        community: this.data.communityVal,
        sex: this.data.gender,
        userType:1

      }).then(res => {
        if (res.data.msg == "操作成功") {
          wx.setStorageSync('flags', false)
          wx.setStorageSync('nickName', this.data.username)
          wx.setStorageSync('gname', this.data.ganmeVal)
          wx.setStorageSync('residentialAreas', this.data.residentialVal)
          wx.setStorageSync('community', this.data.communityVal)
          wx.setStorageSync('sex', this.data.gender)
          Dialog.alert({
            title: '温馨提示',
            message: '注册成功！正在跳转页面',
          }).then(() => { });

          setTimeout(() => {
            wx.reLaunch({
              url: '../index/index'
            })
          }, 3000)


        }
      })
    }
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