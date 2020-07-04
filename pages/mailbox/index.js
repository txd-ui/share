// pages/mailbox/index.js
const api = require("../../service/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[]
  },
  mailboxdeil(e){
    wx.setStorageSync('noticeID',e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../mailboxdeil/index?data=' + e.currentTarget.dataset.data　　 // 页面 B
    })
  },
  // 获取文章的状态
  // 查询用户未读消息数量
getState(){
  api.request('POST','/volunteer/getUserNoticeLog',{
    userID:wx.getStorageSync('userID')
  }).then(res=>{
    var {data:{results}} =res
    if(results.length>0){
      results.forEach(item=>{
        this.data.dataList.forEach(its=>{
          if(its.noticeID == item.noticeID){
             its.readState =item.readState
            
          }
        })
      })
      this.setData({
        dataList:this.data.dataList
      })

    }
  })
},
getUserList(){
  api.request('POST','/volunteer/getAnnouncementList').then(res=>{
    var { data: { results}} = res
     
    this.setData({
      dataList: results
    })
    this.getState()

  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getUserList()
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