
const api = require("../../service/http.js");


Page({

  /**
   * 页面的初始数据
   */
  data: {
    allArr:[],
    readState:'',
  },
  // 点击跳转详情页面
  deilIndex(e) {
    console.log(e)
    wx.setStorageSync('id', e.currentTarget.dataset.id) 
    wx.navigateTo({
      url: '../deindex/index'
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '石分达人',
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
    // 获取任务完成
    this.getTask()
    this.getArticle()
    api.request('POST', '/volunteer/getCheckUserListByTelephone', { telephone: wx.getStorageSync('phone') }).then(res => {
      var { data: { results } } = res
      wx.setStorageSync('userID', results[0].userID)
      wx.setStorageSync('nickName', results[0].nickName)
      wx.setStorageSync('residentialAreas', results[0].residentialAreas)
      wx.setStorageSync('community', results[0].community)
      wx.setStorageSync('sex', results[0].sex)
    })
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  getArticle(){
    api.request('POST','/volunteer/getArticleList',{
      id:''
    }).then(res=>{
     var {data:{results}} = res 
     this.setData({
       allArr : results
     })
    })
  },

  getTask(){
    api.request('POST','/volunteer/getStudyStateByUserID',{
      userID: wx.getStorageSync('userID')
    }).then(res=>{
      var { data: { results}} = res
      if (results.readState === 0){
        this.setData({
          readState:0
        })
      } else if (results.readState === 1){
        this.setData({
          readState: 33
        })
      } else if (results.readState === 2) {
        this.setData({
          readState: 66
        })
      } else if (results.readState === 3) {
        this.setData({
          readState: 100
        })
      }

    })
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