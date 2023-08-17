Page({
  onShareAppMessage() {
    return {
      title: '病情手动标注系统',
      path: 'packageAPI/pages/api/get-user-info/get-user-info'
    }
  },

  data: {
    hasUserInfo: false,
    inputText: "",
    tagList: ["发热", "跛脚", "癫痫", "食欲不振", "排泄异常", "口水异常"]
  },
  
  handleGetUserProfile() {
    this.setData({
      inputText: "",
      hasUserInfo: false
    });

    wx.showToast({
      title: "提交成功",
      icon: "success",
      duration: 2000
    });
  },
  
  clear() {
    this.setData({
      inputText: "",
      hasUserInfo: false
    });
  },
  
  handleTextChange(event) {
    this.setData({
      inputText: event.detail.value
    });
  },
  
  selectTag(event) {
    const selectedTag = event.currentTarget.dataset.tag;
    const currentValue = this.data.inputText;
    const updatedValue = currentValue ? currentValue + " " + selectedTag : selectedTag;
    this.setData({
      inputText: updatedValue
    });
  }
})
