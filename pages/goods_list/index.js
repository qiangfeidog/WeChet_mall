import { GQBrequest } from '../../request/index'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabConfig: [
      {
        id: 0,
        value: '综合',
        isShow: true,
      },
      {
        id: 1,
        value: '销量',
        isShow: false,
      },
      {
        id: 2,
        value: '价格',
        isShow: false,
      },
    ],
    goods: [],
    nowPage: 0,
  },
  // 接口要的参数
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10,
  },
  //总页数
  totalPages: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid || ''
    this.QueryParams.query = options.query || ''
    this.getGoodsData()
  },
  tabItemClick(data) {
    const { index } = data.detail
    let { tabConfig } = this.data
    tabConfig.forEach((v, i) => {
      if (i === index) {
        v.isShow = true
      } else {
        v.isShow = false
      }
    })
    // 赋值
    this.setData({
      tabConfig,
    })
  },
  getGoodsData() {
    GQBrequest({
      url: '/goods/search',
      data: this.QueryParams,
    }).then((res) => {
      this.setData({
        goods: [...this.data.goods, ...res.data.message.goods],
      })
      this.data.nowPage = res.data.message.pagenum
      const total = res.data.message.total
      //总页数
      const pages = Math.ceil(total / this.QueryParams.pagesize)
      this.totalPages = pages
    })
  },
  //页面触底事件，加载数据下一页
  onReachBottom() {
    if (this.data.nowPage > this.totalPages) {
      wx.wx.showToast({
        title: '已经没有下一页了',
      })
    } else {
      this.QueryParams.pagenum++
      this.getGoodsData()
    }
  },
  //下拉刷新
  onPullDownRefresh() {
    //重置商品列表
    this.setData({
      goods: [],
    })
    //重置列表
    this.QueryParams.pagenum = 1
    this.getGoodsData()
    //关闭等待效果
    wx.stopPullDownRefresh()
  },
})
