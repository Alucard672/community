// 区域选择组件
Component({
  properties: {
    // 当前选中的区域
    value: {
      type: Object,
      value: null
    },
    // 是否显示选择器
    show: {
      type: Boolean,
      value: false
    }
  },

  data: {
    regions: [], // 区域列表
    selectedRegion: null, // 选中的区域
    loading: false
  },

  lifetimes: {
    attached() {
      this.loadRegions()
    }
  },

  methods: {
    // 加载区域列表
    async loadRegions() {
      this.setData({ loading: true })
      
      try {
        const result = await wx.cloud.callFunction({
          name: 'regions',
          data: {
            action: 'getRegions',
            data: {
              page: 1,
              pageSize: 100
            }
          }
        })
        
        if (result.result.success) {
          this.setData({
            regions: result.result.data.list
          })
          
          // 如果没有选中区域，设置默认区域
          if (!this.data.value) {
            this.setDefaultRegion()
          }
        } else {
          wx.showToast({
            title: '加载区域失败',
            icon: 'none'
          })
        }
      } catch (error) {
        console.error('加载区域列表错误:', error)
        wx.showToast({
          title: '加载区域失败',
          icon: 'none'
        })
      } finally {
        this.setData({ loading: false })
      }
    },

    // 设置默认区域
    async setDefaultRegion() {
      try {
        const result = await wx.cloud.callFunction({
          name: 'regions',
          data: {
            action: 'getDefaultRegion'
          }
        })
        
        if (result.result.success) {
          const defaultRegion = result.result.data
          this.setData({ selectedRegion: defaultRegion })
          this.triggerEvent('change', defaultRegion)
        }
      } catch (error) {
        console.error('获取默认区域错误:', error)
      }
    },

    // 显示区域选择器
    showRegionPicker() {
      this.setData({ show: true })
    },

    // 隐藏区域选择器
    hideRegionPicker() {
      this.setData({ show: false })
    },

    // 选择区域
    selectRegion(e) {
      const { region } = e.currentTarget.dataset
      this.setData({ 
        selectedRegion: region,
        show: false
      })
      this.triggerEvent('change', region)
    },

    // 确认选择
    confirmSelection() {
      if (this.data.selectedRegion) {
        this.triggerEvent('confirm', this.data.selectedRegion)
        this.hideRegionPicker()
      } else {
        wx.showToast({
          title: '请选择区域',
          icon: 'none'
        })
      }
    },

    // 取消选择
    cancelSelection() {
      this.hideRegionPicker()
      this.triggerEvent('cancel')
    }
  }
}) 