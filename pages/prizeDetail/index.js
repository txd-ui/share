const api = require("../../service/http.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    changValtrues:false,
    king:'',
    selectFont: '',
    changValtrue: false,
    selectImg: '',
    allPage: 1,
    pages: 1, // 页数
    myLuckLists: [],
    show: false,
    // 抽奖的数据
    sumlist: null,
    sizeShow: 1,
    speed: 200,
    circleList: [], //圆点数组
    awardList: [], //奖品数组
    colorCircleFirst: '#FFDF2F', //圆点颜色1
    colorCircleSecond: '#ff9a98', //圆点颜色2
    colorAwardDefault: '#F5F0FC', //奖品默认颜色
    colorAwardSelect: '#ffe400', //奖品选中颜色
    indexSelect: -1, //被选中的奖品index
    isRunning: false, //是否正在抽奖
    imageAward: [

    ], //奖品图片数组
    // 抽奖的数据
    move: 0,
    detail: [],
  },

  // 获取奖品列表
  getGiftList() {
    this.setData({
      imageAward: []
    })
    api.request('POST', '/voluteer/queryLuckDrawPrize').then(res => {
      var {
        data: {
          results
        }
      } = res

      results.forEach(item => {
        this.data.imageAward.push(item)
        // 
      })
      this.setData({
        imageAward: this.data.imageAward
      })

this.rotation()
    })
  },
  getUserLuck() {

    // 获取用户的抽奖次数
    api.request('POST', '/voluteer/queryLuckDrawTimes', {
      userID: wx.getStorageSync('userID')

    }).then(res => {
      var {
        data: {
          results
        }
      } = res
      this.setData({
        sizeShow: results.times
      })
    })
  },
  getUserList(page) {
    var that  =this
    api.request('POST', '/voluteer/queryLuckDrawRecordAll', {
      page: page,
      limit: 10
    }).then(res => {
 
      var {
        data
      } = res
      
       if(data.results.list != null){
        data.results.list.forEach(item => {
          item.telephone = item.telephone.substring(0, item.telephone.length - 5) + '*****'
          this.data.detail.push(item)
        })
       }else{
        data.results.list=null
       }

        this.setData({
          detail: this.data.detail
          })

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGiftList()
    this.getSum()
    var page = 1
    this.getUserList(page)
    this.getUserLuck()
  
    wx.setNavigationBarTitle({
      title: '幸运抽奖'
    })
    var page = 1
    let that = this
    let wirel = setInterval(function () {


      that.setData({
        move: that.data.move + 1,
      })
    }, 50)

    that.data.king = setInterval(function () {
      
      page ++
      let detail = []
   
      
     if(page>10){
       page = 1
     }
        for (let i = 1; i < 10; i++) {

          detail.push(that.data.detail[ Math.floor(Math.random() * 3) + 1])
        }
  
        for (let i = 0; i < detail.length; i++) {
  
          detail[i].telephone = detail[i].telephone.substring(0, detail[i].telephone.length - 3) + '***'
        }
        that.setData({
          detail: detail,
          move: 0
        })
        that.getUserList(page)   
 
    }, 6000)
  },
  // 关闭遮罩层
  close() {
    this.setData({
      show: false
    })
  },

  // 上一页事件
  upperPage() {

    if (this.data.pages > 1) {
      console.log(this.data.pages)
      this.setData({
        pages: this.data.pages - 1
      })
      this.getmyLuckList()
    }

  },
  // 下一页事件
  nextPage() {
    if (this.data.pages >= this.data.allPage) {

    } else {
      this.setData({
        pages: this.data.pages + 1
      })
      this.getmyLuckList()
    }



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
     
      results.forEach(item => {
        var dateee = new Date(item.createTime).toJSON();
        item.createTime = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')


      })
      this.setData({
        myLuckLists: results

      })
    })
  },

  myLuckList() {
    // this.getmyLuckList()
    // this.setData({
    //   show: true
    // })
    wx.navigateTo({
      url: '../myLuckList/index' // 页面 B
    })

  },

  //开始游戏
  startGame: function () {
    var _this = this;
    var flag =false
    if (_this.data.isRunning) return
    _this.setData({
      isRunning: true
    })
    var indexSelect = 0
    var indexSelects
    var i = 0;

    api.request('POST', '/voluteer/luckDraw', {
      userID: wx.getStorageSync('userID')
    }).then(res => {
      _this.getSum()
      var {
        data: {
          results
        }
      } = res
   
      if (results) {
        indexSelects = results.prize

        var timer = setInterval(() => {

          //这里我只是简单粗暴用y=30*x+200函数做的处理.可根据自己的需求改变转盘速度
          i += 100;
          // let randomNum = Math.floor(Math.random() * 10) * 10; //可均衡获取0到90的随机整数
          // i += randomNum;
          indexSelect++;
          if (i >= 900) {
            clearInterval(timer)
            var setTime = setInterval(() => {
               _this.setData({
                indexSelect: indexSelect
              })
              _this.data.imageAward.forEach((item, index) => {

                if (indexSelects == index) {
                  _this.setData({
                    selectImg: item.pictureUrl,
                    selectImgFont: item.prizeName
                  })
                }
              })
              //这里我只是简单粗暴用y=30*x+200函数做的处理.可根据自己的需求改变转盘速度
              i += 30;
              // let randomNum = Math.floor(Math.random() * 10) * 10; //可均衡获取0到90的随机整数
              // i += randomNum;
              indexSelect++;
             
              if (i >= 1000 && _this.data.indexSelect == indexSelects) {
                flag =true
                _this.setData({
                  indexSelect: indexSelects
                })
                clearInterval(setTime)
                //获奖提示
                //去除循环

                _this.setData({
                  changValtrue: true
                })
                setTimeout(() => {

                  _this.getUserLuck()
                  _this.setData({
                    changValtrue: false,
                    isRunning: false,
                    indexSelect:0
                  })
                }, 3000)
              }
              
              if(flag == false){
                indexSelect = indexSelect % 8;


                // 判断返回的值是否和当前的相等，相等后停止
                _this.setData({
                  indexSelect: indexSelect
                })
              
              }

           


            }, 800);
          }
         
          indexSelect = indexSelect % 8;
          // 判断返回的值是否和当前的相等，相等后停止
          _this.setData({
            indexSelect: indexSelect
          })

        }, _this.data.speed + i)
      } else {
      
        _this.setData({
          changValtrues: true,
          changValtruesVal:res.data.msg
        })
        setTimeout(() => {
          _this.setData({
            changValtrues: false,
            isRunning:false
          })
        }, 3000)
      }

    })

  },

  rotation() {

    var _this = this;
    //圆点设置
    var leftCircle = 7.5;
    var topCircle = 7.5;
    var circleList = [];
    for (var i = 0; i < 24; i++) {
      if (i == 0) {
        topCircle = 15;
        leftCircle = 15;
      } else if (i < 6) {
        topCircle = 7.5;
        leftCircle = leftCircle + 102.5;
      } else if (i == 6) {
        topCircle = 15
        leftCircle = 620;
      } else if (i < 12) {
        topCircle = topCircle + 94;
        leftCircle = 620;
      } else if (i == 12) {
        topCircle = 565;
        leftCircle = 620;
      } else if (i < 18) {
        topCircle = 570;
        leftCircle = leftCircle - 102.5;
      } else if (i == 18) {
        topCircle = 565;
        leftCircle = 15;
      } else if (i < 24) {
        topCircle = topCircle - 94;
        leftCircle = 7.5;
      } else {
        return
      }
      circleList.push({
        topCircle: topCircle,
        leftCircle: leftCircle
      });
    }
    this.setData({
      circleList: circleList
    })
    //圆点闪烁
    setInterval(function () {
      if (_this.data.colorCircleFirst == '#FFDF2F') {
        _this.setData({
          colorCircleFirst: '#ff9a98',
          colorCircleSecond: '#FFDF2F',
        })
      } else {
        _this.setData({
          colorCircleFirst: '#FFDF2F',
          colorCircleSecond: '#ff9a98',
        })
      }
    }, 500)
    //奖品item设置
    var awardList = [];
    //间距,怎么顺眼怎么设置吧.
    var topAward = 25;
    var leftAward = 25;
    for (var j = 0; j < 8; j++) {
      if (j == 0) {
        topAward = 25;
        leftAward = 25;
      } else if (j < 3) {
        topAward = topAward;
        //166.6666是宽.15是间距.下同
        leftAward = leftAward + 166.6666 + 15;
      } else if (j < 5) {
        leftAward = leftAward;
        //150是高,15是间距,下同
        topAward = topAward + 150 + 15;
      } else if (j < 7) {
        leftAward = leftAward - 166.6666 - 15;
        topAward = topAward;
      } else if (j < 8) {
        leftAward = leftAward;
        topAward = topAward - 150 - 15;
      }
      var imageAward = this.data.imageAward[j];
      awardList.push({
        topAward: topAward,
        leftAward: leftAward,
        imageAward: imageAward.pictureUrl,
        imageAwards: imageAward.grade
      });
    }
    this.setData({
      awardList: awardList
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
  // 获取石分宝
  // 获取总积分
  getSum() {
    api.request('POST', '/volunteer/getTotalPoints', {
      userID: wx.getStorageSync('userID')
    }).then(res => {
      var {
        data: {
          results
        }
      } = res

      this.setData({
        sumlist: results
      })

    })
  },

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
    clearInterval(this.data.king)
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