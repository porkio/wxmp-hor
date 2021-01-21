// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false
  },
  
  onShow() {
    const _this = this
    
  },
  onLoad() {
    const _this = this
    app._get({
      url: 'users/articlesList',
      data: {user_id: 3},
      success(res) {
        console.log(res)
      },
      fail(res) {},
      complete(res) {},
      check_login: false,
      isShowNavBarLoading: false
    })

  }
  
})
