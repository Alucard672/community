const fs = require('fs');
const path = require('path');

console.log('�� 修复 shop-card 组件...\n');

const shopCardDir = path.join(__dirname, '../miniprogram/components/shop-card');

// 确保目录存在
if (!fs.existsSync(shopCardDir)) {
  fs.mkdirSync(shopCardDir, { recursive: true });
}

// 创建正确的文件内容
const files = {
  'shop-card.js': `Component({
  properties: {
    shop: {
      type: Object,
      value: {}
    }
  },
  data: {},
  methods: {
    onShopTap() {
      const shopId = this.data.shop._id;
      wx.navigateTo({
        url: \`/pages/shop-detail/shop-detail?id=\${shopId}\`
      });
    }
  }
});`,

  'shop-card.wxml': `<view class="shop-card" bindtap="onShopTap">
  <view class="shop-header">
    <image class="shop-avatar" src="{{shop.avatarUrl || '/images/shop.png'}}" />
    <view class="shop-info">
      <text class="shop-name">{{shop.name || '店铺名称'}}</text>
      <text class="shop-desc">{{shop.description || '店铺描述'}}</text>
    </view>
  </view>
  <view class="shop-footer">
    <text class="rating">⭐ {{shop.rating || 5.0}}</text>
    <text class="distance">{{shop.distance || '1.2km'}}</text>
  </view>
</view>`,

  'shop-card.wxss': `.shop-card {
  background: white;
  border-radius: 16rpx;
  padding: 30rpx;
  margin: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}
.shop-header {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}
.shop-avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 16rpx;
  margin-right: 20rpx;
}
.shop-info {
  flex: 1;
}
.shop-name {
  font-size: 28rpx;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 10rpx;
}
.shop-desc {
  font-size: 24rpx;
  color: #666;
  display: block;
}
.shop-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.rating {
  font-size: 24rpx;
  color: #ff6b35;
}
.distance {
  font-size: 24rpx;
  color: #999;
}`,

  'shop-card.json': `{
  "component": true,
  "usingComponents": {}
}`
};

// 写入文件
Object.entries(files).forEach(([filename, content]) => {
  const filePath = path.join(shopCardDir, filename);
  fs.writeFileSync(filePath, content);
  console.log(`✅ 创建 ${filename}`);
});

console.log('\n🎉 shop-card 组件修复完成！'); 