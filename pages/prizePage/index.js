// pages/prizePage/index.js
const api = require("../../service/http.js");
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    changVal: '全部',
    getmyUserList: [],
    prizeType: '',
    level: '',
    sopList: [], //商品列表
    selVal: '好礼兑换' //选中的选项卡
  },
  // 切换列表事件
  onChangeVal(e) {
    if (e.detail.name == '好礼兑换') {
      this.getSopList()
    } else if (e.detail.name == "我的兑换") {
      this.getmyUserChange()
    }
  },

  // 选择级别
  selectVal(e) {
    this.setData({
      changVal: e.currentTarget.dataset.data
    })
    this.getSopList()


  },
  // 我的兑换列表
  getmyUserChange() {
    api.request('POST', '/voluteer/queryPrizeConvertLog', {
      userID: wx.getStorageSync('userID')
    }).then(res => {
      var {
        data: {
          results
        }
      } = res
      console.log(results)
      this.setData({
        getmyUserList: results
      })
    })
  },

  // 奖品兑换按钮
  exchange(e) {
    this.setData({
      prizeType: e.currentTarget.dataset.data
    })


    Dialog.confirm({
        title: '温馨提示',
        message: '是否兑换该奖品,兑换后扣除相应石分宝！',
      })
      .then(() => {
        api.request('POST', '/voluteer/convertPrize', {
          userID: wx.getStorageSync('userID'),
          level: this.data.level,
          prizeType: this.data.prizeType
        }).then(res => {
          if (res.data.results == "兑换成功") {
            Notify({
              type: 'success',
              message: '兑换成功'
            });
            this.getSopList()
          } else {
            Notify({
              type: 'danger',
              message: res.data.msg
            });
          }
        })
      })
      .catch(() => {
        // on cancel
      });
  },

  // 跳转到奖品详情页
  prizeDetail() {
    wx.navigateTo({
      url: '../prizeDetail/index' // 页面 A
    })
  },
  // 跳转到积分详情页
  integralPage() {
    wx.navigateTo({
      url: '../integralPage/index' // 页面 A
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取权限
    this.getuserRanking()
    // 商品列表
    this.getSopList()
    wx.setNavigationBarTitle({
      title: '兑换商城'
    })
  },
  // 获取用户排名
  getuserRanking() {
    api.request('POST', '/voluteer/queryUserExperience', {
      userID: wx.getStorageSync('userID')
    }).then(res => {
      var {
        data
      } = res

      this.setData({
        level: data.results.level,

      })

    })
  },
  // 商品列表
  getSopList() {
    api.request('POST', '/voluteer/queryConvertPrize').then(res => {
      var {
        data: {
          results
        }
      } = res
      if (this.data.changVal == '全部') {

        this.setData({
          sopList: results
        })

      } else if (this.data.changVal == '1-3') {

        var arr = []
        results.forEach(item => {
          if (item.level <= 3) {
            arr.push(item)

          }

        })
        this.setData({
          sopList: arr
        })
        console.log(this.data.sopList)
      } else if (this.data.changVal == '4-7') {

        var arr = []
        results.forEach(item => {
          if (item.level >= 4 && item.level <= 7) {
            arr.push(item)

          }

        })
        this.setData({
          sopList: arr
        })
      } else if (this.data.changVal == '8-10') {


        var arr = []

        results.forEach(item => {

          if (item.level >= 8 && item.level <= 10) {
            arr.push(item)
          }
        })
        this.setData({
          sopList: arr
        })

      }

      //  this.setData({
      //    sopList: results
      //  })
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