// pages/login/login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
  },
  //登陆
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        const userInfo = res.userInfo
        this.setData({
          userInfo,
        })
        wx.setStorageSync('userInfo', userInfo)
        wx.switchTab({
          url: '/pages/user/index',
        })
      },
    })
    // wx.navigateBack({
    //   delta: 1,
    // })
  },
})
