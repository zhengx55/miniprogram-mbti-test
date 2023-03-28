import formatDate from "../../utils/formatDate"

// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    results: [],
    show: false,
    maskAnimation: '',
    modalAnimation: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'getTestResult'
    }).then((res) => {
      if (res.result.length === 0) {
        this.setData({
          results: []
        })
      } else {
        let temp_list = res.result
        for (let i = 0; i < temp_list.length; i++) {
          temp_list[i].createTime = formatDate(new Date(temp_list[i].createTime))
        }
        this.setData({
          results: temp_list
        })
      }
      wx.hideLoading()
    })
  },
  onReadHandler(event) {
    const detail = JSON.stringify(event.target.dataset.detail)
    const result = event.target.dataset.result
    wx.navigateTo({
      url: `/pages/report/report?result=${result}&detail=${detail}`,
    })
  },
  toProfilePage() {
    wx.navigateTo({
      url: '/pages/profile/profile',
    })
  },
  showQRCodeHandler() {
    this.setData({
      show: true
    })
  },
  onCloseModal() {
    this.setData({
      show: false
    })
  }
})