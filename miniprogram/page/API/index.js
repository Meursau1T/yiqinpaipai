Page({
  onShareAppMessage() {
    return {
      title: '病禽拍拍小程序（测试版）',
      path: 'page/API/index'
    }
  },

  data: {
    list: [{
      id: 'api',
      name: '通用设置',
      open: false,
      pages: [{
        zh: '微信登录',
        url: 'login/login'
      }, {
        zh: '病情手动标注系统',
        url: 'get-user-info/get-user-info'
      }, {
        zh: '生物认证',
        url: 'soter-authentication/soter-authentication'
      }, {
        zh: '设置与隐私',
        url: 'setting/setting'
      }]
    }, {
      id: 'media',
      name: '病禽拍拍',
      open: false,
      pages: [{
        zh: '病禽图片上传',
        url: 'image/image'
      },{
        zh: '病禽视频上传',
        url: 'video/video'
      },{
        zh: '病禽记录上传',
        url: 'imageNVideo/imageNVideo'
      },{
        zh: '历史记录',
        url: 'file/file'
      }]
    }],
    isSetTabBarPage: false,
    theme: 'light'
  },
  onLoad() {
    this.setData({
      theme: wx.getSystemInfoSync().theme || 'light'
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({
        theme
      }) => {
        this.setData({
          theme
        })
      })
    }
  },
  onShow() {
    this.leaveSetTabBarPage()
  },
  onHide() {
    this.leaveSetTabBarPage()
  },
  kindToggle(e) {
    const id = e.currentTarget.id;
    const
      list = this.data.list
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        if (list[i].url) {
          wx.navigateTo({
            url: `../../packageAPI/pages/${list[i].id}/${list[i].url}`
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
  enterSetTabBarPage() {
    this.setData({
      isSetTabBarPage: true
    })
  },
  leaveSetTabBarPage() {
    this.setData({
      isSetTabBarPage: false
    })
  },
})