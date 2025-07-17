const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 开始配置远程仓库并推送到 GitHub...\n');

try {
  // 1. 检查是否已初始化 Git 仓库
  if (!fs.existsSync('.git')) {
    console.log('📦 初始化 Git 仓库...');
    execSync('git init', { stdio: 'inherit' });
  }
  
  // 2. 添加所有文件到暂存区
  console.log('📦 添加文件到暂存区...');
  execSync('git add .', { stdio: 'inherit' });
  
  // 3. 检查是否有未提交的更改
  try {
    execSync('git diff --cached --quiet', { stdio: 'pipe' });
    console.log('✅ 没有新的更改需要提交');
  } catch (error) {
    console.log('💾 创建提交...');
    execSync('git commit -m "feat: 初始化社区小程序项目"', { stdio: 'inherit' });
  }
  
  // 4. 配置远程仓库
  console.log(' 配置远程仓库...');
  try {
    execSync('git remote get-url origin', { stdio: 'pipe' });
    console.log('✅ 远程仓库已配置');
  } catch (error) {
    execSync('git remote add origin https://github.com/Alucard672/community.git', { stdio: 'inherit' });
    console.log('✅ 远程仓库配置完成');
  }
  
  // 5. 设置主分支名称
  console.log('🌿 设置主分支名称...');
  execSync('git branch -M main', { stdio: 'inherit' });
  
  // 6. 推送到远程仓库
  console.log('🚀 推送到远程仓库...');
  execSync('git push -u origin main', { stdio: 'inherit' });
  
  console.log('\n✅ 项目成功上传到 GitHub！');
  console.log('🌐 仓库地址: https://github.com/Alucard672/community.git');
  console.log(' 你可以在 GitHub 上查看和管理你的项目了');
  
} catch (error) {
  console.error('\n❌ 推送过程中出现错误：', error.message);
  console.log('\n📋 请手动执行以下命令：');
  console.log('git remote add origin https://github.com/Alucard672/community.git');
  console.log('git branch -M main');
  console.log('git push -u origin main');
} 