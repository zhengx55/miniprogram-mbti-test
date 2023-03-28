// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
const testResultCollection = db.collection('mbti-result')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const res = await testResultCollection.limit(5).where({
    _openid: wxContext.OPENID
  }).orderBy('createTime', 'desc').get()
  return res.data
}