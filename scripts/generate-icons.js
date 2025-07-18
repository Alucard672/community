const fs = require('fs');
const path = require('path');

console.log('🎨 生成图标文件...\n');

const imagesDir = path.join(__dirname, '../miniprogram/images');

// 检查现有图片
const existingImages = fs.readdirSync(imagesDir);
console.log('现有图片文件:', existingImages);

// 图标映射 - 使用现有图片替代缺失的图标
const iconMapping = {
  'order.png': 'home.png',      // 订单图标使用首页图标
  'shop.png': 'category.png',   // 店铺图标使用分类图标
  'feedback.png': 'profile.png', // 反馈图标使用个人中心图标
  'publish.png': 'publish.png'  // 发布图标已存在
};

console.log('\n�� 图标映射方案：');
Object.entries(iconMapping).forEach(([missing, existing]) => {
  const existingPath = path.join(imagesDir, existing);
  if (fs.existsSync(existingPath)) {
    console.log(`  ✅ ${missing} -> ${existing}`);
  } else {
    console.log(`  ❌ ${missing} -> ${existing} (不存在)`);
  }
}); 