// index.js
Page({
  data: {
    // 分类数据
    categories: [
      { id: 1, name: '二手交易', icon: '📱', color: 'orange' },
      { id: 2, name: '租房信息', icon: '🏠', color: 'teal' },
      { id: 3, name: '招聘信息', icon: '💼', color: 'blue' },
      { id: 4, name: '中介服务', icon: '🤝', color: 'green' },
      { id: 5, name: '生活服务', icon: '🛠️', color: 'purple' },
      { id: 6, name: '教育培训', icon: '📚', color: 'pink' }
    ],
    
    // 商家数据
    merchants: [
      { id: 1, name: '数码专卖店', desc: '专业数码产品', logo: '/images/merchant1.jpg' },
      { id: 2, name: '家居生活馆', desc: '品质家居用品', logo: '/images/merchant2.jpg' },
      { id: 3, name: '服装精品店', desc: '时尚服装配饰', logo: '/images/merchant1.jpg' },
      { id: 4, name: '美食餐厅', desc: '特色美食', logo: '/images/merchant2.jpg' },
      { id: 5, name: '美容美发', desc: '专业美容服务', logo: '/images/merchant1.jpg' }
    ],
    
    // 帖子数据
    posts: [
      {
        id: 1,
        author: { name: '张三', avatar: '/images/avatar1.jpg' },
        title: 'iPhone 13 Pro Max 256G 深空灰',
        desc: '9成新，无划痕，电池健康度95%，原装充电器，价格可议',
        category: '二手交易',
        price: '¥5999',
        stats: { views: '1.2k', likes: '89', comments: '23' },
        time: '2小时前'
      },
      {
        id: 2,
        author: { name: '李四', avatar: '/images/avatar2.jpg' },
        title: '市中心精装两室一厅出租',
        desc: '地铁口附近，家电齐全，拎包入住，月租3500元',
        category: '租房信息',
        price: '¥3500/月',
        stats: { views: '856', likes: '45', comments: '12' },
        time: '4小时前'
      }
    ]
  },

  onLoad() {
    console.log('首页加载完成');
  },

  // 跳转到发布页面
  goToPublish() {
    wx.navigateTo({
      url: '/pages/publish/publish'
    });
  },

  // 跳转到分类页面
  goToCategories() {
    wx.navigateTo({
      url: '/pages/categories/categories'
    });
  },

  // 跳转到商家详情
  goToMerchant(e) {
    const merchant = e.currentTarget.dataset.merchant;
    wx.navigateTo({
      url: `/pages/shop-detail/shop-detail?id=${merchant.id}`
    });
  },

  // 跳转到帖子详情
  goToPost(e) {
    const post = e.currentTarget.dataset.post;
    wx.navigateTo({
      url: `/pages/post/post?id=${post.id}`
    });
  },

  // 搜索输入
  onSearchInput(e) {
    const value = e.detail.value;
    console.log('搜索内容:', value);
  },

  // 选择位置
  chooseLocation() {
    wx.chooseLocation({
      success: (res) => {
        console.log('选择位置:', res);
      }
    });
  },

  // 跳转到分列页面
  goToColumns() {
    wx.navigateTo({
      url: '/pages/columns/columns'
    });
  }
}); 