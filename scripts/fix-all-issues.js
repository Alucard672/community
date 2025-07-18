const fs = require('fs');
const path = require('path');

console.log('�� 修复所有问题...\n');

// 1. 修复 profile.js
const profileJsPath = path.join(__dirname, '../miniprogram/pages/profile/profile.js');
const profileJsContent = `Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    menuList: [
      { icon: '/images/order.png', title: '我的订单', path: '/pages/order-manage/order-manage' },
      { icon: '/images/shop.png', title: '我的店铺', path: '/pages/shop-center/shop-center' },
      { icon: '/images/publish.png', title: '发布管理', path: '/pages/product-manage/product-manage' },
      { icon: '/images/feedback.png', title: '意见反馈', path: '/pages/feedback/feedback' }
    ]
  },
  onLoad() { this.checkUserInfo(); },
  onShow() { this.loadUserInfo(); },
  checkUserInfo() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({ userInfo: userInfo, hasUserInfo: true });
    }
  },
  loadUserInfo() {
    try {
      const userInfo = wx.getStorageSync('userInfo');
      if (userInfo) {
        this.setData({ userInfo: userInfo, hasUserInfo: true });
      }
    } catch (error) {
      console.error('加载用户信息失败:', error);
    }
  },
  getUserInfo(e) {
    if (e.detail.userInfo) {
      this.setData({ userInfo: e.detail.userInfo, hasUserInfo: true });
      wx.setStorageSync('userInfo', e.detail.userInfo);
    }
  },
  onMenuClick(e) {
    const index = e.currentTarget.dataset.index;
    const menu = this.data.menuList[index];
    if (menu.path) {
      wx.navigateTo({
        url: menu.path,
        fail: () => {
          wx.showToast({ title: '页面开发中', icon: 'none' });
        }
      });
    }
  }
});`;

fs.writeFileSync(profileJsPath, profileJsContent);
console.log('✅ 修复 profile.js');

// 2. 创建组件目录
const componentsDir = path.join(__dirname, '../miniprogram/components');
if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir, { recursive: true });
}

console.log('✅ 创建组件目录');

console.log('\n🎉 修复完成！');
console.log('📝 请重新编译小程序'); 