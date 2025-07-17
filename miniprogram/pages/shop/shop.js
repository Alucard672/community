// 店铺页面逻辑
const app = getApp()

Page({
  data: {
    // 店铺信息
    shop: null,
    
    // 当前标签页
    currentTab: 'products',
    
    // 商品列表
    products: [],
    
    // 评价列表
    reviews: [],
    
    // 排序和筛选
    currentSort: 'default',
    currentCategory: 'all',
    sortText: '综合排序',
    categoryText: '全部分类',
    
    // 弹窗状态
    showSortModal: false,
    showCategoryModal: false,
    
    // 排序选项
    sortOptions: [
      { label: '综合排序', value: 'default' },
      { label: '销量优先', value: 'sales' },
      { label: '价格从低到高', value: 'price_asc' },
      { label: '价格从高到低', value: 'price_desc' },
      { label: '评分优先', value: 'rating' }
    ],
    
    // 分类选项
    categoryOptions: [
      { label: '全部分类', value: 'all' },
      { label: '数码产品', value: 'digital' },
      { label: '服装鞋帽', value: 'clothing' },
      { label: '家居用品', value: 'home' },
      { label: '美妆护肤', value: 'beauty' }
    ],
    
    // 加载状态
    loading: true
  },

  onLoad(options) {
    const shopId = options.id
    if (shopId) {
      this.loadShopInfo(shopId)
      this.loadProducts(shopId)
      this.loadReviews(shopId)
    }
  },

  // 加载店铺信息
  async loadShopInfo(shopId) {
    try {
      this.setData({ loading: true })
      
      // 模拟加载店铺数据
      const mockShop = {
        id: shopId,
        name: '数码优选店',
        description: '专业销售各类数码产品，品质保证，价格实惠',
        avatar: '/images/merchant1.jpg',
        banner: '/images/banner1.jpg',
        productCount: 156,
        followerCount: '2.3k',
        rating: 4.8,
        qualityRating: 4.9,
        serviceRating: 4.7,
        logisticsRating: 4.6,
        address: '北京市朝阳区三里屯SOHO',
        phone: '13800138000',
        businessHours: '09:00-22:00',
        isFollowed: false,
        certifications: [
          { type: 'business', name: '企业认证' },
          { type: 'quality', name: '品质保证' },
          { type: 'service', name: '优质服务' }
        ]
      }
      
      this.setData({
        shop: mockShop,
        loading: false
      })
      
      console.log('加载店铺信息成功:', mockShop)
    } catch (error) {
      console.error('加载店铺信息失败:', error)
      this.setData({ loading: false })
    }
  },

  // 加载商品列表
  async loadProducts(shopId) {
    try {
      // 模拟商品数据
      const mockProducts = [
        {
          id: 1,
          title: 'iPhone 13 Pro Max 256G',
          price: '¥8999',
          image: '/images/post1.jpg',
          salesCount: 128,
          rating: 4.9
        },
        {
          id: 2,
          title: 'MacBook Pro 2021款 M1芯片',
          price: '¥12999',
          image: '/images/post2.jpg',
          salesCount: 89,
          rating: 4.8
        },
        {
          id: 3,
          title: 'iPad Pro 2023款 11寸',
          price: '¥6999',
          image: '/images/post3.jpg',
          salesCount: 156,
          rating: 4.7
        }
      ]
      
      this.setData({ products: mockProducts })
      console.log('加载商品列表成功:', mockProducts)
    } catch (error) {
      console.error('加载商品列表失败:', error)
    }
  },

  // 加载评价列表
  async loadReviews(shopId) {
    try {
      // 模拟评价数据
      const mockReviews = [
        {
          id: 1,
          user: {
            name: '张三',
            avatar: '/images/avatar1.jpg'
          },
          rating: 5,
          content: '商品质量很好，包装也很精美，物流速度快，店家服务态度也很好，值得推荐！',
          time: '2天前',
          images: ['/images/post1.jpg'],
          productName: 'iPhone 13 Pro Max 256G'
        },
        {
          id: 2,
          user: {
            name: '李四',
            avatar: '/images/avatar2.jpg'
          },
          rating: 4,
          content: 'MacBook Pro性能强劲，外观设计很漂亮，就是价格稍贵，但物有所值。',
          time: '3天前',
          images: [],
          productName: 'MacBook Pro 2021款 M1芯片'
        }
      ]
      
      this.setData({ reviews: mockReviews })
      console.log('加载评价列表成功:', mockReviews)
    } catch (error) {
      console.error('加载评价列表失败:', error)
    }
  },

  // 切换标签页
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ currentTab: tab })
  },

  // 关注/取消关注店铺
  toggleFollow() {
    const shop = this.data.shop
    shop.isFollowed = !shop.isFollowed
    shop.followerCount = shop.isFollowed ? 
      (parseInt(shop.followerCount) + 1).toString() + 'k' : 
      (parseInt(shop.followerCount) - 1).toString() + 'k'
    
    this.setData({ shop })
    
    wx.showToast({
      title: shop.isFollowed ? '关注成功' : '已取消关注',
      icon: 'success'
    })
  },

  // 联系店铺
  contactShop() {
    wx.showActionSheet({
      itemList: ['拨打电话', '发送消息', '查看地址'],
      success: (res) => {
        switch (res.tapIndex) {
          case 0:
            this.callShop()
            break
          case 1:
            this.sendMessage()
            break
          case 2:
            this.viewAddress()
            break
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
          icon: 'none'
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

  // 查看地址
  viewAddress() {
    wx.showToast({
      title: '地图功能开发中',
      icon: 'none'
    })
  },

  // 显示排序选项
  showSortOptions() {
    this.setData({ showSortModal: true })
  },

  // 隐藏排序选项
  hideSortModal() {
    this.setData({ showSortModal: false })
  },

  // 选择排序
  selectSort(e) {
    const sort = e.currentTarget.dataset.sort
    this.setData({
      currentSort: sort.value,
      sortText: sort.label,
      showSortModal: false
    })
    
    // 重新加载商品列表（按排序）
    this.loadProducts(this.data.shop.id)
  },

  // 显示分类选项
  showCategoryOptions() {
    this.setData({ showCategoryModal: true })
  },

  // 隐藏分类选项
  hideCategoryModal() {
    this.setData({ showCategoryModal: false })
  },

  // 选择分类
  selectCategory(e) {
    const category = e.currentTarget.dataset.category
    this.setData({
      currentCategory: category.value,
      categoryText: category.label,
      showCategoryModal: false
    })
    
    // 重新加载商品列表（按分类）
    this.loadProducts(this.data.shop.id)
  },

  // 跳转到商品详情
  goToProduct(e) {
    const product = e.currentTarget.dataset.product
    wx.navigateTo({
      url: `/pages/product-detail/product-detail?id=${product.id}`
    })
  },

  // 预览图片
  previewImage(e) {
    const current = e.currentTarget.dataset.url
    const urls = e.currentTarget.dataset.urls
    
    wx.previewImage({
      current,
      urls
    })
  },

  // 分享店铺
  onShareAppMessage() {
    const { shop } = this.data
    return {
      title: shop.name,
      path: `/pages/shop/shop?id=${shop.id}`,
      imageUrl: shop.banner
    }
  },

  // 分享到朋友圈
  onShareTimeline() {
    const { shop } = this.data
    return {
      title: shop.name,
      imageUrl: shop.banner
    }
  }
})