import regeneratorRuntime from '../../lib/runtime/runtime'
import { GQBrequest } from '../../request/index'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
  },
  GoodsInfo: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options
    this.getGoodsDetails(goods_id)
  },
  async getGoodsDetails(goods_id) {
    const res = await GQBrequest({ url: `/goods/detail?goods_id=${goods_id}` })
    this.GoodsInfo = res.data.message.pics
    const goodsObj = res.data.message
    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsObj.pics,
        goods_id: goodsObj.goods_id,
        goods_small_logo: goodsObj.goods_small_logo,
      },
    })
  },
  swiperItemClick(e) {
    const urls = this.GoodsInfo.map((v) => v.pics_mid)
    const { index } = e.currentTarget.dataset
    wx.previewImage({
      current: urls[index],
      urls: urls,
    })
  },
  addCart() {
    //获取本地缓存的沟渠和，判断本地已经添加这个商品没，
    const cart = wx.getStorageSync('cart') || []
    //判断商品在里面没
    const index = cart.findIndex(
      (v) => v.goods_id === this.data.goodsObj.goods_id
    )
    if (index === -1) {
      //不存在
      this.data.goodsObj.num = 1
      this.data.goodsObj.checked = true

      cart.push(this.data.goodsObj)
    } else {
      //存在
      cart[index].num++
    }
    //将数据重新添加到缓存中
    wx.setStorageSync('cart', cart)
    wx.showToast({
      title: '添加成功喽~',
      icon: 'success',
      duration: 1500,
      mask: true,
    })
  },
})
