// pages/profile/profile.js
import { GenerOptions, CurOptions, ExpOptions, IndOptions } from "../../constant/profileOptions"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    genderOptions: [],
    experienceOptions: [],
    industryOptions: [],
    currentJobOptions: [],
    userSelected: {
      gender: '',
      experience: '',
      industry: '',
      current: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      genderOptions: GenerOptions,
      experienceOptions: ExpOptions,
      industryOptions: IndOptions,
      currentJobOptions: CurOptions
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  onNextPageHandle() {
    if (!this.data.userSelected.current || !this.data.userSelected.experience || !this.data.userSelected.gender || !this.data.userSelected.industry) {
      wx.showToast({
        title: '内容未选择',
        mask: true,
        icon: "error"
      })
      return
    }
    wx.navigateTo({
      url: '/pages/test/test',
    })
  },

  handleSelect(event) {
    const category = event.target.dataset.category
    const selected = event.target.dataset.item
    this.setData({
      userSelected: {
        ...this.data.userSelected,
        [category]: selected
      }
    })
  }
})