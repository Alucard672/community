const fs = require('fs');
const path = require('path');

console.log('🔍 检查页面文件完整性...\n');

// 检查主要页面
const pages = [
  'index/index',
  'profile/profile', 
  'post/post',
  'categories/categories',
  'shop/shop'
];

pages.forEach(page => {
  const pagePath = path.join(__dirname, `../miniprogram/pages/${page}`);
  const files = ['js', 'wxml', 'wxss', 'json'];
  
  console.log(`\n�� 检查页面: ${page}`);
  files.forEach(ext => {
    const filePath = `${pagePath}.${ext}`;
    if (fs.existsSync(filePath)) {
      console.log(`  ✅ ${ext.toUpperCase()}: 存在`);
    } else {
      console.log(`  ❌ ${ext.toUpperCase()}: 缺失`);
    }
  });
}); 