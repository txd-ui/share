import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog.js';
var page = 1;//分页标识，第几次下拉，用户传给后台获取新的下拉数据
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articles: [],//文章列表数组
    flag: false,
  },

 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '发现',
    })
  },
  // 点击发布按钮
  release() {

      wx.navigateTo({
        url: '../release/index'
      })

  },

  onPullDownRefresh: function () {

    this.clearCache();
    this.getArticles(0);//第一次加载数据
  },
  onReachBottom: function () {
    wx.showToast({
      title: '加载中...',
      mask: true,
      icon: 'loading'
    })
    this.getArticles(page);//后台获取新数据并追加渲染
  },
  // 清缓存
  clearCache: function () {
    page = 1;//分页标识归零
    this.setData({
      articles: [] //文章列表数组清空
    });
  },
  /**************** 网络请求 *****************/
  /**
   * 获取文章列表
   * @param {int} pg  分页标识 默认0
   */
  getArticles: function (pg) {
    var that = this

    //设置默认值
    pg = pg ? pg : 1;
    var that = this;
    var apiUrl = 'https://179l13s642.51mypc.cn/volunteer/getMessageList';//文章列表接口地址
    var postData = {
      pagesize: 10,//分页标识
      pagenum: pg
    }
    wx.request({
      url: apiUrl,
      data: postData,
      method: 'POST',

      success: function (res) {
        res.data.results.forEach(item => {
          var x = item.uploadTime.split('-')
          item.uploadTime = x[0] + '年' + x[1] + '月'
        })

        if (res.statusCode == 200) {//成功
       
          if (that.data.articles.length == res.data.total) {
            Dialog.alert({
              title: '温馨提示',
              message: '没有更多了...',
            }).then(() => { });
          } else {
            var tmpArr = that.data.articles;
            // 这一步实现了上拉加载更多
            tmpArr.push.apply(tmpArr, res.data.results);
            that.setData({
              articles: tmpArr
            })
            page++;

          }





        }
      },
      fail: function (e) {
        console.log(e);
      }
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
    this.clearCache();//清本页缓存
    this.getArticles(0);//第一次加载数据
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})