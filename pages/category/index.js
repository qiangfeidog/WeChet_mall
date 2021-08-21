import regeneratorRuntime from '../../lib/runtime/runtime'
import { GQBrequest } from '../../request/index'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    leftMenus: [],
    rightContent: [],
    currentIndex: 0,
    scrollTop: 0,
  },
  categories: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //先看下本地缓存里面有没有数据，有的话就是用本地缓存的数据
    const Cates = wx.getStorageSync('cates')
    if (!Cates) {
      this.getCategoryData()
    } else {
      //判断是否过期
      if (Date.now() - Cates.time > 1000 * 10) {
        this.getCategoryData()
      } else {
        //用旧数据
        this.categories = Cates.data
        this.setData({
          leftMenus: this.categories.map((item) => {
            return item.cat_name
          }),
          rightContent: this.categories[0].children,
        })
      }
    }
  },
  async getCategoryData() {
    // GQBrequest({
    //   url: '/categories',
    // }).then((res) => {
    //   this.categories = res.data.message
    //   //讲数据放入到本地缓存中
    //   wx.setStorageSync('cates', { time: Date.now(), data: this.categories })
    //   //构造左侧的菜单数据
    //   this.setData({
    //     leftMenus: this.categories.map((item) => {
    //       return item.cat_name
    //     }),
    //     rightContent: this.categories[0].children,
    //   })
    // })
    const res = await GQBrequest({
      url: '/categories',
    })
    this.categories = res.data.message
    //讲数据放入到本地缓存中
    wx.setStorageSync('cates', { time: Date.now(), data: this.categories })
    //构造左侧的菜单数据
    this.setData({
      leftMenus: this.categories.map((item) => {
        return item.cat_name
      }),
      rightContent: this.categories[0].children,
    })
  },
  menuItemClick(e) {
    const { index } = e.currentTarget.dataset
    this.setData({
      currentIndex: index,
      rightContent: this.categories[index].children,
      scrollTop: 0,
    })
  },
})
