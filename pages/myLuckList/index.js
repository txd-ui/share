// pages/myLuckList/index.js
const api = require("../../service/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myLuckLists: []
  },
  // 我的中奖记录列表
  getmyLuckList() {

    api.request('POST', '/voluteer/queryLuckDrawRecord', {
      userID: wx.getStorageSync('userID'),
      page: this.data.pages,
      limit: 10
    }).then(res => {
      var {
        data: {
          results
        }
      } = res

      results.list.forEach(item => {
        var dateee = new Date(item.createTime).toJSON();
        item.createTime = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      })

      this.setData({
        myLuckLists: results.list

      })
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getmyLuckList()
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