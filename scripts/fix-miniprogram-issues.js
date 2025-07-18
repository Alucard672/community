const fs = require('fs');
const path = require('path');

console.log('🔧 修复小程序运行问题...\n');

// 1. 更新 app.js 中的云开发配置
const appJsPath = path.join(__dirname, '../miniprogram/app.js');
let appJsContent = fs.readFileSync(appJsPath, 'utf8');

// 替换云开发初始化
appJsContent = appJsContent.replace(
  /wx\.cloud\.init\({[\s\S]*?\});/,
  `wx.cloud.init({
  env: 'your-env-id', // 请替换为你的云开发环境ID
  traceUser: true
});`
);

// 替换弃用的 API
appJsContent = appJsContent.replace(
  /wx\.getSystemInfoSync\(\)/g,
  `(() => {
    try {
      const systemInfo = wx.getDeviceInfo();
      const windowInfo = wx.getWindowInfo();
      const appBaseInfo = wx.getAppBaseInfo();
      return { ...systemInfo, ...windowInfo, ...appBaseInfo };
    } catch (error) {
      console.error('获取系统信息失败:', error);
      return {};
    }
  })()`
);

fs.writeFileSync(appJsPath, appJsContent);
console.log('✅ 更新 app.js 配置');

// 2. 更新 user.js 工具函数
const userJsPath = path.join(__dirname, '../miniprogram/utils/user.js');
let userJsContent = fs.readFileSync(userJsPath, 'utf8');

// 替换弃用的 API
userJsContent = userJsContent.replace(
  /wx\.getSystemInfoSync\(\)/g,
  `(() => {
    try {
      const systemInfo = wx.getDeviceInfo();
      const windowInfo = wx.getWindowInfo();
      const appBaseInfo = wx.getAppBaseInfo();
      return { ...systemInfo, ...windowInfo, ...appBaseInfo };
    } catch (error) {
      console.error('获取系统信息失败:', error);
      return {};
    }
  })()`
);

fs.writeFileSync(userJsPath, userJsContent);
console.log('✅ 更新 user.js API');

console.log('\n🎉 修复完成！');
console.log('📝 请记得：');
console.log('1. 在 app.js 中替换 "your-env-id" 为你的实际云开发环境ID');
console.log('2. 确保图片文件存在于正确路径');
console.log('3. 重新编译小程序'); 