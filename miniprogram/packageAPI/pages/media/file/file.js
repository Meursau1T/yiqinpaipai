Page({
  onShareAppMessage() {
    return {
      title: '文件',
      path: 'packageAPI/pages/media/file/file'
    }
  },

  data: {
    theme: 'light',
    tempFilePath: '',
    savedFilePath: '',
    imagePath: '',
    touchStartX: 0,
    touchEndX: 0,
    deleteOverlayIndex: -1
  },

  startTouch(e) {
    this.setData({
      touchStartX: e.touches[0].clientX
    });
  },

  moveTouch(e) {
    const touchEndX = e.touches[0].clientX;
    const { touchStartX } = this.data;
    const diffX = touchEndX - touchStartX;

    // 设置阈值，滑动超过一定距离才显示删除按钮
    if (diffX <= -40) {
      const index = e.currentTarget.dataset.index;
      this.setData({
        deleteOverlayIndex: index
      });
    }
  },




  onLoad(options) {
    this.setData({
      theme: wx.getSystemInfoSync().theme || 'light'
    });

    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme });
      });
    }

    // 获取从 image.wxml 传递的图片路径参数
    if (options.imagePaths) {
      const imagePaths = JSON.parse(options.imagePaths);
      this.setData({
        imagePaths: imagePaths
      });
    }

    // 从本地存储中获取已保存的文件路径
    const savedFilePath = wx.getStorageSync('imagePaths');
    if (savedFilePath) {
      this.setData({
        savedFilePath: savedFilePath
      });
    }
  },

  chooseImage() {
    const that = this;
    wx.chooseImage({
      count: 1,
      success(res) {
        that.setData({
          tempFilePath: res.tempFilePaths[0]
        });
      }
    });
  },

  saveFile() {
    if (this.data.tempFilePath.length > 0) {
      const that = this;
      wx.saveFile({
        tempFilePath: this.data.tempFilePath,
        success(res) {
          that.setData({
            savedFilePath: res.savedFilePath
          });

          // 将已保存的文件路径存储到本地
          wx.setStorageSync('savedFilePath', res.savedFilePath);

          wx.showModal({
            title: '保存成功',
            content: '下次进入应用时，此文件仍可用'
          });
        },
        fail() {
          wx.showModal({
            title: '保存失败',
            content: '应该是有 bug 吧'
          });
        }
      });
    }
  },

  clear() {
    // 清除已保存的文件路径
    wx.removeStorageSync('savedFilePath');

    this.setData({
      tempFilePath: '',
      savedFilePath: ''
    });
  }
});