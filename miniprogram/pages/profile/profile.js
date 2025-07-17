const { getUserInfo } = require('../../utils/user')

Page({
  data: {
    userInfo: null, // 用户信息
    topicsCount: 0, // 话题数
    favoritesCount: 0 // 收藏数
  },
  onShow() {
    this.loadUser()
    this.loadStats()
  },
  // 加载用户信息
  loadUser() {
    getUserInfo().then(user => {
      this.setData({ userInfo: user })
    })
  },
  // 加载统计信息（我的话题、收藏等）
  loadStats() {
    // 这里用假数据，实际应请求后端接口
    this.setData({
      topicsCount: 12, // 假设有12个话题
      favoritesCount: 8 // 假设有8个收藏
    })
  },
  // 微信一键登录
  onLogin() {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: res => {
        // 这里应调用后端接口进行登录
        const user = {
          avatar: res.userInfo.avatarUrl,
          nickname: res.userInfo.nickName,
          ...res.userInfo
        }
        this.setData({ userInfo: user })
        // 可存储到本地或同步到后端
      },
      fail: () => {
        wx.showToast({ title: '登录失败', icon: 'none' })
      }
    })
  },
  // 跳转到我的话题
  goToMyTopics() {
    wx.navigateTo({ url: '/pages/my-topics/my-topics' })
  },
  // 跳转到我的收藏
  goToMyFavorites() {
    wx.navigateTo({ url: '/pages/my-favorites/my-favorites' })
  },
  // 跳转到我的评论
  goToMyComments() {
    wx.navigateTo({ url: '/pages/my-comments/my-comments' })
  },
  // 跳转到设置
  goToSettings() {
    wx.navigateTo({ url: '/pages/settings/settings' })
  },
  toShopCenter() {
    wx.navigateTo({ url: '/pages/shop-center/shop-center' })
  },
  toApplyShop() {
    wx.navigateTo({ url: '/pages/apply-shop/apply-shop' })
  },
  goToPublish() {
    wx.navigateTo({ url: '/pages/publish/publish' })
  }
}) 