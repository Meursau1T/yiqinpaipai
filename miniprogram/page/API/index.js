Page({
  onShareAppMessage() {
    return {
      title: "病禽拍拍小程序（测试版）",
      path: "page/API/index",
    };
  },

  data: {
    list: [
      {
        id: "media",
        name: "病禽拍拍",
        open: true,
        pages: [
          {
            zh: "病禽标注系统",
            url: "labelSystem/labelSystem",
          },
          {
            zh: "历史记录",
            url: "file/file",
          },
        ],
      },
    ],
    isSetTabBarPage: false,
    theme: "light",
  },
  onLoad() {
    this.setData({
      theme: wx.getSystemInfoSync().theme || "light",
    });

    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({
          theme,
        });
      });
    }
  },
  onShow() {
    this.leaveSetTabBarPage();
  },
  onHide() {
    this.leaveSetTabBarPage();
  },
  kindToggle(e) {
    const id = e.currentTarget.id;
    const list = this.data.list;
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        if (list[i].url) {
          wx.navigateTo({
            url: `../../packageAPI/pages/${list[i].id}/${list[i].url}`,
          });
          return;
        }
        list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
    }
    this.setData({
      list,
    });
  },
  enterSetTabBarPage() {
    this.setData({
      isSetTabBarPage: true,
    });
  },
  leaveSetTabBarPage() {
    this.setData({
      isSetTabBarPage: false,
    });
  },
});
