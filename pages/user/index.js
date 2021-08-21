// pages/user/user.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    //收藏数量
    collectNumber: 0,
  },
  onShow: function () {
    const userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo,
    })
  },
})
