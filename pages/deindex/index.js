const api = require("../../service/http.js");
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    flages: false,
    datas: [],
    timer: '',//定时器名字
    countDownNum: '10'//倒计时初始值
  },

  onShow: function () {

    this.setData({
      countDownNum: 10
    })
    //什么时候触发倒计时，就在什么地方调用这个函数
    this.countDown();

    this.getAllarrs()
  },
  onUnload: function () {
    clearInterval(this.data.timer)
    this.setData({
      countDownNum: 10
    })
  },
  getAllarrs() {
    api.request('POST', '/volunteer/getArticleListByID', {
      id: wx.getStorageSync('id')
    }).then(res => {
      var { data: results } = res

      this.setData({
        datas: results.results
      })
      console.log(this.data.datas)
    })
  },
  countDown: function () {
    let that = this;
    let countDownNum = that.data.countDownNum;//获取倒计时初始值
    //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
    that.setData({
      timer: setInterval(function () {//这里把setInterval赋值给变量名为timer的变量
        //每隔一秒countDownNum就减一，实现同步
        countDownNum--;
        //然后把countDownNum存进data，好让用户知道时间在倒计着
        that.setData({
          countDownNum: countDownNum
        })
        //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
        if (that.data.countDownNum == 0) {
          api.request('POST', '/volunteer/insertStudy', {
            userID: wx.getStorageSync('userID'),
            residentialAreas: wx.getStorageSync('residentialAreas'),
            articleID: wx.getStorageSync('id')
          }).then(res => {
            var { data } = res

            if (data.msg == '已阅读过') {
              Dialog.alert({
                title: '温馨提示',
                message: '该文章已阅读！',
                asyncClose: true,
                showConfirmButton: false,
                width:'200px'
              })
              setTimeout(() => {
                Dialog.close();
              }, 3000);
            } else if (data.results[0].readState == 3) {
              Dialog.alert({
                title: '温馨提示',
                message: '三篇已完成，获得一积分',
                asyncClose: true,
                showConfirmButton: false,
                width: '200px'
              })
              setTimeout(() => {
                Dialog.close();
              }, 3000);
            }
            else if (data.msg == '操作成功') {
              Dialog.alert({
                title: '温馨提示',
                message: '今天已阅读' + data.results[0].readState + '篇文章 , 三篇完成后，获得一积分',
                asyncClose: true,
                showConfirmButton: false,
                width: '200px'
              })
              setTimeout(() => {
                Dialog.close();
              }, 2000);
            }
          })
          //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
          //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
          clearInterval(that.data.timer);
          //关闭定时器之后，可作其他处理codes go here
        }
      }, 1000)
    })
  }
})
