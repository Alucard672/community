// 搜索和推荐功能
class SearchManager {
  // 搜索历史
  static SEARCH_HISTORY_KEY = 'search_history'
  static MAX_HISTORY_COUNT = 10

  // 搜索内容
  async searchContent(keyword, type = 'all', page = 1, pageSize = 20) {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'search',
        data: {
          action: 'search',
          keyword: keyword,
          type: type,
          page: page,
          pageSize: pageSize
        }
      })
      
      if (result.success) {
        // 保存搜索历史
        this.saveSearchHistory(keyword)
        return result.data
      } else {
        return []
      }
    } catch (error) {
      console.error('搜索失败:', error)
      return []
    }
  }

  // 保存搜索历史
  saveSearchHistory(keyword) {
    try {
      let history = wx.getStorageSync(SearchManager.SEARCH_HISTORY_KEY) || []
      
      // 移除重复项
      history = history.filter(item => item !== keyword)
      
      // 添加到开头
      history.unshift(keyword)
      
      // 限制数量
      if (history.length > SearchManager.MAX_HISTORY_COUNT) {
        history = history.slice(0, SearchManager.MAX_HISTORY_COUNT)
      }
      
      wx.setStorageSync(SearchManager.SEARCH_HISTORY_KEY, history)
    } catch (error) {
      console.error('保存搜索历史失败:', error)
    }
  }

  // 获取搜索历史
  getSearchHistory() {
    try {
      return wx.getStorageSync(SearchManager.SEARCH_HISTORY_KEY) || []
    } catch (error) {
      console.error('获取搜索历史失败:', error)
      return []
    }
  }

  // 清空搜索历史
  clearSearchHistory() {
    try {
      wx.removeStorageSync(SearchManager.SEARCH_HISTORY_KEY)
      wx.showToast({
        title: '已清空搜索历史',
        icon: 'success'
      })
    } catch (error) {
      console.error('清空搜索历史失败:', error)
    }
  }

  // 获取热门搜索
  async getHotSearch() {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'search',
        data: {
          action: 'getHotSearch'
        }
      })
      
      return result.data || []
    } catch (error) {
      console.error('获取热门搜索失败:', error)
      return []
    }
  }

  // 获取推荐内容
  async getRecommendations(userId = null, type = 'all', page = 1, pageSize = 20) {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'recommendation',
        data: {
          action: 'getRecommendations',
          userId: userId,
          type: type,
          page: page,
          pageSize: pageSize
        }
      })
      
      return result.data || []
    } catch (error) {
      console.error('获取推荐内容失败:', error)
      return []
    }
  }

  // 获取附近内容
  async getNearbyContent(latitude, longitude, radius = 5000, type = 'all', page = 1, pageSize = 20) {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'search',
        data: {
          action: 'getNearby',
          latitude: latitude,
          longitude: longitude,
          radius: radius,
          type: type,
          page: page,
          pageSize: pageSize
        }
      })
      
      return result.data || []
    } catch (error) {
      console.error('获取附近内容失败:', error)
      return []
    }
  }

  // 智能推荐
  async getSmartRecommendations(userId = null) {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'recommendation',
        data: {
          action: 'getSmartRecommendations',
          userId: userId
        }
      })
      
      return result.data || []
    } catch (error) {
      console.error('获取智能推荐失败:', error)
      return []
    }
  }

  // 搜索建议
  async getSearchSuggestions(keyword) {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'search',
        data: {
          action: 'getSuggestions',
          keyword: keyword
        }
      })
      
      return result.data || []
    } catch (error) {
      console.error('获取搜索建议失败:', error)
      return []
    }
  }

  // 高级搜索
  async advancedSearch(params) {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'search',
        data: {
          action: 'advancedSearch',
          params: params
        }
      })
      
      return result.data || []
    } catch (error) {
      console.error('高级搜索失败:', error)
      return []
    }
  }
}

export default new SearchManager() 