const fs = require('fs');
const path = require('path');

console.log('�� 修复 post-item 组件...\n');

const postItemDir = path.join(__dirname, '../miniprogram/components/post-item');

// 确保目录存在
if (!fs.existsSync(postItemDir)) {
  fs.mkdirSync(postItemDir, { recursive: true });
}

// 创建 post-item 组件文件
const files = {
  'post-item.js': `Component({
  properties: {
    post: {
      type: Object,
      value: {}
    }
  },
  data: {},
  methods: {
    onPostTap() {
      const postId = this.data.post._id;
      wx.navigateTo({
        url: \`/pages/post/post?id=\${postId}\`
      });
    }
  }
});`,

  'post-item.wxml': `<view class="post-item" bindtap="onPostTap">
  <view class="post-header">
    <image class="avatar" src="{{post.author.avatarUrl || '/images/avatar1.jpg'}}" />
    <view class="post-info">
      <text class="author">{{post.author.nickName || '匿名用户'}}</text>
      <text class="time">{{post.createTime}}</text>
    </view>
  </view>
  <view class="post-content">
    <text class="title">{{post.title}}</text>
    <text class="content">{{post.content}}</text>
  </view>
  <view class="post-footer">
    <text class="likes">{{post.likes || 0}} 赞</text>
    <text class="comments">{{post.comments || 0}} 评论</text>
  </view>
</view>`,

  'post-item.wxss': `.post-item {
  background: white;
  margin: 20rpx;
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}
.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}
.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}
.post-info {
  flex: 1;
}
.author {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  display: block;
}
.time {
  font-size: 24rpx;
  color: #999;
}
.post-content {
  margin-bottom: 20rpx;
}
.title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 10rpx;
}
.content {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
}
.post-footer {
  display: flex;
  justify-content: space-between;
  color: #999;
  font-size: 24rpx;
}`,

  'post-item.json': `{
  "component": true,
  "usingComponents": {}
}`
};

// 写入文件
Object.entries(files).forEach(([filename, content]) => {
  const filePath = path.join(postItemDir, filename);
  fs.writeFileSync(filePath, content);
  console.log(`✅ 创建 ${filename}`);
});

console.log('\n🎉 post-item 组件修复完成！'); 