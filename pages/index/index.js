import { GQBrequest } from '../../request/index.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    catesList: [],
    floorList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList()
    this.getCatesList()
    this.getFooterList()
  },
  getSwiperList() {
    GQBrequest({
      url: '/home/swiperdata',
    }).then((res) => {
      this.setData({
        swiperList: res.data.message,
      })
    })
  },
  getCatesList() {
    GQBrequest({
      url: '/home/catitems',
    }).then((res) => {
      this.setData({
        catesList: res.data.message,
      })
    })
  },
  getFooterList() {
    GQBrequest({
      url: '/home/floordata',
    }).then((res) => {
      this.setData({
        floorList: res.data.message,
      })
    })
  },
})
