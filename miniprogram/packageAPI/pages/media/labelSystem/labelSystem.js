Page({
  onShareAppMessage() {
    return {
      title: "病禽拍拍",
      path: "packageAPI/pages/media/labelSystem/labelSystem",
    };
  },

  data: {
    theme: "light",
    mediaList: [],
    maxMediaNumber: 9,
    tagList: [
      {
        name: "发热",
        selected: false,
      },
      {
        name: "跛脚",
        selected: false,
      },
      {
        name: "癫痫",
        selected: false,
      },
      {
        name: "食欲不振",
        selected: false,
      },
      {
        name: "排泄异常",
        selected: false,
      },
      {
        name: "口水异常",
        selected: false,
      },
    ],
    inputText: "",
  },

  chooseMedia() {
    const that = this;
    wx.chooseMedia({
      mediaType: ["image", "video", "mix"],
      maxDuration: 60,
      count: this.data.maxMediaNumber - this.data.mediaList.length,
      success(res) {
        if (that.data.mediaList.length + res.tempFiles.length > 9) {
          wx.showToast({
            title: "最多只能上传九张",
          });
        } else {
          that.setData({
            mediaList: [...that.data.mediaList, ...res.tempFiles],
          });
        }
      },
    });
  },

  previewMedia(e) {
    const current = e.currentTarget.dataset.index;

    wx.previewMedia({
      current,
      sources: this.data.mediaList.map((item) => ({ url: item.tempFilePath })),
    });
  },

  onLoad() {
    this.setData({
      theme: wx.getSystemInfoSync().theme || "light",
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
    const uploadedImagePaths = this.data.mediaList;
    const numberOfUploadedImages = uploadedImagePaths.length; // 获取上传的图片数量

    // 跳转到文件预览页面，并传递上传的图片路径
    wx.navigateTo({
      url: `../file/file?imagePaths=${JSON.stringify(uploadedImagePaths)}`,
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
  },

  changeText(e) {
    this.setData({
      inputText: e.detail.value,
    });
  },

  /** 计算添加或删除标签字符串后的字符串 */
  getInputContent(isAdd, str) {
    const currText = this.data.inputText;
    if (isAdd) {
      // 添加前先确定当前字符串末尾是否有空格，如果没有，再添加一个
      const preSpace = currText[currText.length - 1] !== ' ' && currText !== '';
      return currText + `${preSpace ? ' ' : ''}${str} `;
    } else {
      // 删除时，如果后面跟的有空格，一起删掉，避免反复添加删除后空格残留
      return currText.replace(new RegExp(`${str}\\s?`, 'g'), "");
    }
  },

  selectTag(event) {
    const selectedTag = event.currentTarget.dataset.tag;
    const index = this.data.tagList.findIndex(
      (item) => item.name === selectedTag.name
    );
    if (index >= 0) {
      this.data.tagList[index].selected = !this.data.tagList[index].selected;

      this.setData({
        tagList: this.data.tagList,
        inputText: this.getInputContent(
          !selectedTag.selected,
          selectedTag.name
        ),
      });
    }
  },

  clearInput() {
    const listLen = this.data.tagList.length;
    for (let i = 0; i < listLen; i++) {
      this.data.tagList[i].selected = false;
    }
    this.setData({
      tagList: this.data.tagList,
      inputText: "",
    });
  },
});
