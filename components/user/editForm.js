// components/user/editForm.js
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
      value: 'Input Something...'
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
        setTimeout(() => {
          _this.setData({
            focus: true
          })
        }, 100)
      }, 200)
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
  }
})
