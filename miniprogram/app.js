// app.js
App({
  globalData: {
    userInfo: null,
    openid: null,
    isLogin: false,
    userType: 'user', // user, merchant, admin
    systemInfo: null
  },

  onLaunch() {
    // 初始化云开发
    this.initCloud();
    
    // 获取系统信息
    this.getSystemInfo();
    
    // 检查登录状态
    this.checkLoginStatus();
  },

  // 初始化云开发
  initCloud() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
      return;
    }
    
    wx.cloud.init({
      env: 'cloud1-8g0b0b0b0b0b0b0b', // 替换为你的云开发环境ID
      traceUser: true,
    });
    
    console.log('云开发初始化成功');
  },

  // 获取系统信息
  getSystemInfo() {
    try {
      const systemInfo = wx.getSystemInfoSync();
      this.globalData.systemInfo = systemInfo;
    } catch (error) {
      console.error('获取系统信息失败:', error);
    }
  },

  // 检查登录状态
  async checkLoginStatus() {
    try {
      const openid = wx.getStorageSync('openid');
      if (openid) {
        this.globalData.openid = openid;
        this.globalData.isLogin = true;
        
        // 获取用户信息
        await this.getUserInfo();
      }
    } catch (error) {
      console.error('检查登录状态失败:', error);
    }
  },

  // 获取用户信息
  async getUserInfo() {
    try {
      const db = wx.cloud.database();
      const user = await db.collection('users').where({
        openid: this.globalData.openid
      }).get();
      
      if (user.data.length > 0) {
        this.globalData.userInfo = user.data[0];
        this.globalData.userType = user.data[0].userType || 'user';
      }
    } catch (error) {
      console.error('获取用户信息失败:', error);
    }
  },

  // 微信登录
  async wxLogin() {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'auth',
        data: {
          action: 'login'
        }
      });
      
      if (result.success) {
        this.globalData.openid = result.openid;
        this.globalData.isLogin = true;
        wx.setStorageSync('openid', result.openid);
        
        // 获取用户信息
        await this.getUserInfo();
        
        return result;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('微信登录失败:', error);
      wx.showToast({
        title: '登录失败',
        icon: 'none'
      });
      throw error;
    }
  },

  // 检查权限
  checkPermission(requiredType) {
    const userType = this.globalData.userType;
    
    if (requiredType === 'admin') {
      return userType === 'admin';
    } else if (requiredType === 'merchant') {
      return userType === 'merchant' || userType === 'admin';
    } else {
      return true; // 普通用户权限
    }
  },

  // 显示权限提示
  showPermissionTip() {
    wx.showModal({
      title: '权限不足',
      content: '您没有权限执行此操作',
      showCancel: false
    });
  }
}); 