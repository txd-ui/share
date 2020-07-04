// pages/newMypage/index.js
const api = require("../../service/http.js");
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog.js';
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    readNum:'',
    experiences:'',
    exchangList: null,  //兑换列表
    canVals: "",
    changeVal: 0,
    addBtn: false,
    canVal: '',
    shows: false, //兑换遮罩层的显示
    nextLevel: '', //升级所需经验
    levelName: "", // 权限名字,
    imgSrc: ['../../style/img/sheng.png', '../../style/img/jing.png', '../../style/img/qing.png', '../../style/img/zitong.png', '../../style/img/zuyin.png', '../../style/img/zuyin.png', '../../style/img/huang.png', '../../style/img/zujin.png', '../../style/img/baijin.png', '../../style/img/zuanshi.png'],
    level: '', //级别
    hisRank: '', // 历史最高排名
    currentExp: '', //当前经验
    experience: '', //总经验
    ranking: '',
    newTime: '',
    width: '50',
    continuitys: '', // 连续打卡
    userName: '', // 用户名
    phone: '',
    userLsit: null,
    sumlist: null,
    oldList: '',
    readState: 80,
    dayStyle: [],
    numberList: [{
      number: '+1',
      week: '周一',
      day: 1,
      sure: '未打卡'
    }, {
      number: '+1',
      week: '周二',
      day: 2,
      sure: '未打卡'
    }, {
      number: '+1',
      week: '周三',
      day: 3,
      sure: '未打卡'
    }, {
      number: '+1',
      week: '周四',
      day: 4,
      sure: '未打卡'
    }, {
      number: '+1',
      week: '周五',
      day: 5,
      sure: '未打卡'
    }, {
      number: '+1',
      week: '周六',
      day: 6,
      sure: '未打卡'
    }, {
      number: '+3',
      week: '周日',
      day: 7,
      sure: '未打卡'
    }],

    show: false,
  },
  getWidth() {

  },
  // changVal(e){
  //   console.log(e)
  // },
  // addVal(e){
  //   console.log(e)
  //   this.setData({
  //     canVal: this.data.userLsit[0].points / 10
  //   })
  // },
  // 获取用户的阅读信息
  getUserRead(){
    api.request('POST','/volunteer/getNotReadNoticeCount',{
      userID:wx.getStorageSync('userID')
    }).then(res=>{
      var {data:{results}}  = res
      this.setData({
        readNum:results
      })
    })
  },

  // 关闭遮罩层
  close() {
    this.setData({
      shows: false
    })
  },
  // 确认兑换按钮
  suerBtn() {

    Dialog.confirm({
      title: '温馨提示',
      message: '是否兑换达人值,兑换后会扣除对应石分宝！',
    })
      .then(() => {
        if (this.data.changeVal >= 1) {
          api.request('POST', '/voluteer/convertExperience', {
            userID: wx.getStorageSync('userID'),
            level: this.data.level,
            times: this.data.changeVal
          }).then(res => {
       
            if (res.data.msg == '操作成功') {
              this.weekSign()
              this.getuserRanking()
              // this.getuser()
              this.getSum()
              this.setData({
                shows: false
              })
        
              Notify({
                type: 'success',
                message: '兑换成功'
              });
         
            }


          })
        } else {
          Notify({
            type: 'warning',
            message: '无法兑换!'
          });
        }
      })
      .catch(() => {
        // on cancel
      });
  },
  // 兑换按钮
  onChange(event) {
    if (this.data.level == 1) {
      var canVal = this.data.sumlist[0].points / 10

      this.setData({
        changeVal: event.detail,
        canVal: this.data.sumlist[0].points / 10
      })
   
      if (this.data.changeVal > canVal) {
        Notify({
          type: 'warning',
          message: '已达到最大兑换次数！'
        });
        this.setData({
          addBtn: true,
          changeVal: canVal
        })
      } else {
        this.setData({
          addBtn: false,
          changeVal: event.detail
        })
      }
    } else if (this.data.level == 2) {
      var canVal = this.data.sumlist[0].points / 20

      this.setData({
        changeVal: event.detail,
        canVal: this.data.sumlist[0].points / 20
      })
      if (this.data.changeVal > canVal) {
        Notify({
          type: 'warning',
          message: '已达到最大兑换次数！'
        });
        this.setData({
          addBtn: true,
          changeVal: canVal
        })
      } else {
        this.setData({
          addBtn: false,
          changeVal: event.detail
        })
      }
    } else if (this.data.level == 3) {
      var canVal = this.data.sumlist[0].points / 30

      this.setData({
        changeVal: event.detail,
        canVal: this.data.sumlist[0].points / 30
      })
      if (this.data.changeVal > canVal) {
        Notify({
          type: 'warning',
          message: '已达到最大兑换次数！'
        });
        this.setData({
          addBtn: true,
          changeVal: canVal
        })
      } else {
        this.setData({
          addBtn: false,
          changeVal: event.detail
        })
      }
    } else if (this.data.level == 4) {
      console.log(this.data.changeVal)
      var canVal = this.data.sumlist[0].points / 50
 
      this.setData({
        changeVal: event.detail,
        canVal: this.data.sumlist[0].points / 50
      })
      if (this.data.changeVal > canVal) {
        Notify({
          type: 'warning',
          message: '已达到最大兑换次数！'
        });
        this.setData({
          addBtn: true,
          changeVal: canVal
        })
      } else {
        this.setData({
          addBtn: false,
          changeVal: event.detail
        })
      }
    } else if (this.data.level == 5) {
      var canVal = this.data.sumlist[0].points / 100

      this.setData({
        changeVal: event.detail,
        canVal: this.data.sumlist[0].points / 100
      })
      if (this.data.changeVal > canVal) {
        Notify({
          type: 'warning',
          message: '已达到最大兑换次数！'
        });
        this.setData({
          addBtn: true,
          changeVal: canVal
        })
      } else {
        this.setData({
          addBtn: false,
          changeVal: event.detail
        })
      }
    } else if (this.data.level == 6) {
      var canVal = this.data.sumlist[0].points / 100

      this.setData({
        changeVal: event.detail,
        canVal: this.data.sumlist[0].points / 100
      })
      if (this.data.changeVal > canVal) {
        Notify({
          type: 'warning',
          message: '已达到最大兑换次数！'
        });
        this.setData({
          addBtn: true,
          changeVal: canVal
        })
      } else {
        this.setData({
          addBtn: false,
          changeVal: event.detail
        })
      }
    } else if (this.data.level == 7) {
      var canVal = this.data.sumlist[0].points / 100

      this.setData({
        changeVal: event.detail,
        canVal: this.data.sumlist[0].points / 100
      })
      if (this.data.changeVal > canVal) {
        Notify({
          type: 'warning',
          message: '已达到最大兑换次数！'
        });
        this.setData({
          addBtn: true,
          changeVal: canVal
        })
      } else {
        this.setData({
          addBtn: false,
          changeVal: event.detail
        })
      }
    } else if (this.data.level == 8) {
      var canVal = this.data.sumlist[0].points / 100

      this.setData({
        changeVal: event.detail,
        canVal: this.data.sumlist[0].points / 100
      })
      if (this.data.changeVal > canVal) {
        Notify({
          type: 'warning',
          message: '已达到最大兑换次数！'
        });
        this.setData({
          addBtn: true,
          changeVal: canVal
        })
      } else {
        this.setData({
          addBtn: false,
          changeVal: event.detail
        })
      }
    } else if (this.data.level == 9) {
      var canVal = this.data.sumlist[0].points / 100

      this.setData({
        changeVal: event.detail,
        canVal: this.data.sumlist[0].points / 100
      })
      if (this.data.changeVal > canVal) {
        Notify({
          type: 'warning',
          message: '已达到最大兑换次数！'
        });
        this.setData({
          addBtn: true,
          changeVal: canVal
        })
      } else {
        this.setData({
          addBtn: false,
          changeVal: event.detail
        })
      }
    } else if (this.data.level == 10) {
      var canVal = this.data.sumlist[0].points / 100

      this.setData({
        changeVal: event.detail,
        canVal: this.data.sumlist[0].points / 100
      })
      if (this.data.changeVal > canVal) {
        Notify({
          type: 'warning',
          message: '已达到最大兑换次数！'
        });
        this.setData({
          addBtn: true,
          changeVal: canVal
        })
      } else {
        this.setData({
          addBtn: false,
          changeVal: event.detail
        })
      }
    }
  },
  // 兑换功能
  exchange() {
      this.setData({
        shows: true,
      })
    if (this.data.sumlist[0].points) {

      if (this.data.level == 1) {
     
        var canVal = parseInt(this.data.sumlist[0].points / 10)
      } else if (this.data.level == 2) {
     
        var canVal = parseInt(this.data.sumlist[0].points / 20)
      } else if (this.data.level == 3) {
    
        var canVal = parseInt(this.data.sumlist[0].points / 30)
      } else if (this.data.level == 4) {
        var canVal = parseInt(this.data.sumlist[0].points / 50)
    
      } else if (this.data.level == 5) {
        var canVal = parseInt(this.data.sumlist[0].points / 100)
    

      } else if (this.data.level == 6) {
        var canVal = parseInt(this.data.sumlist[0].points / 100)
      
      } else if (this.data.level == 7) {
        var canVal = parseInt(this.data.sumlist[0].points / 100)
   
      } else if (this.data.level == 8) {
        var canVal = parseInt(this.data.sumlist[0].points / 100)
    
      } else if (this.data.level == 9) {
        var canVal = parseInt(this.data.sumlist[0].points / 100)
      
      } else if (this.data.level == 10) {
        var canVal = parseInt(this.data.sumlist[0].points / 100)
  
      }
      this.setData({
        canVals :canVal,
        addBtn: false,
        changeVal: 0,
      })
      api.request('POST', '/voluteer/queryConvertLog', {
        userID: wx.getStorageSync('userID')
      }).then(res => {
       var  { data: { results } }  = res
        results.forEach(item=>{
          item.datetime =  this.renderTime(item.datetime)
        })
        this.setData({
          exchangList: results
        })
      })
 
    }

    // console.log(this.data.points)
    // console.log(this.data.level)  //石分宝
    // console.log(this.data.currentExp)  //用户等级
    // console.log(currentExp)  //达人值

  },

   renderTime(date) {
    var dateee = new Date(date).toJSON();
    return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
  },

  next(e) {

    const date = new Date()
    const today = date.getDate()
    const currentMouth = date.getMonth() + 1
    console.log(currentMouth)
    if (e.detail.currentMonth == currentMouth) {
      this.chakan()
    } else {
      this.setData({
        dayStyle: []
      })
    }

  },
  getda() {
    var that = this
    api.request('POST', '/volunteer/getMessageContinuityDayByUserID', {
      userID: wx.getStorageSync('userID')
    }).then(res => {
      var {
        data: {
          results
        }
      } = res
      console.log(results)
      that.setData({
        continuity: results
      })
    })
  },
  // 点击上月按钮
  prev(e) {
    const date = new Date()
    const today = date.getDate()
    const currentMouth = date.getMonth() + 1
    if (e.detail.currentMonth == currentMouth) {
      this.chakan()
    } else {
      this.setData({
        dayStyle: []
      })
    }
  },

  // 点击查看更多按钮

  chakan() {
    this.setData({
      dayStyle: []
    })
    api.request('POST', '/voluteer/queryMonthClockList', {
      userID: wx.getStorageSync('userID')
    }).then(res => {
      var {
        data
      } = res
      var days = data.results
      days.forEach(item => {
        this.data.dayStyle.push({
          month: 'current',
          day: item,
          color: 'white',
          background: '#54e0f6'
        })
      })

      this.setData({
        dayStyle: this.data.dayStyle
      })
    })
    this.setData({
      show: true
    })
  },
  // 用户签到按钮
  signInBTtn() {
    api.request('POST', '/voluteer/insertClockData', {
      userID: wx.getStorageSync('userID')
    }).then(res => {
      var {
        data: data
      } = res
      if (data.results == '签到成功') {
        Notify({
          type: 'success',
          message: '签到成功，获得1个达人值！'
        });
        this.weekSign()
        this.getuserRanking()
        this.getSum()
      } else {
        Notify({
          type: 'warning',
          message: '请勿重复签到！'
        });
      }

    })
  },
  // 本周签到
  weekSign() {
    this.setData({
      numberList: [{
        number: '+1',
        week: '周一',
        day: 1,
        sure: '未打卡'
      }, {
        number: '+1',
        week: '周二',
        day: 2,
        sure: '未打卡'
      }, {
        number: '+1',
        week: '周三',
        day: 3,
        sure: '未打卡'
      }, {
        number: '+1',
        week: '周四',
        day: 4,
        sure: '未打卡'
      }, {
        number: '+1',
        week: '周五',
        day: 5,
        sure: '未打卡'
      }, {
        number: '+1',
        week: '周六',
        day: 6,
        sure: '未打卡'
      }, {
        number: '+3',
        week: '周日',
        day: 7,
        sure: '未打卡'
      }]
    })
    api.request('POST', '/voluteer/queryWeekClockList', {
      userID: wx.getStorageSync('userID')
    }).then(res => {
      var {
        data
      } = res
      this.setData({
        continuitys: data.results
      })

      this.data.numberList.forEach((item,index) => {
        this.data.continuitys.forEach(its => {
          if (item.day == its) {
            item.sure = '打卡'
          }
          if(index == 6){
            if (item.sure = '未打卡'){
              item.number = '+1'
            }else{
              item.number = '+3'
            }
          }
        })
      })
      this.setData({
        numberList: this.data.numberList
      })
    })
  },
  // getda() {
  //   var that = this
  //   api.request('POST', '/volunteer/getMessageContinuityDayByUserID', {
  //     userID: wx.getStorageSync('userID')
  //   }).then(res => {
  //     var { data: { results } } = res
  //     console.log(results)
  //     that.setData({
  //       continuity: results
  //     })
  //   })
  // },
  // 点击跳转奖品领取页面
  prize() {
    wx.navigateTo({
      url: '../prizePage/index'　　 // 页面 B
    })
  },
  // 达人挑战跳转
  challenge() {
    wx.navigateTo({
      url: '../challenge/index'　　 // 页面 B
    })
  },
  // 天天抽奖跳转
  luckdraw() {
    wx.navigateTo({
      url: '../luckdraw/index'　　 // 页面 B
    })
  },
  // 站内邮箱跳转
  mailbox() {
    wx.navigateTo({
      url: '../mailbox/index'　　 // 页面 B
    })
  },

  // 我的地址跳转
  address() {
    wx.navigateTo({
      url: '../address/index'　　 // 页面 B
    })
  },


  // 点击跳转排行榜
  rankingList() {
    wx.navigateTo({
      url: '../rankingList/index'　　 // 页面 B
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
      console.log(data)
      this.setData({
     
        experiences: data.results.experience,
        nextLevel: data.results.nextLevel,
        ranking: data.results.ranking,
        currentExp: data.results.currentExp,
        experience: data.results.levelExp,
        hisRank: data.results.hisRank,
        level: data.results.level,
        levelName: data.results.levelName
      })
      var uVal = this.data.experience - this.data.currentExp
      var x = this.data.currentExp / this.data.nextLevel * 100
      this.setData({
        width: x,
      })
    })
  },
  // currentExp:当前经验值
  // experience: 总经验
  // level： 级别
  //levelName '达人'
  // nextLevel：'下一级的经验'
  //ranking 所有社区排命
  // 当前小区排名 residRank
  //hisRank // 最高排名
  // levelExp // 
  // 获取历史最高排名
  // getOld() {
  //   api.request('POST', '/volunteer/getHighestRanking', {
  //     userID: wx.getStorageSync('userID')
  //   }).then(res => {
  //     var { data: { results } } = res

  //     this.setData({ oldList: results })
  //   })
  // },
  // 获取总积分
  getSum() {
    api.request('POST', '/volunteer/getTotalPoints', {
      userID: wx.getStorageSync('userID')
    }).then(res => {
      var {
        data: { results}
      } = res
    
      this.setData({
        sumlist: results
      })
 
    })
  },


  // 获取用户本月积分和本月排名
  // getuser() {
  //   api.request('POST', '/volunteer/getAccumulatePointsByUserID', {
  //     userID: wx.getStorageSync('userID')
  //   }).then(res => {

  //     var {
  //       data: {
  //         results
  //       }
  //     } = res

  //     this.setData({
  //       userLsit: results
  //     })
  //   })
  // },

  delImg() {
    this.setData({
      show: false
    })
  },
  // 跳转打卡页面
  detailed() {
    wx.navigateTo({
      url: '../prizeDetail/index'　　 // 页面 B
    })
  },
  prizes() {
    wx.navigateTo({
      url: '../find/index'　　 // 页面 B
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getda()
    const date = new Date()
    const today = date.getDate()
    const currentMouth = date.getMonth() + 1
    this.setData({
      newTime: currentMouth
    })
    this.getWidth()
    wx.setNavigationBarTitle({
      title: '达人榜',
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
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (wx.getStorageSync('phone') && wx.getStorageSync('userID')) {
      this.getUserRead()
      // this.getda()
      // 一周签到
      this.weekSign()
      // 获取用户排名
      this.getuserRanking()
      // this.getuser()
      // 获取总积分
      this.getSum()
      // 获取历史最高
      // this.getOld()
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
    } else {
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