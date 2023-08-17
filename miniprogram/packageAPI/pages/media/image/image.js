const sourceType = [['camera'], ['album'], ['camera', 'album']];
const sizeType = [['compressed'], ['original'], ['compressed', 'original']];

Page({
  onShareAppMessage() {
    return {
      title: '图片',
      path: 'packageAPI/pages/media/image/image'
    };
  },

  data: {
    theme: 'light',
    imageList: [],
    sourceTypeIndex: 2,
    sourceType: ['拍照', '相册', '拍照或相册'],

    sizeTypeIndex: 2,
    showGuild: true,
    sizeType: ['压缩', '原图', '压缩或原图'],

    countIndex: 8,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },

  sourceTypeChange(e) {
    this.setData({
      sourceTypeIndex: e.detail.value
    });
  },

  sizeTypeChange(e) {
    this.setData({
      sizeTypeIndex: e.detail.value
    });
  },

  countChange(e) {
    this.setData({
      countIndex: e.detail.value
    });
  },

  chooseImage() {
    const that = this;
    wx.chooseImage({
      sourceType: sourceType[this.data.sourceTypeIndex],
      sizeType: sizeType[this.data.sizeTypeIndex],
      count: this.data.count[this.data.countIndex],
      success(res) {
        that.setData({
          imageList: res.tempFilePaths
        });
      }
    });
  },

  previewImage(e) {
    const current = e.target.dataset.src;

    wx.previewImage({
      current,
      urls: this.data.imageList
    });
  },

  onLoad() {
    this.setData({
      theme: wx.getSystemInfoSync().theme || 'light'
    });

    if (wx.onThemeChange) {
      wx.onThemeChange(({ theme }) => {
        this.setData({ theme });
      });
    }
  },

  confirmUpload() {
    // 这里可以执行上传操作
    // 获取第一张图片的路径作为上传的路径
    const uploadedImagePaths = this.data.imageList;
    const numberOfUploadedImages = uploadedImagePaths.length; // 获取上传的图片数量

    // 跳转到文件预览页面，并传递上传的图片路径
    wx.navigateTo({
      url: `../file/file?imagePaths=${JSON.stringify(uploadedImagePaths)}`
    });

    // // 在成功返回上一页后显示上传成功的反馈信息
    // wx.navigateBack({
    //   delta: 1,
    //   success: function () {
    //     wx.showToast({
    //       title: '上传成功',
    //       icon: 'success',
    //       duration: 2000
    //     });
    //   }
    // });
  }
});
