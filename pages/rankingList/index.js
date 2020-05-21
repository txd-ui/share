// pages/rankingList/index.js
const api = require("../../service/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    userImg: '',
    show:false,
    active: 0,
    currentDate: '',
    time:'',
    times: '',
    allList:[],
    all:[],
    residentialAreas:''
  },
  showPopup() {

    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  onConfirm(event) {
  
    var date = new Date(event.detail);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var X = date.getFullYear() ;
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    this.setData({
      currentDate: Y+M,
      time: X,
      times: M,
      show: false
    });
    this.getList()
    this.getRanking()
  },
  onChange(event) {
    if(event.detail.title =='小区排名'){
      this.setData({ residentialAreas: wx.getStorageSync('residentialAreas') })
      this.getList()
    }else{
      this.setData({ residentialAreas:''})
      this.getList()
    }
  },
  getList(){
    wx.showToast({
      title: '加载中...',
      mask: true,
      icon: 'loading'
    })
    api.request('POST','/volunteer/getAccumulatePointsList',{
      userID: wx.getStorageSync('userID'),
      residentialAreas: this.data.residentialAreas,
      monthYear:this.data.currentDate
    }).then(res=>{
      var { data: { results}} =res

      this.setData({ allList: results})
    })
  },
  // 获取排名 和积分
  getRanking(){
    api.request('POST', '/volunteer/getAccumulatePointsByUserID', { userID: wx.getStorageSync('userID'), monthYear: this.data.currentDate}).then(res=>{
     var { data: { results}} = res
      console.log(results)
      this.setData({
        all: results
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '排行榜',
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
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var X = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    this.setData({
      currentDate: Y+M,
      time:X,
      times: M,
      show: false,
      residentialAreas:wx.getStorageSync('residentialAreas')
    });
    
    this.getList()
    this.getRanking()
    this.setData({
      userName: wx.getStorageSync('nickName'),
  
      userImg: wx.getStorageSync('userImg')
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