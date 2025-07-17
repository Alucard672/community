// 区域选择页面
Page({
  data: {
    regions: [], // 区域列表
    selectedRegion: null, // 选中的区域
    loading: false
  },

  onLoad() {
    this.loadRegions()
  },

  // 加载区域列表
  async loadRegions() {
    this.setData({ loading: true })
    
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'regions',
        data: {
          action: 'getRegions',
          data: {
            page: 1,
            pageSize: 100
          }
        }
      })
      
      if (result.success) {
        this.setData({
          regions: result.data.list
        })
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

  // 选择区域
  selectRegion(e) {
    const { region } = e.currentTarget.dataset
    this.setData({ selectedRegion: region })
  },

  // 确认选择
  confirmSelection() {
    if (this.data.selectedRegion) {
      // 返回上一页并传递选中的区域
      const pages = getCurrentPages()
      const prevPage = pages[pages.length - 2]
      
      if (prevPage) {
        prevPage.setData({
          currentRegion: this.data.selectedRegion
        })
      }
      
      wx.navigateBack()
    } else {
      wx.showToast({
        title: '请选择区域',
        icon: 'none'
      })
    }
  },

  // 取消选择
  cancelSelection() {
    wx.navigateBack()
  }
}) 