// pages/report/report.js
import { ReportCollection } from "../../constant/test_report"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    score: {},
    result: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let detail = JSON.parse(options.detail)
    this.setData({
      type: options.result,
      score: detail,
      result: ReportCollection[options.result]
    })
  },
})