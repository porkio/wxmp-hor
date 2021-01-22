// components/user/editForm.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    display: {
      type: String,
      value: 'none'
    },
    focus: {
      type: Boolean,
      value: false
    },
    type: {
      type: String,
      value: 'input'
    },
    name: {
      type: String,
      value: ''
    },
    value: {
      type: String,
      value: ''
    },
    label: {
      type: String,
      value: ''
    },
    placeholder: {
      type: String,
      value: ''
    },
    url: {
      type: String,
      value: ''
    },
    method: {
      type: String,
      value: 'POST'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    layer: {
      top: '100vh'
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    show() {
      const _this = this
      _this.setData({
        display: 'block'
      })
      setTimeout(() => {
        _this.setData({
          layer: { top: 0 },
        })
      }, 50)
      setTimeout(() => {
        _this.setData({
          focus: true
        })
      }, 260)
    },

    hidden() {
      const _this = this
      _this.setData({
        layer: { top: '100vh' }
      })
      setTimeout(() => {
        _this.setData({
          display: 'none'
        })
      }, 300)
    },

    // 日期选择器
    bindDateChange(e) {
      const _this = this
      _this.setData({
        value: e.detail.value
      })
    },

    // 省市区选择器
    bindRegionChange(e) {
      const _this = this
      console.log(e.detail.value)
      _this.setData({
        value: e.detail.value
      })
    },

    // input 数据监听
    bindInputChange(e) {
      const _this = this
      _this.setData({
        value: e.detail.value
      })
    },

    // 数据传递
    handleFormData(e) {
      const _this = this
      _this.triggerEvent('dataChange', {
        prop: _this.data.name,
        value: _this.data.value
      })
    },

    // 提交数据
    submitData() {
      const _this = this
      console.log(_this.data.name, ' - ', _this.data.value)
      app._post({
        url: 'users/update',
        data: {
          prop: _this.data.name,
          value: _this.data.value
        },
        success(res) {
          if (res.errno === 0) {
            _this.hidden()
            _this.handleFormData()
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          }
        }
      })
    }
  }
})
