Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    "selectedColor": "#6b99dd",
    "list": [
      {
        "pagePath": "/pages/index/index",
        "text": "知识学习",
        "iconPath": "/style/taBar_img/xiangs.png",
        "selectedIconPath": "/style/taBar_img/xiang.png",

      },

      {
        "pagePath": "/pages/myPage/index",
        "iconPath": "/style/taBar_img/daka.png",
        "selectedIconPath": "/style/taBar_img/ds.png",
        "isSpecial":true,
        "text": "打卡分享",
      },
      {
        "pagePath": "/pages/myPage/index",
        "text": "积分排名",
        "iconPath": "/style/taBar_img/de.png",
        "selectedIconPath": "/style/taBar_img/ds.png",

      }
    ]
  },
  attached() {
  },
  methods: {
    tiao: function () {
      wx.navigateTo({
        url: '/pages/release/index' 

      })

    },
    switchTab(e) {

      const data = e.currentTarget.dataset
     

      this.setData({
        selected: data.index
      })
    }
  }
})