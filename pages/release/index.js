// pages/volunteerProblem/index.js
import Poster from '../../miniprogram_dist/poster/poster';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog.js';
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
var amapFile = require('../../libs/amap-wx.js'); //如：..­/..­/libs/amap-wx.js
const api = require("../../service/http.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ss:'',
    sure:false,
    img: '',
    fall: false,
    flag: true,
    fileList: [], // 预览图片的数据
    position: '',
    maskHidden: false, // 隐藏的图片
    touxiang:'',
    name:'',
    userImg:''
  },
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
    var path6 = "/style/images/weixinmengmeng.png";
    var path7 = "/style/images/mengmeng.png";
    var path8 = "/style/images/posi.png";
    context.drawImage(path2, 204, 40, 317, 100);
    context.drawImage(path8, 340, 145, 22,22 );
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

    context.fillText(wx.getStorageSync('x')+'.'+wx.getStorageSync('y'), 82, 77);
    context.stroke();

    //绘制一起吃面标语
    context.setFontSize(48);
    context.setFillStyle('#5581b1');
    context.fillText(wx.getStorageSync('xy'), 85, 130);
    context.stroke();
    // 位置信息
    context.setFontSize(14);
    context.setFillStyle('#4677aa');
    context.fillText(that.data.position, 454, 165);
    context.stroke();

    //用户所拍图片
    context.drawImage(wx.getStorageSync('ims'), 16, 175, 514, 319);


    // 灰色背景
    context.drawImage(path4, 16, 660, 514, 133);
    context.drawImage(path6, 440, 685, 76, 76);
    context.drawImage(path7, 26, 690, 82, 82);
    //灰色盒子背景
    context.drawImage(path4, 16, 510, 514, 133);
    //石分达人 
    context.setFontSize(24);
    context.setFillStyle('#2a629d');
    context.fillText("石分达人", 155, 720);
    context.stroke();
    // 标语
    context.setFontSize(20);
    context.setFillStyle('#333333');
    context.fillText("长按识别二维码,注册成为石分达人", 255, 765);
    context.stroke();

    //姓名 
    context.setFontSize(24);
    context.setFillStyle('#2a629d');
    context.fillText(wx.getStorageSync('nickName'), 155, 565);
    context.stroke();
    //标语
    context.setFontSize(20);
    context.setFillStyle('#333333');
    context.fillText("我正在参与石景山垃圾分类活动", 255, 610);
    context.stroke();
    // 竖线
    context.beginPath()
    context.moveTo(407, 550)
    context.lineTo(407, 610)
    context.stroke()
    //累计打卡
    context.setFontSize(24);
    context.setFillStyle('#333333');
    context.fillText("累计打卡", 470, 565);
    context.stroke();

    context.setFontSize(36);
    context.setFillStyle('#2a629d');
    context.fillText(wx.getStorageSync('continuityDay'), 455, 610);
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
          console.log(res);
        }
      });
    }, 1000);
  },

  getPunch(){
    api.request('POST','/volunteer/clockInOrNot',{
      userID: wx.getStorageSync('userID')
    }).then(res=>{
      var { data: results}  = res

      if (results.results == '今日已打卡'){
        this.setData({
          sure:true
        })
      }else{
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
        api.request('POST','/volunteer/updateShareState',{
          userID: wx.getStorageSync('userID')
        }).then(res=>{
          console.log('分享成功')
        })
        wx.showModal({
          content: '图片成功保存到相册了，快去分享朋友圈吧',
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
            console.log(11111)
          }
        })
      }
    })
  },
  hideImg(){
    this.setData({
      maskHidden: false
    })
  },
  //点击生成
  formSubmit: function (e) {
    var that = this;
    this.setData({
      maskHidden: false
    });
    wx.showToast({
      title: '分享图片生成中...',
      icon: 'loading',
      duration: 1000
    });
    setTimeout(function () {
      wx.hideToast()
      that.createNewImg();
      that.setData({
        maskHidden: true
      });
    }, 2000)
  },

  chooseWxImage: function (type) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        that.setData({
          // tempFilePath可以作为img标签的src属性显示图片
          img: res.tempFilePaths[0],
        })
      }
    })
  },

  daka(){
    if (this.data.img){
      this.uploadimg()
    }else{
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
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    //这里触发图片上传的方法
    var that = this
    var myDate = new Date();
     var x= myDate.getFullYear();
     var y =myDate.getMonth() + 1 ;
    var xy = myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate() ;
     console.log(x,y,xy)  
    wx.setStorageSync('x', x)
    wx.setStorageSync('y', y)
    wx.setStorageSync('xy', xy)


    wx.uploadFile({
      url: 'https://179l13s642.51mypc.cn/volunteer/uploadPunchTheClock',
      filePath: that.data.img,
      name: 'file',

      formData: {
        userID: wx.getStorageSync('userID'),
        userName: wx.getStorageSync('nickName'),
        position: that.data.position,
        headPath: wx.getStorageSync('userImg'),
        residentialAreas: wx.getStorageSync('residentialAreas')
      },
      success(res) {
        var data  = JSON.parse(res.data)

        if (data.success == true) {
          
          var a = JSON.parse(res.data)
          console.log(a)
          wx.downloadFile({

            url: a.results.picturePath, //仅为示例，并非真实的资源
            success: function (res) {
              // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
              if (res.statusCode === 200) {
                wx.hideLoading()
                that.setData({
                  sure:true
                })
                Dialog.alert({
                  title: '温馨提示',
                  message: '今日您已打卡成功,获得一积分！',
                  asyncClose: true,
                  showConfirmButton: false,
                  width: '200px'
                })
                setTimeout(() => {
                  Dialog.close();
                }, 2000);
           
                that.setData({
                  userImg: res.tempFilePath
                })
                wx.setStorageSync('ims', res.tempFilePath)
                wx.setStorageSync('continuityDay', a.results.continuityDay)
              }
            }
          })
    
     
          that.setData({ fall: true })
          // // 返回首页
          // setTimeout(function() {
          //   wx.navigateBack({
          //     delta: 0
          //   })
          // }, 1000)
        } else {
     
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



  // 提交图片的按钮
  submit() {
    let that = this;

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    wx.setNavigationBarTitle({
      title: '打卡',
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
    // 获取打卡状态
    this.getPunch()
    wx.downloadFile({
      url: wx.getStorageSync('userImg'), //仅为示例，并非真实的资源
      success: function (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          console.log(res, "reererererer")
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
        wx.setStorageSync('position', data[0].name)
        that.setData({
          position: data[0].name

        })
      },
      fail: function (info) {
        //失败回调
        console.log(info)
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