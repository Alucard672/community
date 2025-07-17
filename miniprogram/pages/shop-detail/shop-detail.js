// pages/shop-detail/shop-detail.js
Page({
  data: {
    shop: {
      id: '',
      name: '示例店铺',
      description: '专业提供优质商品和服务',
      avatar: '/images/merchant1.jpg',
      banner: '/images/banner1.jpg',
      productCount: 128,
      followerCount: 2560,
      rating: 4.8,
      isFollowed: false,
      address: '北京市朝阳区某某街道123号',
      phone: '138-8888-8888',
      businessHours: '09:00-22:00',
      openTime: '2023-01-15',
      qualityRating: 4.9,
      serviceRating: 4.7,
      logisticsRating: 4.6,
      certifications: [
        { type: 'business', name: '营业执照认证' },
        { type: 'quality', name: '品质保证认证' },
        { type: 'service', name: '优质服务认证' }
      ],
      notices: [
        {
          id: 1,
          title: '店铺公告',
          content: '欢迎光临本店，我们提供优质的商品和服务，如有问题请及时联系客服。',
          time: '2024-01-15'
        }
      ]
    },
    loading: false,
    activeTab: 'info' // info, products, reviews
  },

  onLoad(options) {
    const shopId = options.id || '1'
    this.setData({
      'shop.id': shopId
    })
    this.loadShopDetail(shopId)
  },

  // 加载店铺详情
  loadShopDetail(shopId) {
    this.setData({ loading: true })
    
    // 模拟API调用
    setTimeout(() => {
      // 这里应该调用真实的API
      this.setData({ loading: false })
    }, 1000)
  },

  // 关注店铺
  followShop() {
    wx.showLoading({ title: '关注中...' })
    
    setTimeout(() => {
      this.setData({
        'shop.isFollowed': true,
        'shop.followerCount': this.data.shop.followerCount + 1
      })
      wx.hideLoading()
      wx.showToast({
        title: '关注成功',
        icon: 'success'
      })
    }, 500)
  },

  // 取消关注
  unfollowShop() {
    wx.showModal({
      title: '确认取消关注',
      content: '确定要取消关注该店铺吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({ title: '取消关注中...' })
          
          setTimeout(() => {
            this.setData({
              'shop.isFollowed': false,
              'shop.followerCount': this.data.shop.followerCount - 1
            })
            wx.hideLoading()
            wx.showToast({
              title: '已取消关注',
              icon: 'success'
            })
          }, 500)
        }
      }
    })
  },

  // 联系商家
  contactShop() {
    wx.showActionSheet({
      itemList: ['拨打电话', '发送消息'],
      success: (res) => {
        if (res.tapIndex === 0) {
          this.callShop()
        } else if (res.tapIndex === 1) {
          this.sendMessage()
        }
      }
    })
  },

  // 拨打电话
  callShop() {
    wx.makePhoneCall({
      phoneNumber: this.data.shop.phone,
      success: () => {
        console.log('拨打电话成功')
      },
      fail: () => {
        wx.showToast({
          title: '拨打电话失败',
          icon: 'error'
        })
      }
    })
  },

  // 发送消息
  sendMessage() {
    wx.showToast({
      title: '消息功能开发中',
      icon: 'none'
    })
  },

  // 查看商品
  viewProducts() {
    wx.navigateTo({
      url: `/pages/shop/shop?id=${this.data.shop.id}&tab=products`
    })
  },

  // 查看评价
  viewReviews() {
    wx.navigateTo({
      url: `/pages/shop/shop?id=${this.data.shop.id}&tab=reviews`
    })
  },

  // 切换标签页
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ activeTab: tab })
  },

  // 分享店铺
  onShareAppMessage() {
    return {
      title: `${this.data.shop.name} - 优质店铺推荐`,
      path: `/pages/shop-detail/shop-detail?id=${this.data.shop.id}`,
      imageUrl: this.data.shop.banner
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.loadShopDetail(this.data.shop.id)
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  }
})