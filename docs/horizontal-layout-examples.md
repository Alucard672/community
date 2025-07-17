# 横向排列布局指南

## 基础横向排列

### 1. 简单横向排列
```html
<view class="flex-row">
  <view class="item">项目1</view>
  <view class="item">项目2</view>
  <view class="item">项目3</view>
</view>
```

### 2. 横向居中排列
```html
<view class="flex-row-center">
  <view class="item">居中项目1</view>
  <view class="item">居中项目2</view>
  <view class="item">居中项目3</view>
</view>
```

### 3. 横向两端对齐
```html
<view class="flex-row-between">
  <view class="item">左对齐</view>
  <view class="item">右对齐</view>
</view>
```

### 4. 横向均匀分布
```html
<view class="flex-row-around">
  <view class="item">项目1</view>
  <view class="item">项目2</view>
  <view class="item">项目3</view>
</view>
```

## 横向滚动布局

### 1. 横向滚动容器
```html
<view class="scroll-row">
  <view class="scroll-item">滚动项目1</view>
  <view class="scroll-item">滚动项目2</view>
  <view class="scroll-item">滚动项目3</view>
  <view class="scroll-item">滚动项目4</view>
  <view class="scroll-item">滚动项目5</view>
</view>
```

### 2. 商家推荐横向滚动
```html
<view class="merchant-scroll">
  <view class="merchant-item">
    <image class="merchant-logo" src="/images/merchant1.jpg" />
    <view class="merchant-info">
      <text class="merchant-name">商家名称</text>
      <text class="merchant-desc">商家描述</text>
    </view>
  </view>
  <!-- 更多商家项目 -->
</view>
```

## 网格横向排列

### 1. 2列网格
```html
<view class="grid-row-2">
  <view class="grid-item">网格项目1</view>
  <view class="grid-item">网格项目2</view>
  <view class="grid-item">网格项目3</view>
  <view class="grid-item">网格项目4</view>
</view>
```

### 2. 3列网格
```html
<view class="grid-row-3">
  <view class="grid-item">项目1</view>
  <view class="grid-item">项目2</view>
  <view class="grid-item">项目3</view>
  <view class="grid-item">项目4</view>
  <view class="grid-item">项目5</view>
  <view class="grid-item">项目6</view>
</view>
```

### 3. 4列网格
```html
<view class="grid-row-4">
  <view class="grid-item">项目1</view>
  <view class="grid-item">项目2</view>
  <view class="grid-item">项目3</view>
  <view class="grid-item">项目4</view>
</view>
```

## 分类图标横向排列

### 1. 分类列表横向排列
```html
<view class="category-list">
  <view class="category-item">
    <view class="category-icon orange">📱</view>
    <text class="category-name">二手交易</text>
  </view>
  <view class="category-item">
    <view class="category-icon teal">🏠</view>
    <text class="category-name">租房信息</text>
  </view>
  <view class="category-item">
    <view class="category-icon blue">💼</view>
    <text class="category-name">招聘信息</text>
  </view>
  <view class="category-item">
    <view class="category-icon green">🤝</view>
    <text class="category-name">中介服务</text>
  </view>
</view>
```

## 按钮组横向排列

### 1. 操作按钮组
```html
<view class="flex-row-between">
  <button class="btn btn-secondary">取消</button>
  <button class="btn btn-primary">确认</button>
</view>
```

### 2. 标签按钮组
```html
<view class="flex-row gap-sm">
  <text class="tag tag-primary">标签1</text>
  <text class="tag tag-secondary">标签2</text>
  <text class="tag tag-success">标签3</text>
</view>
```

## 统计信息横向排列

### 1. 数据统计横向排列
```html
<view class="stats-grid">
  <view class="stat-item">
    <text class="stat-number">1250</text>
    <text class="stat-label">发布</text>
  </view>
  <view class="stat-item">
    <text class="stat-number">890</text>
    <text class="stat-label">浏览</text>
  </view>
  <view class="stat-item">
    <text class="stat-number">567</text>
    <text class="stat-label">点赞</text>
  </view>
  <view class="stat-item">
    <text class="stat-number">234</text>
    <text class="stat-label">评论</text>
  </view>
</view>
```

## 帖子信息横向排列

### 1. 帖子头部信息
```html
<view class="post-header">
  <image class="avatar" src="/images/avatar.jpg" />
  <view class="post-info">
    <text class="author-name">用户名</text>
    <text class="post-time">2小时前</text>
  </view>
  <text class="post-category">二手交易</text>
</view>
```

### 2. 帖子底部操作
```html
<view class="post-footer">
  <view class="post-stats">
    <view class="stat-item">
      <icon type="eye" size="12" />
      <text>1.2k</text>
    </view>
    <view class="stat-item">
      <icon type="like" size="12" />
      <text>89</text>
    </view>
    <view class="stat-item">
      <icon type="comment" size="12" />
      <text>23</text>
    </view>
  </view>
  <text class="post-price">¥299</text>
</view>
```

## 搜索栏横向排列

### 1. 搜索栏布局
```html
<view class="search-bar">
  <view class="search-input">
    <icon type="search" size="16" />
    <input placeholder="搜索内容" />
  </view>
  <view class="location">
    <icon type="location" size="16" />
  </view>
</view>
```

## 响应式横向排列

### 1. 响应式网格
```html
<!-- 大屏幕显示4列，小屏幕显示2列 -->
<view class="grid-row-4">
  <view class="grid-item">响应式项目1</view>
  <view class="grid-item">响应式项目2</view>
  <view class="grid-item">响应式项目3</view>
  <view class="grid-item">响应式项目4</view>
</view>
```

### 2. 响应式分类
```html
<!-- 大屏幕横向排列，小屏幕换行 -->
<view class="category-list">
  <view class="category-item">分类1</view>
  <view class="category-item">分类2</view>
  <view class="category-item">分类3</view>
  <view class="category-item">分类4</view>
</view>
```

## 间距控制

### 1. 使用间距工具类
```html
<view class="flex-row gap-md">
  <view class="item">项目1</view>
  <view class="item">项目2</view>
  <view class="item">项目3</view>
</view>
```

### 2. 自定义间距
```css
.custom-gap {
  gap: 20rpx;
}
```

## 对齐方式

### 1. 垂直对齐
```html
<view class="flex-row items-center">
  <view class="item">居中对齐</view>
</view>

<view class="flex-row items-start">
  <view class="item">顶部对齐</view>
</view>

<view class="flex-row items-end">
  <view class="item">底部对齐</view>
</view>
```

### 2. 水平分布
```html
<view class="flex-row justify-start">
  <view class="item">左对齐</view>
</view>

<view class="flex-row justify-center">
  <view class="item">居中对齐</view>
</view>

<view class="flex-row justify-end">
  <view class="item">右对齐</view>
</view>
```

## 实际应用场景

### 1. 首页分类区域
```html
<view class="category-section">
  <view class="category-header">
    <text class="category-title">信息分类</text>
    <text class="category-more">更多</text>
  </view>
  <view class="category-list">
    <!-- 分类项目 -->
  </view>
</view>
```

### 2. 商家推荐区域
```html
<view class="merchant-section">
  <view class="merchant-header">
    <text class="merchant-title">推荐商家</text>
    <text class="merchant-more">更多</text>
  </view>
  <view class="merchant-scroll">
    <!-- 商家项目 -->
  </view>
</view>
```

### 3. 个人中心统计
```html
<view class="stats-section">
  <view class="stats-grid">
    <!-- 统计项目 -->
  </view>
</view>
```

## 注意事项

1. **性能优化**: 横向滚动时使用 `flex-shrink: 0` 防止项目被压缩
2. **响应式设计**: 使用媒体查询适配不同屏幕尺寸
3. **触摸体验**: 横向滚动添加 `-webkit-overflow-scrolling: touch` 提升滚动体验
4. **间距控制**: 使用统一的间距变量保持视觉一致性
5. **对齐方式**: 根据内容类型选择合适的对齐方式 