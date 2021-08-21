export const GQBrequest = (params) => {
  let ajax = 0
  ajax++
  wx.showLoading({
    title: '加载中',
    mask: true,
  })
  const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        ajax--
        if (!ajax) {
          wx.hideLoading()
        }
      },
    })
  })
}
