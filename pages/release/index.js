// pages/volunteerProblem/index.js
import Poster from '../../miniprogram_dist/poster/poster';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog.js';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import { base64src } from '../../utils/util.js'
var amapFile = require('../../libs/amap-wx.js'); //如：..­/..­/libs/amap-wx.js
const api = require("../../service/http.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemAsel:'',
    dayStyle: [],
    show: false,
    // 画出图片的宽度和高度
    canvasWidth: '',
    canvasHeight: '',
    // 打卡时间
    clockTime: '',
    shareQrImg: '',
    longitude: '',
    latitude: '',
    ss: '',
    sure: false,
    img: '',
    fall: false,
    flag: true,
    fileList: [], // 预览图片的数据
    position: '',
    maskHidden: false, // 隐藏的图片
    touxiang: '',
    name: '',
    userImg: '',
    numberList: [{ number: '+2', week: '周一', day: 1, sure: '未打卡' }, { number: '+2', week: '周二', day: 2, sure: '未打卡' }, { number: '+2', week: '周三', day: 3, sure: '未打卡' }, { number: '+2', week: '周四', day: 4, sure: '未打卡' }, { number: '+2', week: '周五', day: 5, sure: '未打卡' }, { number: '+2', week: '周六', day: 6, sure: '未打卡' }, { number: '+2', week: '周日', day: 7, sure: '未打卡' }, { numbersss: 3 }],
    numberLists: [{ number: '+2', week: '周一' }, { number: '+2', week: '周二' }, { number: '+2', week: '周三' }, { number: '+2', week: '周四' }, { number: '+2', week: '周五' }, { number: '+2', week: '周六' }, { number: '+2', week: '周日' }],
  },

  // 点击查看日历
  chakan() {
    this.setData({
      dayStyle: []
    })
    api.request('POST', '/volunteer/getMonthContinuityDayByUserID', {
      userID: wx.getStorageSync('userID')
    }).then(res => {
      var { data } = res
      var days = data.results
      days.forEach(item => {
        this.data.dayStyle.push({ month: 'current', day: item, color: 'white', background: '#54e0f6' })
      })


      this.setData({
        dayStyle: this.data.dayStyle
      })
    })
    this.setData({
      show: true
    })
  },
  delImg() {
    this.setData({
      show: false
    })
  },
  // dayClick: function (event) {

  weekSign() {
    this.setData({
      numberList: [{ number: '+2', week: '周一', day: 1, sure: '未打卡' }, { number: '+2', week: '周二', day: 2, sure: '未打卡' }, { number: '+2', week: '周三', day: 3, sure: '未打卡' }, { number: '+2', week: '周四', day: 4, sure: '未打卡' }, { number: '+2', week: '周五', day: 5, sure: '未打卡' }, { number: '+2', week: '周六', day: 6, sure: '未打卡' }, { number: '+2', week: '周日', day: 7, sure: '未打卡' }, { number: 3 }],
    })
    api.request('POST', '/volunteer/getMessageContinuityDayByUserID', {
      userID: wx.getStorageSync('userID')
    }).then(res => {
      var { data } = res
      console.log(data)
      this.setData({
        continuity: data.results,
        itemAsel:data.results[data.results.length-1]
      })
      this.data.numberList.forEach((item) => {
        this.data.continuity.forEach(its => {
          if (item.day == its) {
            item.sure = '打卡'
          }
        })
      })
      this.setData({
        numberList: this.data.numberList
      })
    })
  },
  //   let changeDay = `dayStyle[1].day`;
  //   let changeBg = `dayStyle[1].background`;
  //   this.setData({
  //     [changeDay]: clickDay,
  //     [changeBg]: "#84e7d0"
  //   })

  // },


  // 获取用户打卡的天数
  // getUserDay() {
  //   api.request('POST', '', {}).then(res => {
  //     console.log(res)
  //   })
  // },
  // getda() {
  //   var that = this
  //   api.request('POST', '/volunteer/getMessageContinuityDayByUserID', {
  //     userID: wx.getStorageSync('userID')
  //   }).then(res => {
  //     var { data: { results } } = res
  //     console.log(res)
  //     that.setData({
  //       continuity: results
  //     })
  //   })
  // },

  // 生成图片逻辑
  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg: function () {

    var that = this;
    var context = wx.createCanvasContext('mycanvas');
    context.setFillStyle("#fff")
    context.fillRect(0, 0, 540, 828)
    var path = "/style/images/xiantiaokuang.png";
    //将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片
    //不知道是什么原因，手机环境能正常显示
    context.drawImage(path, 26, 27, 120, 128);
    var path1 = that.data.touxiang;
    //将模板图片绘制到canvas,在开发工具中drawImage()函数有问题，不显示图片
    var path2 = "/style/images/biaoyu1.png";
    var path3 = that.data.touxiang;
    var path4 = "/style/images/kuang.png";
    var path5 = "/style/images/appletBackground.jpg";
    var path7 = "/style/images/mengmeng.png";
    var path8 = "/style/images/posi.png";
    var path6 = wx.getStorageSync('mySrcImg')
    var mypath = wx.getStorageSync('nowImg')
    context.drawImage(path2, 204, 40, 317, 100);
    context.drawImage(path8, 340, 145, 22, 22);
    //不知道是什么原因，手机环境能正常显示
    // context.save(); // 保存当前context的状态

    var name = that.data.name;
    //绘制名字
    context.setFontSize(24);
    context.setFillStyle('#333333');
    context.setTextAlign('center');
    context.fillText(name, 185, 340);
    context.stroke();
    //绘制一起吃面标语
    context.setFontSize(20);
    context.setFillStyle('#5581b1');

    context.fillText("石分达人", 85, 37);
    context.stroke();
    //绘制一起吃面标语
    context.setFontSize(28);
    context.setFillStyle('#5581b1');

    context.fillText(wx.getStorageSync('x') + '.' + wx.getStorageSync('y'), 82, 77);
    context.stroke();

    //绘制一起吃面标语
    context.setFontSize(48);
    context.setFillStyle('#5581b1');
    context.fillText(wx.getStorageSync('xy'), 85, 130);
    context.stroke();
    // 位置信息
    context.setFontSize(14);
    context.setFillStyle('#4677aa');
    context.fillText(wx.getStorageSync('position'), 454, 165);
    context.stroke();


    //用户所拍图片

    context.drawImage(mypath, 16, 175, 512, 450);
    // 灰色背景
    context.drawImage(path4, 16, 660, 514, 133);
    context.drawImage(path6, 440, 690, 76, 76);
    context.drawImage(path7, 26, 690, 82, 82);
    //灰色盒子背景
    context.drawImage(path4, 16, 510, 514, 133);
    //石分达人 
    context.setFontSize(24);
    context.setFillStyle('#2a629d');
    context.setTextAlign('left');
    context.fillText("石分达人", 110, 720);
    context.stroke();
    // 标语
    context.setFontSize(20);
    context.setFillStyle('#333333');
    context.fillText("长按识别二维码,注册成为石分达人", 110, 765);
    context.stroke();

    //姓名 
    context.setFontSize(24);
    context.setTextAlign('left');
    context.setFillStyle('#2a629d');
    context.fillText(wx.getStorageSync('nickName'), 110, 565);
    context.stroke();
    //标语
    context.setFontSize(20);
    context.setFillStyle('#333333');

    context.fillText("我正在参与石景山垃圾分类活动", 110, 610);
    context.stroke();
    // 竖线
    context.beginPath()
    context.moveTo(407, 550)
    context.lineTo(407, 610)
    context.stroke()
    //累计打卡
    context.setFontSize(24);
    context.setFillStyle('#333333');
    context.fillText("本周打卡", 430, 565);
    context.stroke();

    context.setFontSize(36);
    context.setFillStyle('#2a629d');
    context.fillText(this.data.continuity.length, 455, 610);
    context.stroke();

    context.setFontSize(20);
    context.setFillStyle('#416fa4');
    context.fillText("天", 490, 610);
    context.stroke();

    //绘制头像
    context.beginPath(); //开始绘制
    //先画个圆
    context.arc(66, 580, 40, 0, Math.PI * 2, false);
    context.clip();
    context.drawImage(path3, 26, 540, 80, 80); // 推进去图片
    context.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 可以继续绘制
    context.draw();
    context.drawImage(path5, 0, 530, 540, 300);
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          that.setData({
            imagePath: tempFilePath,
            canvasHidden: true
          });
        },
        fail: function (res) {

        }
      });
    }, 1000);
  },

  getPunch() {
    api.request('POST', '/volunteer/clockInOrNot', {
      userID: wx.getStorageSync('userID')
    }).then(res => {
      var { data: results } = res

      if (results.results == '今日已打卡') {
        this.setData({
          sure: true
        })
      } else {
        this.setData({
          sure: false
        })
      }
    })
  },
  //点击保存到相册
  baocun: function () {
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imagePath,
      success(res) {
        api.request('POST', '/volunteer/updateShareState', {
          userID: wx.getStorageSync('userID')
        }).then(res => {
          console.log(res)
          console.log(res.data.success)
          if(res.data.success != false){
            wx.showModal({
              content: '快去分享到朋友圈吧,分享成功会获得1个石分宝！',
              showCancel: false,
              confirmText: '好的',
              confirmColor: '#818FFB',
              success: function (res) {
                if (res.confirm) {
                  /* 该隐藏的隐藏 */
                  that.setData({
                    maskHidden: false
                  })
                }
              }, fail: function (res) {
    
              }
            })
          }else{
             wx.showModal({
              content: res.data.msg
             })
          }
        })
    
      }
    })
  },
  hideImg() {
    this.setData({
      maskHidden: false
    })
  },
  //点击生成
  formSubmit: function (e) {
    if (wx.getStorageSync('nowImg')) {
      var that = this;
      this.setData({
        maskHidden: false
      });
      wx.showToast({
        title: '图片生成中...',
        icon: 'loading',
        duration: 1000
      });
      setTimeout(function () {
        wx.hideToast()
        that.createNewImg();
        that.setData({
          maskHidden: true
        });
      }, 100)
    } else {

      Dialog.alert({
        title: '温馨提示',
        message: '请您先打卡再分享！',
        asyncClose: true,
        showConfirmButton: false,
        width: '200px'
      })
      setTimeout(() => {
        Dialog.close();
      }, 2000);
    }






  },

  chooseWxImage: function (type) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: [type], // 可以指定来源是相册还是相机，默认二者都有
      success: function (photo) {

        wx.getImageInfo({
          src: photo.tempFilePaths[0],
          success: function (res) {
            console.log(photo.tempFilePaths[0])
            wx.setStorageSync('myImg', photo.tempFilePaths[0])
            var ctx = wx.createCanvasContext('photo_canvas');
            var ratio = 2;
            var canvasWidth = res.width
            var canvasHeight = res.height;
            // 保证宽高均在200以内
            while (canvasWidth > 200 || canvasHeight > 200) {
              //比例取整
              canvasWidth = Math.trunc(res.width / ratio)
              canvasHeight = Math.trunc(res.height / ratio)
              ratio++;
            }
            that.setData({
              canvasWidth: canvasWidth,
              canvasHeight: canvasHeight
            })//设置canvas尺寸
            ctx.drawImage(photo.tempFilePaths[0], 0, 0, canvasWidth, canvasHeight)
            ctx.draw()
            //下载canvas图片
            setTimeout(function () {
              wx.canvasToTempFilePath({
                canvasId: 'photo_canvas',
                success: function (res) {
                  that.setData({
                    // tempFilePath可以作为img标签的src属性显示图片
                    img: res.tempFilePath
                  })
                },
                fail: function (error) {
                  console.log(error)
                }
              })
            }, 100)
          },
          fail: function (error) {
            console.log(error)
          }
        })

      },
      error: function (res) {
        console.log(res);
      }
    })






  },

  daka() {
    if (this.data.img) {
      this.uploadimg()
    } else {
      Dialog.alert({
        title: '温馨提示',
        message: '请您先拍照，再打卡！',
        asyncClose: true,
        showConfirmButton: false,
        width: '200px'
      })
      setTimeout(() => {
        Dialog.close();
      }, 2000);
    }

  },
  chooseimage: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#333",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })

  },




  yincang() {
    this.setData({ img: '' })
  },

  onClose(event) {
    const {
      position,
      instance
    } = event.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？',
        }).then(() => {
          instance.close();
        });
        break;
    }
  },
  uploadimg: function () {
    wx.showLoading({
      title: '打卡中...',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    //这里触发图片上传的方法
    var that = this
    var myDate = new Date();
    var x = myDate.getFullYear();
    var y = myDate.getMonth() + 1;
    var xy = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate();
    wx.setStorageSync('x', x)
    wx.setStorageSync('y', y)
    wx.setStorageSync('xy', xy)
    wx.uploadFile({
      url: 'http://192.168.1.110:9051/volunteer/uploadPunchTheClock',
      filePath: that.data.img,
      name: 'file',

      formData: {
        userID: wx.getStorageSync('userID'),
        userName: wx.getStorageSync('nickName'),
        position: that.data.position,
        headPath: wx.getStorageSync('userImg'),
        residentialAreas: wx.getStorageSync('residentialAreas'),
        longitude: that.data.longitude,
        latitude: that.data.latitude

      },
      success(res) {
        var data = JSON.parse(res.data)
        if (data.success == true) {
          wx.setStorageSync('nowImg', that.data.img)
          // 获取成功打卡的位置
          wx.setStorageSync('position', that.data.position)
          // 获取打卡时间
          var date1 = new Date(new Date(new Date().toLocaleDateString()).getTime());
          var startTime = date1.getFullYear() + ((date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1) : (date1.getMonth() + 1)) + (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate())

          wx.setStorageSync('clockTime', startTime)
          var a = JSON.parse(res.data)
          wx.hideLoading()
          that.setData({
            sure: true
          })
          that.weekSign()
          setTimeout(() => {
            that.translate()
          }, 1000)
          Dialog.alert({
            title: '温馨提示',
            message: '今日您已打卡成功,获得2个石分宝！',
            asyncClose: true,
            showConfirmButton: false,
            width: '200px'
          })
          setTimeout(() => {
            Dialog.close();
          }, 2000);
          // 连续打卡天数
          wx.setStorageSync('continuityDay', a.results.continuityDay)
          that.setData({ fall: true })

        } else {
          wx.hideLoading()
          Dialog.alert({
            title: '温馨提示',
            message: '检测到今日已打卡，请勿重复打卡！',
            asyncClose: true,
            showConfirmButton: false,
            width: '200px'
          })
          setTimeout(() => {
            Dialog.close();
          }, 2000);
        }
      }
    })
  },
  // 测试压缩图片


  // 提交图片的按钮
  submit() {
    let that = this;

  },
  translate: function () {
    this.animation.translateY(-40).step()
    this.animation.translateY(-25).step()
    this.setData({ animation: this.animation.export() })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.weekSign()
    const date = new Date()
    const today = date.getDate()
    const currentMouth = date.getMonth() + 1
    this.setData({
      newTime: currentMouth
    })
    console.log(this.data.newTime)

    var date1 = new Date(new Date(new Date().toLocaleDateString()).getTime());
    var startTime = date1.getFullYear() + ((date1.getMonth() + 1) < 10 ? "0" + (date1.getMonth() + 1) : (date1.getMonth() + 1)) + (date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate())
    if (Number(startTime) - Number(wx.getStorageSync('clockTime')) <= 0) {
      if (wx.getStorageSync('nowImg')) {
        this.setData({
          img: wx.getStorageSync('nowImg')
        })
      }


    } else {
      wx.setStorageSync('nowImg', '')
      this.setData({
        img: ''
      })
    }
    wx.setNavigationBarTitle({
      title: '打卡',
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.animation = wx.createAnimation()

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {



    // 获取当前时间和打卡时间进行对比

    if (wx.getStorageSync('phone') && wx.getStorageSync('userID')) {
      // 获取打卡状态
      this.getPunch()
      wx.downloadFile({
        url: wx.getStorageSync('userImg'), //仅为示例，并非真实的资源
        success: function (res) {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {

            that.setData({
              touxiang: res.tempFilePath
            })
          }
        }
      })
      this.setData({
        ss: wx.getStorageSync('newIMG')
      })
      // 获取用户位置信息
      var that = this
      var myAmapFun = new amapFile.AMapWX({
        key: '38027e03a9e55ca7b0d43b0bcc9fd675'
      });
      myAmapFun.getRegeo({
        success: function (data) {
          that.setData({
            position: data[0].name,
            longitude: data[0].longitude,
            latitude: data[0].latitude
          })
        },
        fail: function (info) {
          //失败回调

        }
      })
    } else {

      Dialog.alert({
        title: '温馨提示',
        message: '此功能需要您的个人信息,统计您的打卡记录,请前往登录！',
        confirmButtonText: '前往',
        showConfirmButton: 'false',


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