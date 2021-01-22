// pages/user/setting/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    formData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const _this = this
    //获取 editForm 组件
    _this.editForm = _this.selectComponent("#editForm")
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

  // 获取用户详细信息
  getUserDetail() {
    const _this = this

    if (!app.isLogin()) return false
    app._get({
      url: 'users/detail',
      data: {},
      success(res) {
        _this.setData({
          userInfo: res.data.userInfo
        })
      },
      check_login: false
    })
  },

  showForm(e) {
    const _this = this
    const { value, label, name, type } = e.currentTarget.dataset
    _this.setData({
        formData: { value, label, name, type }
    })
    _this.editForm.show()
  },

  getFormData(e) {
    const _this = this
    const userInfo = _this.data.userInfo

    const { prop, value } = e.detail

    userInfo[prop] = value
    
    _this.setData({ userInfo })
  }
})
