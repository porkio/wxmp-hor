// pages/user/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    capsule: {}, // 胶囊位置、尺寸等信息
    userInfo: {
      nickName: '点击登录'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this
    // 计算胶囊尺寸和位置
    const capsule = wx.getMenuButtonBoundingClientRect()
    _this.setData({ capsule })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const _this = this
    _this.getUserDetail()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 链接跳转
  navigation(e) {
    const { url } = e.currentTarget.dataset
    app.navigationTo(url)
  },

  doLogin(e) {
    const _this = this
    const user_id = e.currentTarget.dataset.id

    if (!user_id) {
      app.doLogin()
    }
  },

  getUserDetail() {
    const _this = this

    if (!app.isLogin()) return false
    app._get({
      url: 'users/detail',
      data: {},
      success(res) {
        _this.setData(res.data)
      },
      check_login: false
    })
  }
})