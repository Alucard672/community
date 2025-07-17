const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 开始设置 Git 仓库并上传到 GitHub...\n');

try {
  // 1. 初始化 Git 仓库
  console.log('�� 初始化 Git 仓库...');
  execSync('git init', { stdio: 'inherit' });
  
  // 2. 添加所有文件到暂存区
  console.log('📦 添加文件到暂存区...');
  execSync('git add .', { stdio: 'inherit' });
  
  // 3. 创建初始提交
  console.log('💾 创建初始提交...');
  execSync('git commit -m "feat: 初始化社区小程序项目"', { stdio: 'inherit' });
  
  // 4. 检查是否已配置远程仓库
  try {
    execSync('git remote get-url origin', { stdio: 'pipe' });
    console.log('✅ 远程仓库已配置');
  } catch (error) {
    console.log('⚠️  请先创建 GitHub 仓库并配置远程地址');
    console.log('📝 创建仓库后，运行以下命令：');
    console.log('   git remote add origin https://github.com/你的用户名/仓库名.git');
    console.log('   git branch -M main');
    console.log('   git push -u origin main');
    return;
  }
  
  // 5. 设置主分支名称
  console.log('🌿 设置主分支名称...');
  execSync('git branch -M main', { stdio: 'inherit' });
  
  // 6. 推送到远程仓库
  console.log('🚀 推送到远程仓库...');
  execSync('git push -u origin main', { stdio: 'inherit' });
  
  console.log('\n✅ Git 仓库设置完成！');
  console.log('🌐 你的项目已成功上传到 GitHub');
  
} catch (error) {
  console.error('\n❌ 设置过程中出现错误：', error.message);
  console.log('\n📋 手动执行以下步骤：');
  console.log('1. git init');
  console.log('2. git add .');
  console.log('3. git commit -m "feat: 初始化社区小程序项目"');
  console.log('4. 在 GitHub 创建新仓库');
  console.log('5. git remote add origin https://github.com/你的用户名/仓库名.git');
  console.log('6. git branch -M main');
  console.log('7. git push -u origin main');
} 