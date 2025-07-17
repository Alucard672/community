// 收藏和关注功能
class FavoriteManager {
  // 收藏帖子
  async favoritePost(postId) {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'favorite',
        data: {
          action: 'favoritePost',
          postId: postId
        }
      })
      
      if (result.success) {
        wx.showToast({
          title: '收藏成功',
          icon: 'success'
        })
        return true
      } else {
        wx.showToast({
          title: result.message || '收藏失败',
          icon: 'none'
        })
        return false
      }
    } catch (error) {
      console.error('收藏失败:', error)
      return false
    }
  }

  // 取消收藏
  async unfavoritePost(postId) {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'favorite',
        data: {
          action: 'unfavoritePost',
          postId: postId
        }
      })
      
      if (result.success) {
        wx.showToast({
          title: '已取消收藏',
          icon: 'success'
        })
        return true
      } else {
        wx.showToast({
          title: result.message || '操作失败',
          icon: 'none'
        })
        return false
      }
    } catch (error) {
      console.error('取消收藏失败:', error)
      return false
    }
  }

  // 关注用户
  async followUser(userId) {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'follow',
        data: {
          action: 'followUser',
          userId: userId
        }
      })
      
      if (result.success) {
        wx.showToast({
          title: '关注成功',
          icon: 'success'
        })
        return true
      } else {
        wx.showToast({
          title: result.message || '关注失败',
          icon: 'none'
        })
        return false
      }
    } catch (error) {
      console.error('关注失败:', error)
      return false
    }
  }

  // 取消关注
  async unfollowUser(userId) {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'follow',
        data: {
          action: 'unfollowUser',
          userId: userId
        }
      })
      
      if (result.success) {
        wx.showToast({
          title: '已取消关注',
          icon: 'success'
        })
        return true
      } else {
        wx.showToast({
          title: result.message || '操作失败',
          icon: 'none'
        })
        return false
      }
    } catch (error) {
      console.error('取消关注失败:', error)
      return false
    }
  }

  // 检查是否已收藏
  async checkFavoriteStatus(postId) {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'favorite',
        data: {
          action: 'checkFavorite',
          postId: postId
        }
      })
      
      return result.isFavorited || false
    } catch (error) {
      console.error('检查收藏状态失败:', error)
      return false
    }
  }

  // 检查是否已关注
  async checkFollowStatus(userId) {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'follow',
        data: {
          action: 'checkFollow',
          userId: userId
        }
      })
      
      return result.isFollowing || false
    } catch (error) {
      console.error('检查关注状态失败:', error)
      return false
    }
  }

  // 获取收藏列表
  async getFavorites(page = 1, pageSize = 20) {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'favorite',
        data: {
          action: 'getFavorites',
          page: page,
          pageSize: pageSize
        }
      })
      
      return result.data || []
    } catch (error) {
      console.error('获取收藏列表失败:', error)
      return []
    }
  }

  // 获取关注列表
  async getFollowings(page = 1, pageSize = 20) {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'follow',
        data: {
          action: 'getFollowings',
          page: page,
          pageSize: pageSize
        }
      })
      
      return result.data || []
    } catch (error) {
      console.error('获取关注列表失败:', error)
      return []
    }
  }

  // 获取粉丝列表
  async getFollowers(page = 1, pageSize = 20) {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'follow',
        data: {
          action: 'getFollowers',
          page: page,
          pageSize: pageSize
        }
      })
      
      return result.data || []
    } catch (error) {
      console.error('获取粉丝列表失败:', error)
      return []
    }
  }
}

export default new FavoriteManager() 