// app.js
import { fontUrl } from "./envList"
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        traceUser: true,
      });
      wx.loadFontFace({
        global: true,
        family: 'MFLI',
        source: `url(${fontUrl})`,
      })

    }
  },
  //最佳方案。
  getOpenid: async function () {
    const res = await wx.cloud.callFunction({ name: 'login' })
    return res.result.openid
  },
});
