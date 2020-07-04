// pages/myPage/index.js
const api = require("../../service/http.js");
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    continuity: '', // 连续打卡
    userName: '',// 用户名
    phone: '',
    userLsit: null,
    sumlist: '',
    oldList: '',
    dayAll: [
      { day: 1 },
      { day: 2 },
      { day: 3 },
      { day: 4 },
      { day: 5 },
      { day: 6 },
      { day: 7 }
    ]
  },


  getda() {
    var that = this
    api.request('POST', '/volunteer/getMessageContinuityDayByUserID', {
      userID: wx.getStorageSync('userID')
    }).then(res => {
      var { data: { results } } = res
      console.log(res)
      that.setData({
        continuity: results
      })
    })
  },
  // 点击跳转奖品领取页面
  prize(){
    wx.navigateTo({
      url: '../prizePage/index'　　// 页面 B
    })
  },
  // 点击跳转排行榜
  rankingList() {
    wx.navigateTo({
      url: '../rankingList/index'　　// 页面 B
    })
  },
  // 获取历史最高排名
  getOld() {
    api.request('POST', '/volunteer/getHighestRanking', {
      userID: wx.getStorageSync('userID')
    }).then(res => {
      var { data: { results } } = res

      this.setData({ oldList: results })
    })
  },

  // 获取总积分
  getSum() {
    api.request('POST', '/volunteer/getTotalPoints', {
      userID: wx.getStorageSync('userID')
    }).then(res => {
      var { data: { results } } = res

      this.setData({
        sumlist: results
      })
    })
  },

  // 获取用户本月积分和本月排名
  getuser() {
    api.request('POST', '/volunteer/getAccumulatePointsByUserID', {
      userID: wx.getStorageSync('userID')
    }).then(res => {

      var { data: { results } } = res

      this.setData({
        userLsit: results
      })
    })
  },
  // 跳转打卡页面
  detailed() {
    wx.navigateTo({
      url: '../myDetail/index'　　// 页面 B
    })
  },
  prizes() {
    wx.navigateTo({
      url: '../find/index'　　// 页面 B
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '积分排名',
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
    if (wx.getStorageSync('phone') && wx.getStorageSync('userID')) {
      this.getda()
      this.getuser()
      // 获取总积分
      this.getSum()
      // 获取历史最高
      this.getOld()
      // 设置用户名和电话
      this.setData({
        userName: wx.getStorageSync('nickName'),
        phone: wx.getStorageSync('phone'),
        userImg: wx.getStorageSync('userImg')
      })
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2
        })
      }
    }else{
      Dialog.alert({
        title: '温馨提示',
        message: '需要获取您的个人信息才能展示您的积分排名记录！',
        confirmButtonText: '前往',
        showConfirmButton: 'false'

      }).then(() => {
        wx.showLoading({
          title: '正在跳转',
        })
        wx.redirectTo({
          url: '../login/index'
        })
      })
    }
   
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