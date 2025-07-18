const fs = require('fs');
const path = require('path');

console.log('�� 修复页面显示问题...\n');

// 1. 检查 app.json 配置
const appJsonPath = path.join(__dirname, '../miniprogram/app.json');
if (fs.existsSync(appJsonPath)) {
  const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
  console.log('✅ app.json 配置正常');
  console.log('页面列表:', appJson.pages);
} else {
  console.log('❌ app.json 文件缺失');
}

// 2. 检查主要页面文件
const mainPages = ['index', 'profile', 'post'];
mainPages.forEach(page => {
  const pageDir = path.join(__dirname, `../miniprogram/pages/${page}`);
  if (fs.existsSync(pageDir)) {
    console.log(`✅ ${page} 页面目录存在`);
  } else {
    console.log(`❌ ${page} 页面目录缺失`);
  }
});

// 3. 检查样式文件
const styleFiles = [
  '../miniprogram/app.wxss',
  '../miniprogram/pages/index/index.wxss',
  '../miniprogram/pages/profile/profile.wxss'
];

styleFiles.forEach(styleFile => {
  const stylePath = path.join(__dirname, styleFile);
  if (fs.existsSync(stylePath)) {
    console.log(`✅ ${styleFile} 存在`);
  } else {
    console.log(`❌ ${styleFile} 缺失`);
  }
});

console.log('\n🎉 检查完成！'); 