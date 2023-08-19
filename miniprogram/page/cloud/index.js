Page({
  onShareAppMessage() {
    return {
      title: '病禽拍拍小程序（测试版）',
      path: 'page/cloud/index'
    }
  },

  data: {
    list: [
      {
        id: 'user',
        name: '用户登录系统',
        open: false,
        pages: [
          {
            zh: '微信授权登录',
            url: 'login/login'
          }
        ]
      }
    ],
    theme: 'light'
  },
  onLoad() {
    this.setData({
      theme: wx.getSystemInfoSync().theme || 'light'
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({theme}) => {
        this.setData({theme})
      })
    }
  },
  kindToggle(e) {
    const id = e.currentTarget.id
    const list = this.data.list
    console.log(id, list)
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        if (list[i].url) {
          console.log(list[i].url)
          wx.navigateTo({
            url: `../../packageCloud/pages/${list[i].url}`
          })
          return
        }
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list
    })
  },
})
