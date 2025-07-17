// 分类页面逻辑
const app = getApp()

Page({
  data: {
    // 当前选中的分类
    currentCategory: null,
    
    // 信息分类
    categories: [
      {
        id: 1,
        name: '二手交易',
        code: 'secondhand',
        icon: 'icon-secondhand',
        color: '#ff6b35',
        description: '闲置物品交易',
        count: 1250
      },
      {
        id: 2,
        name: '租房信息',
        code: 'rental',
        icon: 'icon-house',
        color: '#4ecdc4',
        description: '房屋租赁信息',
        count: 890
      },
      {
        id: 3,
        name: '招聘信息',
        code: 'job',
        icon: 'icon-job',
        color: '#45b7d1',
        description: '求职招聘信息',
        count: 567
      },
      {
        id: 4,
        name: '中介服务',
        code: 'intermediary',
        icon: 'icon-service',
        color: '#96ceb4',
        description: '各类中介服务',
        count: 234
      },
      {
        id: 5,
        name: '数码产品',
        code: 'digital',
        icon: 'icon-digital',
        color: '#ff9ff3',
        description: '手机电脑数码',
        count: 456
      },
      {
        id: 6,
        name: '家居用品',
        code: 'furniture',
        icon: 'icon-furniture',
        color: '#feca57',
        description: '家具家电用品',
        count: 345
      }
    ],
    
    // 帖子列表
    posts: []
  },

  onLoad() {
    this.initPage()
  },

  // 初始化页面
  async initPage() {
    try {
      // 默认选择第一个分类
      if (this.data.categories.length > 0) {
        this.selectCategory({ currentTarget: { dataset: { category: this.data.categories[0] } } })
      }
    } catch (error) {
      console.error('初始化分类页面失败:', error)
    }
  },

  // 选择分类
  async selectCategory(e) {
    const category = e.currentTarget.dataset.category
    console.log('选择分类:', category)
    
    this.setData({
      currentCategory: category
    })
    
    // 加载该分类下的帖子
    await this.loadPostsByCategory(category.code)
  },

  // 根据分类加载帖子
  async loadPostsByCategory(categoryCode) {
    try {
      // 模拟加载数据
      const mockPosts = this.getMockPostsByCategory(categoryCode)
      
      this.setData({
        posts: mockPosts
      })
      
      console.log(`加载分类 ${categoryCode} 的帖子成功，共 ${mockPosts.length} 条`)
    } catch (error) {
      console.error('加载帖子失败:', error)
      this.setData({
        posts: []
      })
    }
  },

  // 获取模拟帖子数据
  getMockPostsByCategory(categoryCode) {
    const mockPosts = {
      'secondhand': [
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
          title: 'MacBook Pro 2021款 M1芯片',
          desc: '13寸，8+256G，轻度使用，外观如新，配件齐全',
          category: '二手交易',
          price: '¥8999',
          stats: { views: '856', likes: '45', comments: '12' },
          time: '4小时前'
        }
      ],
      'rental': [
        {
          id: 3,
          author: { name: '王五', avatar: '/images/avatar1.jpg' },
          title: '市中心精装两室一厅出租',
          desc: '地铁口附近，家电齐全，拎包入住，月租3500元',
          category: '租房信息',
          price: '¥3500/月',
          stats: { views: '1.5k', likes: '67', comments: '18' },
          time: '1小时前'
        }
      ],
      'job': [
        {
          id: 4,
          author: { name: '赵六', avatar: '/images/avatar2.jpg' },
          title: '招聘前端开发工程师',
          desc: '3年以上经验，熟悉Vue/React，薪资15-25K',
          category: '招聘信息',
          price: '¥15-25K',
          stats: { views: '2.1k', likes: '123', comments: '45' },
          time: '3小时前'
        }
      ],
      'intermediary': [
        {
          id: 5,
          author: { name: '中介小王', avatar: '/images/avatar1.jpg' },
          title: '专业房产中介服务',
          desc: '提供买房、卖房、租房一站式服务，专业可靠',
          category: '中介服务',
          price: '服务费面议',
          stats: { views: '567', likes: '34', comments: '8' },
          time: '5小时前'
        }
      ],
      'digital': [
        {
          id: 6,
          author: { name: '数码达人', avatar: '/images/avatar2.jpg' },
          title: '全新iPad Pro 2023款',
          desc: '11寸，128G，WiFi版，未拆封，价格优惠',
          category: '数码产品',
          price: '¥5999',
          stats: { views: '789', likes: '56', comments: '15' },
          time: '6小时前'
        }
      ],
      'furniture': [
        {
          id: 7,
          author: { name: '家居生活', avatar: '/images/avatar1.jpg' },
          title: '北欧风格沙发组合',
          desc: '3+2+1组合，米白色，9成新，搬家急售',
          category: '家居用品',
          price: '¥2999',
          stats: { views: '432', likes: '28', comments: '6' },
          time: '8小时前'
        }
      ]
    }
    
    return mockPosts[categoryCode] || []
  },

  // 搜索分类
  onSearchInput(e) {
    const keyword = e.detail.value
    console.log('搜索分类:', keyword)
    // 这里可以实现分类搜索功能
  },

  // 跳转到帖子详情
  goToPost(e) {
    const post = e.currentTarget.dataset.post
    console.log('跳转到帖子:', post)
    
    wx.navigateTo({
      url: `/pages/post/post?id=${post.id}`
    })
  },

  // 跳转到发布页面
  goToPublish() {
    wx.navigateTo({ 
      url: '/pages/publish/publish' 
    })
  }
}) 