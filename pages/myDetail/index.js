// pages/myDetail/index.js
const api = require("../../service/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allList : [],
    monList:'',
    userLsit:[]
  },
  // 获取打卡记录
  getDetailList(){
    api.request('POST','/volunteer/getMessageListByUserID',{
      userID: wx.getStorageSync('userID')
    }).then(res=>{
      var { data: { results}} =res

      this.setData({ allList: results})
    })
  },
  // 获取本页打卡次数
  getMon(){
    api.request('POST','/volunteer/getMessageCountByuserID',{
      userID: wx.getStorageSync('userID')
    }).then(res=>{
      var {data:{results}} =res
     this.setData({
       monList: results
     })
    })
  },
  // 获取用户本月积分
  getuser() {
    api.request('POST', '/volunteer/getAccumulatePointsByUserID', {
      userID: wx.getStorageSync('userID')
    }).then(res => {
      var { data: { results } } = res
      console.log(results)
      this.setData({  
        userLsit: results
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的打卡记录',
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
    this.getDetailList()
    this.getMon()
    this.getuser() 
    
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