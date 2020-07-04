
const api = require("../../service/http.js");
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog.js';
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {

    allArr: [],
    readState: '',
  
  },
  // 点击跳转详情页面
  deilIndex(e) {

    if (wx.getStorageSync('phone') && wx.getStorageSync('userID')) {
      wx.setStorageSync('id', e.currentTarget.dataset.id)
      wx.setStorageSync('data', e.currentTarget.dataset.text)
      wx.setStorageSync('readState', e.currentTarget.dataset.readstate)
      wx.setStorageSync('articleVal', e.currentTarget.dataset.articleval)
      wx.setStorageSync('videoCover', e.currentTarget.dataset.videocover)
      wx.setStorageSync('videoPath', e.currentTarget.dataset.videopath)
      wx.navigateTo({
        url: '../deindex/index'
      })
    } else {
      Dialog.confirm({
        title: '温馨提示',
        message: '此功能需要您的个人信息,才能统计您的阅读进度,请前往登录！',
        confirmButtonText: '前往',
        showConfirmButton: 'true',
        cancelButtonText: '拒绝'

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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.gname){
      wx.setStorageSync('shareID', options.gname )
    } 
   setTimeout(()=>{
     if (wx.getStorageSync('userID')) {
       api.request('POST', '/sort/produceQRcode', {
         userID: wx.getStorageSync('userID')
       }).then(res => {
         var { data: { results } } = res
         wx.downloadFile({
           url: results.wxaCodeUrl,　　　　　　　//需要下载的图片url
           success: function (res) {　　　　　　　　　　　　//成功后的回调函数
       
               wx.setStorageSync('mySrcImg', res.tempFilePath)
           }
         });
    
       })
     }
   },1500)
    
  
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
    setTimeout(() => {
      this.getTask()

    }, 1000)
    this.getArticle()
    api.request('POST', '/volunteer/getCheckUserListByTelephone', { telephone: wx.getStorageSync('phone') }).then(res => {
    
      var { data: { results } } = res
      if (results.length > 0 && wx.getStorageSync('phone')){
        wx.setStorageSync('userID', results[0].userID)
        wx.setStorageSync('nickName', results[0].nickName)
        wx.setStorageSync('residentialAreas', results[0].residentialAreas)
        wx.setStorageSync('community', results[0].community)
        wx.setStorageSync('sex', results[0].sex)
      }else{
        Dialog.confirm({
          title: '温馨提示',
          message: '检测到您未登录，是否前往登录页面！',
          confirmButtonText: '前往',
          showConfirmButton: 'true',
          cancelButtonText: '拒绝'

        }).then(() => {
          wx.showLoading({
            title: '正在跳转',
          })
          wx.redirectTo({
            url: '../login/index'
          })
        })
      }
   
    })
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }

    // setTimeout(() => {
    //   if (wx.getStorageSync('phone') && wx.getStorageSync('userID')) {
  
    //   } else {
        
    //   }
    // }, 1500)

  },
  getArticle() {
    api.request('POST', '/volunteer/getArticleList', {
      id: '',
      userID: wx.getStorageSync('userID')
    }).then(res => {
        
      var { data: { results } } = res
      console.log(results)
      this.setData({
        allArr: results
      })
    }).catch(err=>{

      if (err == '错误') {
        Notify({ background: '#fff', color: '#333', type: 'danger', message: '系统升级维护中,请稍后使用！' });
      }
    })
  },

  getTask() {
    api.request('POST', '/volunteer/getStudyStateByUserID', {
      userID: wx.getStorageSync('userID')
    }).then(res => {

      var { data: { results } } = res
      if (results.readState === 0) {
        this.setData({
          readState: 0
        })
      } else if (results.readState === 1) {
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