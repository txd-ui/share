// pages/myPage/index.js
const api = require("../../service/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    continuity:'', // 连续打卡
    userName:'',// 用户名
    phone:'',
    userLsit:null,
    sumlist:'',
    oldList:''
  },


  getda(){
    var that = this
    api.request('POST','/volunteer/getMessageContinuityDayByUserID',{
      userID: wx.getStorageSync('userID')
    }).then(res=>{
      var {data:{results}} = res
      that.setData({
        continuity: results
      })
    })
  },
// 点击跳转排行榜
  rankingList(){
    wx.navigateTo({
      url: '../rankingList/index'　　// 页面 B
    })
  },
// 获取历史最高排名
getOld(){
  api.request('POST','/volunteer/getHighestRanking',{
    userID: wx.getStorageSync('userID')
  }).then(res=>{
    var {data:{results}} = res

    this.setData({ oldList:results})
  })
},

// 获取总积分
getSum(){
  api.request('POST','/volunteer/getTotalPoints',{
    userID: wx.getStorageSync('userID')
  }).then(res=>{
    var {data:{results}} =res
  
    this.setData({
      sumlist: results
    })
  })
},

  // 获取用户本月积分和本月排名
  getuser(){
    api.request('POST','/volunteer/getAccumulatePointsByUserID',{
      userID: wx.getStorageSync('userID')
    }).then(res=>{

   var  {data:{results}} = res
     
   this.setData({
     userLsit:results
   })
    })
  },
  // 跳转打卡页面
  detailed(){
    wx.navigateTo({
      url: '../myDetail/index'　　// 页面 B
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的',
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