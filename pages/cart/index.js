// pages/cart/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    checkAll: false,
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
    this.reComputed()
  },
  btnClick() {
    //获取收获地址
    wx.chooseAddress({
      success: (result) => {
        //存入到缓存中
        wx.setStorageSync('address', result)
      },
    })
  },
  checkChange(e) {
    const { id } = e.currentTarget.dataset
    const cart1 = this.data.cart
    //拿到数据中这个商品的下标
    const index = cart1.findIndex((v) => v.goods_id === id)
    cart1[index].checked = !cart1[index].checked
    //将数据重新写到本地缓存中

    wx.setStorageSync('cart', cart1)
    //重新计算
    this.reComputed()
  },
  reComputed() {
    const cart = wx.getStorageSync('cart') || []
    // const checkAll = cart.every((v) => v.checked) && cart.length
    let checkAll = true
    let totalNumber = 0
    let totalPrice = 0
    cart.forEach((v) => {
      if (v.checked) {
        totalPrice += v.goods_price * v.num
        totalNumber += v.num
      } else {
        checkAll = false
      }
    })
    checkAll = cart.length != 0 ? checkAll : false
    this.setData({
      cart,
      checkAll,
      totalNumber,
      totalPrice,
    })
  },
  checkAllCheck() {
    //全选按钮
    let { cart, checkAll } = this.data
    //修改值
    checkAll = !checkAll
    cart.forEach((v) => (v.checked = checkAll))
    wx.setStorageSync('cart', cart)

    this.reComputed()
  },
  buttonClick(e) {
    const { id, operation } = e.currentTarget.dataset
    let { cart } = this.data
    const index = cart.findIndex((v) => v.goods_id === id)
    if (cart[index].num == 0) {
      cart.splice(index, 1)
      wx.setStorageSync('cart', cart)
      this.reComputed()
      return
    }
    if (cart[index].num == 1 && operation == -1) {
      const that = this
      wx.showModal({
        title: '提示',
        content: '是否要删除',
        success(res) {
          if (res.confirm) {
            cart.splice(index, 1)
            wx.setStorageSync('cart', cart)
            that.reComputed()
            return
          } else if (res.cancel) {
          }
        },
      })
    }
    cart[index].num += parseInt(operation)
    wx.setStorageSync('cart', cart)
    this.reComputed()
  },
  //结算
  handlePay() {
    //判断收货地址是否存在
    const { address, totalNumber } = this.data
    if (!address.userName) {
      wx.showToast({
        title: '您还没有选择收货地址',
        icon: 'none',
      })
      return
    }
    if (totalNumber == 0) {
      wx.showToast({
        title: '您还没有选择商品',
        icon: 'none',
      })
      return
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  },
})
