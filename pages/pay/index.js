import regeneratorRuntime from '../../lib/runtime/runtime'
import { GQBrequest } from '../../request/index'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNumber: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取到本地的地址缓存
  },
  onShow: function () {
    const address = wx.getStorageSync('address')

    this.setData({
      address,
    })
    let cart = wx.getStorageSync('cart') || []
    cart = cart.filter((v) => v.checked)
    //计算价格
    let totalNumber = 0
    let totalPrice = 0
    cart.forEach((v) => {
      totalPrice += v.goods_price * v.num
      totalNumber += v.num
    })
    this.setData({
      cart,
      totalNumber,
      totalPrice,
    })
  },

  //结算
  handlePay(e) {
    // 获取用户信息
    const token = wx.getStorageSync('token') || false
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index',
      })
    } else {
      // console.log('拿到token喽')
      // 请求头
      const header = { Authorization: token }
      // 请求体
      const order_price = this.data.totalPrice
      const consignee_addr = this.data.address
      const cart = this.data.cart
      let goods = []
      cart.forEach((v) => {
        goods.push({
          goods_id: v.goods_id,
          goods_number: v.num,
          goods_price: v.goods_price,
        })
      })
      const orderParams = { order_price, consignee_addr, goods }
      wx.request({
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/my/orders/create',
        data: orderParams,
        method: 'POST',
        header: header,
        success(res) {
          console.log(res.data)
        },
      })
    }
  },
})
