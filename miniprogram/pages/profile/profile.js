Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    menuList: [
      {
        icon: '/images/home.png',
        title: '我的订单',
        path: '/pages/order-manage/order-manage',
        color: 'green'
      },
      {
        icon: '/images/shop.png',
        title: '我的店铺',
        path: '/pages/shop-center/shop-center',
        color: 'teal'
      },
      {
        icon: '/images/publish.png',
        title: '发布管理',
        path: '/pages/product-manage/product-manage',
        color: 'orange'
      },
      {
        icon: '/images/feedback.png',
        title: '意见反馈',
        path: '/pages/feedback/feedback',
        color: 'blue'
      },
      {
        icon: '/images/settings.png',
        title: '设置',
        path: '/pages/settings/settings',
        color: 'purple'
      },
      {
        icon: '/images/profile.png',
        title: '关于我们',
        path: '/pages/about/about',
        color: 'pink'
      }
    ]
  },

  onLoad() {
    console.log('个人中心页面加载');
    this.checkUserInfo();
  },

  onShow() {
    console.log('个人中心页面显示');
    this.loadUserInfo();
  },

  // 检查用户信息
  checkUserInfo() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      });
    }
  },

  // 加载用户信息
  loadUserInfo() {
    try {
      const userInfo = wx.getStorageSync('userInfo');
      if (userInfo) {
        this.setData({
          userInfo: userInfo,
          hasUserInfo: true
        });
      }
    } catch (error) {
      console.error('加载用户信息失败:', error);
    }
  },

  // 获取用户信息
  getUserInfo(e) {
    console.log('获取用户信息:', e);
    if (e.detail.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      });
      wx.setStorageSync('userInfo', e.detail.userInfo);
    }
  },

  // 菜单项点击
  onMenuClick(e) {
    const index = e.currentTarget.dataset.index;
    const menu = this.data.menuList[index];
    
    if (menu.path) {
      wx.navigateTo({
        url: menu.path,
        fail: (error) => {
          console.error('页面跳转失败:', error);
          wx.showToast({
            title: '页面开发中',
            icon: 'none'
          });
        }
      });
    }
  },

  // 设置
  onSettings() {
    wx.showToast({
      title: '设置功能开发中',
      icon: 'none'
    });
  },

  // 关于
  onAbout() {
    wx.showToast({
      title: '关于功能开发中',
      icon: 'none'
    });
  }
});