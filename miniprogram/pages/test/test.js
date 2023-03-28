// pages/test/test.js
const db = wx.cloud.database()

import {
  Questions
} from "../../constant/questions"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    questions: [],
    currentQuestion: 1,
    userSelected: [],
    progressLength: '0%'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.setData({
      questions: Questions
    }, async () => {
      this.openId = await getApp().getOpenid()
      let storage_answers = wx.getStorageSync(this.openId)
      if (storage_answers) {
        this.setData({
          userSelected: storage_answers,
          progressLength: `${storage_answers.length / this.data.questions.length * 100}%`,
        })
      }
    })
  },

  onNextHandler() {
    if (this.data.currentQuestion < this.data.questions.length) {
      if (this.data.currentQuestion <= this.data.userSelected.length) {
        this.setData({
          currentQuestion: this.data.currentQuestion + 1
        })
      } else {
        wx.showToast({
          title: '请做完本题',
          icon: 'error',
        })
      }
    } else {
      wx.showToast({
        title: '已经是最后一题了',
        icon: 'error',
      })
    }

  },

  onPrevHandler() {
    if (this.data.currentQuestion - 1 > 0) {
      this.setData({
        currentQuestion: this.data.currentQuestion - 1
      })
    } else {
      wx.showToast({
        title: '前面已经没有了',
        icon: 'error',
      })
    }

  },
  onSaveHandler: async function () {
    if (this.data.userSelected.length === 0) {
      wx.showToast({
        title: '你还没有做题',
        icon: 'error',
      })
      return
    }
    try {
      wx.setStorageSync(this.openId, this.data.userSelected)
      wx.showToast({
        title: '保存成功',
      })
    } catch (error) {
      wx.showToast({
        title: '保存失败',
        icon: "error"
      })
    }

  },

  onSubmitHandler() {
    if (this.data.userSelected.length < this.data.questions.length) {
      wx.showToast({
        title: '题目未答完😩',
        icon: "error"
      })
      return
    }
    const { result, sum } = this.getTestResult()
    wx.showLoading({
      title: 'Loading...',
      mask: true
    })
    db.collection('mbti-result').add({
      data: {
        result: result,
        detail: sum,
        createTime: db.serverDate()
      }
    }).then((res) => {
      wx.hideLoading()
      wx.clearStorageSync(this.openId)
      wx.navigateTo({
        url: '/pages/result/result',
      })
    }).catch((error) => {
      wx.hideLoading()
      wx.showToast({
        title: '提交失败',
        icon: 'error'
      })
    })

  },

  onSelectHandler(event) {
    let id = event.target.dataset.id
    let answer = event.target.dataset.options
    const find = this.data.userSelected.findIndex((item) => {
      return item.id === id
    })
    if (find !== -1) {
      this.setData({
        [`userSelected[${find}]`]: {
          id,
          answer
        }
      })
    } else {
      this.setData({
        userSelected: [...this.data.userSelected, {
          id,
          answer
        }]
      }, () => {
        this.setData({
          progressLength: `${this.data.userSelected.length / this.data.questions.length * 100}%`
        })
      })
    }
    if (this.data.userSelected.length === this.data.questions.length) {
      return
    }
    this.onNextHandler()
  },

  getTestResult() {
    let sum = {
      "E": 0,
      "I": 0,
      "S": 0,
      "N": 0,
      'T': 0,
      "F": 0,
      "J": 0,
      "P": 0
    }
    this.data.userSelected.map((item) => {
      if (item.id % 4 === 1) {
        item.answer === "A" ? sum.E++ : sum.I++
      } else if (item.id % 4 === 2) {
        item.answer === "A" ? sum.S++ : sum.N++
      } else if (item.id % 4 === 3) {
        item.answer === "A" ? sum.T++ : sum.F++
      } else if (item.id % 4 === 0) {
        item.answer === "A" ? sum.J++ : sum.P++
      }
    })
    let result = ""
    sum.E <= sum.I ? result += "I" : result += "E"
    sum.N <= sum.S ? result += "N" : result += "S"
    sum.F <= sum.T ? result += "F" : result += "T"
    sum.P <= sum.J ? result += "P" : result += "J"
    return { result, sum }
  }

})