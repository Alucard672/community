const fs = require('fs');
const path = require('path');

console.log('�� 检查个人中心页面...\n');

const profileDir = path.join(__dirname, '../miniprogram/pages/profile');

// 检查文件内容
const files = ['profile.js', 'profile.wxml', 'profile.wxss', 'profile.json'];

files.forEach(file => {
  const filePath = path.join(profileDir, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`\n📄 ${file}:`);
    console.log('内容长度:', content.length);
    console.log('前100字符:', content.substring(0, 100));
  } else {
    console.log(`❌ ${file} 文件缺失`);
  }
}); 