// pages/luckdraw/index.js
const api = require("../../service/http.js");
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog.js';
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Page({

  /**
   * 页面的初始数据
   */
  data: {

    ruleList:[{name:'生铁达人',imgSrc:'../../style/img/sheng.png', number:10, numbers:1,serial:'1'},
    {name:'精钢达人', imgSrc:'../../style/img/jing.png', number:20, numbers:3, serial:'2' ,serial:'2'},
    {name:'青铜达人',  imgSrc:'../../style/img/qing.png', number:30, numbers:5,serial:'3'},
    {name:'紫铜达人',  imgSrc:'../../style/img/zitong.png', number:50, numbers:10, serial:'4'},
    {name:'白银达人', imgSrc:'../../style/img/zuyin.png', number:100, numbers:25 , serial:'5'},
    {name:'足银达人',  imgSrc:'../../style/img/zuyin.png', number:100, numbers:30, serial:'6'},
    {name:'黄金达人',  imgSrc:'../../style/img/huang.png', number:100, numbers:35, serial:'7'},
    {name:'足金达人',  imgSrc:'../../style/img/zujin.png', number:100, numbers:40, serial:'8'},
    {name:'铂金达人', imgSrc:'../../style/img/baijin.png', number:100, numbers:45, serial:'9'},
    {name:'钻石达人',  imgSrc:'../../style/img/zuanshi.png', number:100, numbers:50, serial:'10'}
  ],
    active:'a',
    userImg:'',
    experiences: '',
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
  },
  rule(){
  this.setData({
    shows:true
  })
  },
  ruleList(e){
 
    if(e.detail.name =='b'){
      this.getUserRecord()
    }
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
            
              this.getuserRanking()
              this.getSum()
    
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
  exchange() {
    // this.setData({
    //   shows: true,
    // })
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
        console.log(canVal)

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
        canVals: canVal,
        addBtn: false,
        changeVal: 0,
      })
 
      // api.request('POST', '/voluteer/queryConvertLog', {
      //   userID: wx.getStorageSync('userID')
      // }).then(res => {
      //   var { data: { results } } = res
      //   results.forEach(item => {
      //     item.datetime = this.renderTime(item.datetime)
      //   })
      //   this.setData({
      //     exchangList: results
      //   })
      // })

    }

    // console.log(this.data.points)
    // console.log(this.data.level)  //石分宝
    // console.log(this.data.currentExp)  //用户等级
    // console.log(currentExp)  //达人值

  },

  // 用户兑换记录
  
    getUserRecord(){
      // 兑换时间 createTime
      // 兑换几次  times
      api.request('POST', '/voluteer/queryConvertLog', {
        userID: wx.getStorageSync('userID')
      }).then(res => {
        var { data: { results } } = res
        this.setData({
          exchangList: results
        })
      })
    },
  // 石分宝的值
  getSum() {
    api.request('POST', '/volunteer/getTotalPoints', {
      userID: wx.getStorageSync('userID')
    }).then(res => {
      var {
        data: { results }
      } = res
      this.setData({
        sumlist: results
      })
      if (res.data.results[0].points){
     
        setTimeout(()=>{
          this.exchange()
        },100)
      

        
     
      }
     


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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 用户兑换记录
    this.getUserRecord()
    this.getSum()
    this.getuserRanking()
    this.setData({
      userImg: wx.getStorageSync('userImg'),
      userName: wx.getStorageSync('nickName')
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