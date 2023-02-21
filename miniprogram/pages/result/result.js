Page({
  handleSubscribe() {
    wx.requestSubscribeMessage({
      tmplIds: ['rOmkDAw10uSHuJw5BBGJ4w2dLOfWfD_6ViUcqybpdFg'],
    }).then((res) => {
      wx.navigateTo({
        url: '/pages/home/home',
      })
    })
  }

})