/**
 * tabBar页面路径列表 (用于链接跳转时判断)
 * tabBarLinks为常量, 无需修改
 */
const tabBarLinks = [
  'pages/index/index',
  'pages/square/index',
  'pages/user/index'
]
import siteInfo from './siteInfo'

// app.js
App({
  globalData: {
    userInfo: null
  },

  api_root: siteInfo.domain + '/api/',

  onLaunch() {

  },

  onShow() {
    const _this = this
    if (!_this.isLogin()) _this._checkSession() // 检查session有效性
  },

  /**
   * get请求
   */
  _get({url, data, success, fail, complete, check_login = true}) {
    wx.showNavigationBarLoading()
    const _this = this
    if (!data.user_id) {
      data.user_id = wx.getStorageSync('user_id')
    }
    // 构造get请求
    const request = () => {
      data.token = wx.getStorageSync('token')
      wx.request({
        url: _this.api_root + url,
        header: {
          'content-type': 'application/json'
        },
        data: data,
        success(res) {
          wx.hideNavigationBarLoading()
          if (res.statusCode !== 200 || typeof res.data !== 'object') {
            _this.showError('网络请求出错')
            return false
          }
          if (res.data.errno === -1) {
            // 登录态失效, 重新登录
            // _this.doLogin(2)
          } else if (res.data.errno !== 0) {
            _this.showError(res.data.message, () => {
              fail && fail(res.data)
            })
            return false
          } else {
            success && success(res.data)
          }
        },
        fail(res) {
          wx.hideNavigationBarLoading()
          _this.showError(res.errMsg, () => {
            fail && fail(res)
          })
        },
        complete(res) {
          wx.hideNavigationBarLoading()
          complete && complete(res)
        },
      })
    }
    // 判断是否需要验证登录
    if (check_login) {
      !_this.isLogin() && _this.doLogin()
    }
    request()
    
  },

  /**
   * post提交
   */
  _post({
    url,
    data,
    success,
    fail,
    complete,
    check_login = true,
    isShowNavBarLoading
  }) {
    const _this = this
    
    isShowNavBarLoading || true
    if (!data.user_id) {
      data.user_id = wx.getStorageSync('user_id')
    }
    data.token = wx.getStorageSync('token')

    // 在当前页面显示导航条加载动画
    if (isShowNavBarLoading == true) {
      wx.showNavigationBarLoading()
    }
    // 是否验证登录
    if (check_login) {
      !_this.isLogin() && _this.doLogin()
    }

    wx.request({
      url: _this.api_root + url,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      data: data,
      success(res) {
        if (res.statusCode !== 200 || typeof res.data !== 'object') {
          _this.showError('网络请求出错')
          return false
        }
        if (res.data.errno === -1) {
          // 登录态失效, 重新登录
          wx.hideNavigationBarLoading()
          return false
        } else if (res.data.errno !== 0) {
          _this.showError(res.data.message, () => {
            fail && fail(res)
          })
          return false
        }
        success && success(res.data)
      },
      fail(res) {
        // console.log(res);
        _this.showError(res.errMsg, () => {
          fail && fail(res)
        })
      },
      complete(res) {
        wx.hideNavigationBarLoading()
        // wx.hideLoading();
        complete && complete(res)
      }
    })
  },

  /**
   * 授权登录
   */
  getUserInfo(e, callback) {
    const _this = this
    if (e.detail.errMsg !== 'getUserInfo:ok') {
      return false
    }
    wx.showLoading({
      title: "正在登录",
      mask: true
    })
    // 执行微信登录
    wx.login({
      success(res) {
        // 发送用户信息
        const data = {
          code: res.code,
          user_info: e.detail.rawData,
          encrypted_data: e.detail.encryptedData,
          iv: e.detail.iv,
          signature: e.detail.signature,
        }

        _this._post({
          url: 'users/login',
          data,
          success(res) {
            // 记录token user_id
            if (res.data.token) {
              wx.setStorageSync('token', res.data.token)
              wx.setStorageSync('user_id', res.data.user_id)
              wx.showToast({
                title: '登录成功',
                icon: 'success'
              })
              // 执行回调函数
              callback && callback()
            } else {
              wx.showToast({
                title: '登陆失败了',
                icon: 'none'
              })
            }
          },
          fail(res) {
            // 登陆失败
            wx.showToast({
              title: '登陆失败了',
              icon: 'none'
            })
          },
          complete() {
            wx.hideLoading()
          },
          check_login: false,
          isShowNavBarLoading: true
        })
      }
    })
  },

  /**
   * 执行用户登录
   */
  doLogin(delta) {
    // 保存当前页面
    let pages = getCurrentPages()
    if (pages.length) {
      let currentPage = pages[pages.length - 1]
      "pages/login/login" != currentPage.route &&
        wx.setStorageSync("currentPage", currentPage)
    }
    // 跳转授权页面
    wx.navigateTo({
      url: "/pages/login/login?delta=" + (delta || 1)
    })
  },

  // 检查微信服务器最近一次发放的session_key是否失效
  _checkSession() {
    const _this = this
    wx.checkSession({
      success: (res) => {
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail: (res) => {
        // session_key 已经失效，需要重新执行登录流程
        console.log('session_key失效了', res)
        _this.doLogin() //重新登录
      },
      complete: (res) => {},
    })
  },

  // 检查是否登录
  isLogin() {
    const _this = this
    return wx.getStorageSync('token') != '' && wx.getStorageSync('user_id') != ''
  },

  /**
   * 显示成功提示框
   */
  showSuccess(msg, callback) {
    wx.showToast({
      title: msg,
      icon: 'success',
      mask: true,
      duration: 1500,
      success() {
        callback && (setTimeout(() => {
          callback()
        }, 1500))
      }
    })
  },

  /**
   * 显示失败提示框
   */
  showError(msg, callback) {
    wx.showModal({
      title: '友情提示',
      content: msg,
      showCancel: false,
      success(res) {
        callback && callback()
      }
    })
  },

  /**
   * 跳转到指定页面
   * 支持tabBar页面
   */
  navigationTo(url) {
    const _this = this
    if (!url || url.length == 0) {
      return false
    }

    let tabBarLinks = _this._getTabBarLinks()
    // tabBar页面
    if (tabBarLinks.indexOf(url) > -1) {
      wx.switchTab({
        url: '/' + url
      })
    } else {
      // 普通页面
      wx.navigateTo({
        url: '/' + url
      })
    }
  },

  _getTabBarLinks() {
    return tabBarLinks
  },

  /**
   * 小程序主动更新
   */
  updateManager() {
    if (!wx.canIUse('getUpdateManager')) {
      return false
    }
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(res => {
      // 请求完新版本信息的回调
      // console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady(() => {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，即将重启应用',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(() => {
      // 新的版本下载失败
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false
      })
    })
  },

})