const fs = require('fs');
const path = require('path');

console.log('🔧 创建缺失的页面配置文件...\n');

// 页面配置模板
const pageConfigs = {
  'index/index': {
    "navigationBarTitleText": "社区首页",
    "navigationBarBackgroundColor": "#ffffff",
    "navigationBarTextStyle": "black",
    "backgroundColor": "#f5f5f5",
    "enablePullDownRefresh": true,
    "onReachBottomDistance": 50,
    "usingComponents": {
      "post-item": "/components/post-item/post-item",
      "shop-card": "/components/shop-card/shop-card"
    }
  },
  
  'profile/profile': {
    "navigationBarTitleText": "个人中心",
    "navigationBarBackgroundColor": "#ffffff",
    "navigationBarTextStyle": "black",
    "backgroundColor": "#f5f5f5",
    "usingComponents": {}
  },
  
  'shop/shop': {
    "navigationBarTitleText": "店铺",
    "navigationBarBackgroundColor": "#ffffff",
    "navigationBarTextStyle": "black",
    "backgroundColor": "#f5f5f5",
    "enablePullDownRefresh": true,
    "usingComponents": {
      "shop-card": "/components/shop-card/shop-card"
    }
  }
};

// 创建配置文件
Object.entries(pageConfigs).forEach(([page, config]) => {
  const configPath = path.join(__dirname, `../miniprogram/pages/${page}.json`);
  
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(`✅ 创建 ${page}.json`);
  } else {
    console.log(`⚠️  ${page}.json 已存在`);
  }
});

console.log('\n🎉 配置文件创建完成！');
console.log('📝 请重新编译小程序查看效果'); 