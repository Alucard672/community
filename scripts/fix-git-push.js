const { execSync } = require('child_process');

console.log('🔧 修复 Git 推送冲突...\n');

try {
  // 1. 配置 Git 合并策略
  console.log('⚙️  配置 Git 合并策略...');
  execSync('git config pull.rebase false', { stdio: 'inherit' });
  
  // 2. 拉取远程更改
  console.log('📥 拉取远程更改...');
  execSync('git pull origin main --allow-unrelated-histories', { stdio: 'inherit' });
  
  // 3. 重新推送
  console.log('🚀 推送到远程仓库...');
  execSync('git push -u origin main', { stdio: 'inherit' });
  
  console.log('\n✅ 推送成功！');
  console.log('🌐 你的项目已成功上传到 GitHub');
  
} catch (error) {
  console.error('\n❌ 修复过程中出现错误：', error.message);
  console.log('\n📋 请手动执行以下步骤：');
  console.log('1. git config pull.rebase false');
  console.log('2. git pull origin main --allow-unrelated-histories');
  console.log('3. git push -u origin main');
} 